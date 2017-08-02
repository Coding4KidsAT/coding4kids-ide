Template.editSettingsModal.helpers
	checked: (theme) ->
		if Meteor.user().profile.settings?.theme == theme
			checked: 'checked'
		else if theme == 'monokai'
			checked: 'checked'

Template.editSettingsModal.events
	'click .btn-primary': (e, template) -> 
		e.preventDefault()
		Modal.hide template

		Meteor.users.update Meteor.userId(), $set:
			'profile.settings.theme': template.$('[name="theme"]:checked').val()


