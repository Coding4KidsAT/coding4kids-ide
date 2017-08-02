Template.allProjects.helpers({
	projects: function() {
		return Projects.find({}, {sort: {createdAt:-1}});
	}
});