Template.camera.onRendered(function() {

	Webcam.on( 'error', function(err) {
		console.log(err); // outputs error to console instead of window.alert
	});

	Webcam.set({
		width: 320,
		height: 240,
		crop_width: 240,
		crop_height: 240,
		image_format: 'jpeg',
		jpeg_quality: 90
	});

	Webcam.attach( '#webcam' );
});

Template.camera.events({
	'click .btn-snap': function (e) {
		Webcam.snap( function(image) {
			Session.set('webcamSnap', image);
			$(e.target).closest('.profile').removeClass('webcamOn');
			Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.picture":Session.get('webcamSnap')}});
			
		})
	}
});

Template.camera.helpers({
	image: function () {
		return Session.get('webcamSnap');
	}
});