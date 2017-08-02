Template.modal_errors.helpers({
	modal_errors: function() {
	return modalErrors.find();
  }
});

Template.modal_error.rendered = function() {
	var modal_error = this.data;

	Meteor.setTimeout(function () {
		modalErrors.remove(modal_error._id);
	}, 3000);

};