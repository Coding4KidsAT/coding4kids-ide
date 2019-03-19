{ ShareJS } = require 'meteor/edemaine:sharejs'

Meteor.methods
	newProject: (projectName,projectDescription) ->

		fileContents =
			'index.html': """
				<!DOCTYPE html>
				<html>
					<head>
						<meta charset="utf-8"/>
						<title>#{projectName}</title>
						<link rel="stylesheet" href="style.css"/>
					</head>
					<body>
						<h1>#{projectName}</h1>
						<p>#{projectDescription}</p>

						<script src="script.js"></script>
					</body>
				</html>
			""",
			'style.css': """
				/* Put your styles here */

			""",
			'script.js': """
				// Place your JavaScript code here

			"""

		project =
			name: projectName
			description: projectDescription
			editors: [ Meteor.userId() ]
			featured: false
			popularityCount: 0
			createdAt: new Date()
			files: _.map fileContents, (content, filename) ->
				filename: filename

		newId = Projects.insert project

		_.each fileContents, (content, filename) ->
			newdocId = newId + '_' + filename
			ShareJS.initializeDoc newdocId, content

		newId
