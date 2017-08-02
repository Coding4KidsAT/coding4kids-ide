Template.main.events({

	'click .popular-sort':function(e){
		e.preventDefault();
		Session.set('sort', "popular");
	},

	'click .recent-sort':function(e){

		Session.set('sort', "recent");
	}
});

Template.main.helpers({

	verifySort:function(){
		return Session.get('sort');
	}

});
