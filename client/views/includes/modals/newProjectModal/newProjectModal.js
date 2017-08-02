Template.newProjectModal.onRendered(function () {
	
	$('newProjectModal').removeData("modal").modal({backdrop: 'static', keyboard: false});

});



Template.newProjectModal.events({

	'click .btn-primary':function(e, template) {
		e.preventDefault();

		var projectName = template.$('[name="project-name"]').val();

		var projectDescription = template.$('[name="description-text"]').val();

		if(projectName){
			Meteor.call('newProject',projectName, projectDescription, function(err,data) {
				if (err){
    				console.log(err);
    			}
    			Router.go('edit',{_id: data});	
				$('#newProjectModal').modal('hide');
			});
		} else {
			throwModalError("Your project needs a name.");
		}
	}	
});
