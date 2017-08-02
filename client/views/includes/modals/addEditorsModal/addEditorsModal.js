Template.addEditorsModal.onRendered(function () {
	
	Meteor.subscribe('allUsers');
});


Template.addEditorsModal.helpers({
	users: function(){
		return Meteor.users.find({}, {sort:{username:1, 'profile.name': 1}});
	},

	editorSelected: function(project) {
		if (_.contains(project.editors, this._id)) {
			return (this._id === Meteor.userId()) ? 'myself' : 'selected';
		} else {
			return '';
		}
	},

	name: function(){
		if(typeof this.profile.name === 'string'){
			return this.profile.name;
		} else {
			return this.username;
		}
	},

	profilePicture: function(){
		if(typeof this.profile.picture === 'string'){
			return this.profile.picture;

		} else {
			return "/img/placeholder_female.jpg";
		}
	}
});

Template.addEditorsModal.events({

	'click .thumbnail:not(.myself)': function(e) {
		e.preventDefault();
		$(e.currentTarget).toggleClass('selected');
	},

	'click .btn-ok' :function(e){
		var editors = Template.instance().$('.thumbnail.selected')
		.map(function(index, element) { 
			return $(element).attr('data-id'); 
		}).get();

		editors.push(Meteor.userId());
		Projects.update(this._id, {$set: {editors: editors}});
		$('#addEditorsModal').modal('hide');
	}

});