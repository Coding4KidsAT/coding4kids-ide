Template.header.events({

	'click .btn-new':function(e){							
		e.preventDefault();
		Modal.show('newProjectModal');
	},

	'click .btn-template':function(e){						
		e.preventDefault();
		Modal.show('forkModal');
		Session.set('currentProjectID',this.project._id);
	},

	'click .btn-new-editor':function(e){							
		e.preventDefault();
		Modal.show('addEditorsModal', this.project);
	},

	'click .btn-save':function(e){						
		e.preventDefault();
		var now = new Date();
		
		if(userMayEditProject(this.project,Meteor.userId())){
			Meteor.call('saveProject',this.project, now);
		
		}else{
			console.log("Error:Save Version Failed");
		}
	}
});



Template.header.onRendered( function() {
	this.$('[data-toggle="tooltip"]').tooltip();
});


Template.header.helpers({
	profilePicture: function(){
		if(typeof Meteor.user().profile.picture === 'string'){
			return Meteor.user().profile.picture;

		//} else {
		//	return "";
			//return "/img/placeholder_female.jpg";
		}
	}
});


