Template.editProfileModal.onRendered(function () {
	$('#editProfileModal').on('shown.bs.modal', function (e) {
		$(e.currentTarget).find('input[name="edited-user-name"]').val(Meteor.user().profile.name);
	});
});


Template.editProfileModal.helpers({			//crate a div if no profile pic!!! with letters &style!
	profilePicture: function(){
		if(typeof Meteor.user().profile.picture === 'string' ){
			return Meteor.user().profile.picture;
		} else {
			$(e.target).closest('.viewPicture').addClass('default');
		}
	}
});


Template.editProfileModal.events({

	'click .btn-primary':function(e) {
		e.preventDefault();

		var editedName = Template.instance().$('[name="edited-user-name"]').val();

		if(editedName){
			$('#editProfileModal').modal('hide');
				if(Meteor.user().username)
				{
					Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.name":editedName}});
				}
		} else {
			throwModalError("Field can not be left empty.");
		}
	},


	'click .btn-edit-picture':function(e) {
		e.preventDefault();
		$(e.target).closest('.profile').addClass('webcamOn');
	}	

});
