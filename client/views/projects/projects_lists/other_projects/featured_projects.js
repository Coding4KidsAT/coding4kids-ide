Template.featuredProjects.helpers({
	projects: function() {
		return Projects.find({"featured": true });
	}
});