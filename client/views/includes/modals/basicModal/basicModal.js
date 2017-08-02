Template.basicModal.events({

	'submit form.confirm':function(e) {
		e.preventDefault();
		
		Projects.update(Session.get('currentProjectId'), {$pull: {files: {filename: Session.get('selectedFile')}}});      //delete the file 
		$('#basicModal').modal('hide');
	}	
});

Template.basicModal.helpers({			

	fileToDelete:function(){
		return Session.get('selectedFile');
	}
});
