Template.fileItem.onRendered(function () {
	this.$('[data-toggle="tooltip"]').tooltip();
});


Template.fileItem.helpers({
	selected: function(filename) {
		if(this.filename == filename)
			return "selected";
	},
	userIsThisProjectEditor: function() {
		return _.contains(Projects.findOne(this._id).editors, Meteor.userId());
	},
	
	notIndexHtmlFile:function(){
		if(this.filename != "index.html"){
			return true;
		}else{
			return false;
		} 
	}
});


Template.fileItem.events({

	'click .btn-default':function(e){
		e.preventDefault();
		var filename = this.filename;
		
		if(filename =="index.html"){
			Modal.show('rejectDeleteModal');
		}else{
			Modal.show('basicModal');
			Session.set('selectedFile', filename);	
			Session.set('currentProjectId',this._id);
		}
	}	
});

