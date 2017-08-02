Template.deleteVersionModal.events({

	'submit form.confirm':function(e) {
		e.preventDefault();
		
		Projects.update((Session.get('currentProject'))._id, {$pull: {"versions": {version: Session.get('versionNumber')}}});  	 //delete the version 
		$('#deleteVersionModal').modal('hide');
	}	
});

Template.deleteVersionModal.helpers({			

	versionToDelete:function(){
		return moment(Session.get('versionUpdateDate')).locale('de').format('DD.MM.YYYY, HH:mm:ss');
	}
});
