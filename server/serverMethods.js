import { ShareJS } from 'meteor/mizzao:sharejs';

Meteor.methods({

	forkProject: function(currentProjectId,projectName,projectDescription){

		var forkedProject=Projects.findOne(currentProjectId);
		var forkedFilename=forkedProject.name;
		delete forkedProject._id;
		delete forkedProject.versions;
		delete forkedProject.publicVersion;
		forkedProject.name=projectName;									//set the fields for the new project
		forkedProject.description=projectDescription;
		forkedProject.editors= [Meteor.user()._id];
		forkedProject.featured= false;
		forkedProject.popularityCount=0;
		forkedProject.createdAt=new Date();

		var newId = Projects.insert (forkedProject);
		_.each(forkedProject.files, function(file) {

			var newdocId = newId + '_' + file.filename;
			var content = getContent(currentProjectId, file.filename);
			ShareJS.initializeDoc(newdocId, content);

		});
		return newId;
	},

	popularityIncrease: function(project){
		Projects.update(project._id, {$inc: {popularityCount: 1}});
	},


	saveProject: function(project){

		var contentObject=[];
		_.each(project.files, function(file) {
			var fileContent = getContent(project._id, file.filename);
			contentObject.push({
				filename: file.filename,
				content: fileContent
			});
		});

		var versionNumber=0;
		if( typeof project.versions === "undefined" || project.versions.length === 0) {
			versionNumber=1;
		}else{
			versionNumber= (project.versions[project.versions.length-1]).version + 1;
		}

		Projects.update(project._id, {
			$push: {
				versions: {
					version: versionNumber,
					date: new Date(),
					content: contentObject
				}
			}
		});

		return versionNumber;
	},


	revertProject: function(currentProjectId, version){

		var revertedProject=Projects.findOne(currentProjectId);

		_.each(version.content, function(file) {

			var docId = currentProjectId + '_' + file.filename;
			ShareJS.model.delete(docId);
			ShareJS.initializeDoc(docId, file.content);

		});
		return version.versionNumber;
	},
});
