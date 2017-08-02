Template.projectsList.helpers({
	projects: function() {
		return Projects.find({editors: Meteor.userId()},{sort: {createdAt:-1}});
	}
});
