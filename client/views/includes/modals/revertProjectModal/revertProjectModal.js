Template.revertProjectModal.events({

	'submit form.confirm':function(e) {
		e.preventDefault();

		if($("[name='saveCheckbox']:checked").length != 0)			//save the opened version of the project
		{
			var now = new Date();
			Meteor.call('saveProject', Session.get('currentProject'), now);
		
		}
		Meteor.call('revertProject', Session.get('currentProject')._id ,Session.get('currentProjectVersion'),function(err,data){
			if (err){
				console.log(err);
			}
		});
		
		location.reload();	
		$('#revertProjectModal').modal('hide');
	}	
});

