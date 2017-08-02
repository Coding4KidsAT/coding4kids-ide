userIsProjectEditor = function(project, userId) {
	return _.contains(project.editors, userId ? userId : Meteor.userId());
}

userIsAdmin = function(userId) {
	return Roles.userIsInRole(userId || Meteor.user(), 'admin');
}

userMayEditProject = function(project, userId) {
	return userIsProjectEditor(project, userId) || userIsAdmin(userId);
}