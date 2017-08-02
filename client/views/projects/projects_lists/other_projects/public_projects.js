Template.otherProjects.helpers({
	projects: function() {
		if(this.sort=="recent"){
			options= {sort: {publicVersionDate:-1}};
		}else{
			options = {sort: {popularityCount:-1}};
		}
		return Projects.find({$and: [{editors: { $ne: Meteor.userId()}},{ publicVersion: {$exists: true}} ]}, options);

	}
});