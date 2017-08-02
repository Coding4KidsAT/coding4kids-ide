Template.deleteProjectModal.events({

	'submit form.confirm':function(e) {
		e.preventDefault();
		Projects.remove({_id:this.data._id});
		$('#deleteProjectModal').modal('hide');
	} 
});

Template.deleteProjectModal.helpers({     

	projectToDelete:function(){
		return this.data.name;
	}
});
