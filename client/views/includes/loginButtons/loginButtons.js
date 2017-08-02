Template._loginButtonsLoggedInDropdown.events({
	'click #login-buttons-edit-profile': function(event) {
		Modal.show('editProfileModal');
	},
	'click #login-buttons-edit-settings': function(event) {
		Modal.show('editSettingsModal');
	}
});