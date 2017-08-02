Template.forkModal.onRendered(function () {
	
	$('forkModal').removeData("modal").modal({backdrop: 'static', keyboard: false});


	$('#forkModal').on('shown.bs.modal', function (e) {
		var project=Projects.findOne(Session.get('currentProjectID'));
		$(e.currentTarget).find('input[name="project-fork"]').val(project.name);
		$(e.currentTarget).find('[name="description-fork"]').val(project.description);
	});
});

Template.forkModal.events({

	'click .btn-confirm':function(e) {
		e.preventDefault();
		var projectName = Template.instance().$('[name="project-fork"]').val();
		var projectDescription = Template.instance().$('[name="description-fork"]').val();
		
		if(projectName){
			Meteor.call('forkProject', Session.get('currentProjectID'),projectName,projectDescription, function(err,data){

				if (err){
    				console.log(err);
    			}
    			Router.go('edit',{_id: data});	
			});
			$('#forkModal').modal('hide');
			
		} else {
			throwModalError("Your project needs a name.");
		}
	}	
});
