Meteor.startup ->
	if Projects.find().count() == 0
		Projects.insert
			name: 'Test Project'
			description: 'Little description'
			publicFlag: false
			featured: false
			files: [
				filename: 'index.html'
			,
				filename: 'style.css'
			]
			editor: []
			versions:[]