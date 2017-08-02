Projects = new Meteor.Collection('projects');

Projects.allow({
	insert: function(userId, doc) {
		return !! userId;
	},
	
	update: function(userId, doc) {
		
		return !! userMayEditProject(doc);
	},

	remove: function(userId, doc) {
		return !! userMayEditProject(doc);
	}

});
