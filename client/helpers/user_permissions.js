Template.registerHelper('userIsProjectEditor', function() {
	if (typeof this.project !== 'undefined') {
		return userIsProjectEditor(this.project);
	}
});

Template.registerHelper('userMayEditProject', function() {
	if (typeof this.project !== 'undefined') {
		return userMayEditProject(this.project);
	}
});
