Template.project.onRendered(function () {
	this.$('[data-toggle="tooltip"]').tooltip();
});

Template.project.events({

	'click .btn-show':function(e){
		e.preventDefault();
		Meteor.call('popularityIncrease',this);
		window.open("/show/"+this._id);
	},
	
	'click .btn-delete-project': function(e){
		e.preventDefault();
		var instance=Template.instance(this);
		Modal.show('deleteProjectModal', Template.instance(this));
	},

	'click .link-project-editor':function(e){
		Meteor.call('popularityIncrease',this);
	}
});


Template.project.helpers({

	projectEditors: function(){
		return this.editors;
	},

	thisIsMyProject: function(){
		return userIsProjectEditor(this,Meteor.userId());
	},

	myProjectIsPublic: function(){

		if(typeof this.publicVersion === "undefined" || this.publicVersion.length === 0){
			return false;
		}else{
			return true;
		}
	},

	editorsPictures: function(){

		const user = Meteor.users.find({"_id":this.valueOf()}).fetch()[0];

		if(user && user.profile && typeof user.profile.picture === 'string'){
			return user.profile.picture;
		}else {
			return "/img/placeholder_female_small.jpg";
		}
	
	},

	editorName: function() {
		var user = Meteor.users.findOne(this.valueOf());
		return user.profile.name || user.username;
	}
});