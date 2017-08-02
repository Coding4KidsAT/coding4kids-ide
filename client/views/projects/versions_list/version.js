Template.version.onRendered(function () {
	this.$('[data-toggle="tooltip"]').tooltip();
});

Template.version.events({

	'click .edit-version':function(e){
		e.preventDefault();

		Session.set('currentProject',Projects.findOne());
		Session.set('currentProjectVersion',this);
		Modal.show('revertProjectModal');
	},

	'click .btn-delete-version':function(e){
		e.preventDefault();
		
		Session.set('currentProject',Projects.findOne());
		Session.set('versionUpdateDate',this.date);
		Session.set('versionNumber',this.versionNumber);
		Modal.show('deleteVersionModal');
	},


	'click .btn-preview-version':function(e){
		e.preventDefault();
		var source="/runversion/"+Projects.findOne()._id+"/"+this.versionNumber+"/index.html";
		$('#myResult').attr("src", source);
		Session.set('previewVersionOn',true);
	}

});

Template.version.helpers({			

	savedDate:function(){
		return moment(this.date).locale('de').format('DD.MM.YYYY,HH:mm');
	},

	versionIsPublic:function(){
		if(Projects.findOne().publicVersion==this.versionNumber){
			return true;
		}else{
			return false;
		}
	}
});


		