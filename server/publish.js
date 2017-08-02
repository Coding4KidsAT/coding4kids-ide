Meteor.publish('allprojects', function() {
	var currentUserId = this.userId;

	if (currentUserId) {
		if (userIsAdmin(currentUserId)) {
			return Projects.find();
		} else {
			return Projects.find({$or:[{editors:currentUserId}, { publicVersion: {$exists: true}}]});
		}
	} else {
		return Projects.find({ publicVersion: {$exists: true}});
	}
});

Meteor.publish('editors', function() {
	var currentUserId = this.userId;
	return Meteor.users.find();
});

Meteor.publish('singleProject', function(id) {
	return Projects.find(id);
});

