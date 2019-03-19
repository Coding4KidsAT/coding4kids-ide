import { ShareJS } from 'meteor/edemaine:sharejs';

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
	name: 'main',
	waitOn: function() {
		return [
			Meteor.subscribe('allprojects'),
			Meteor.subscribe('editors')
		]
	}
});

Router.route('/edit/:_id', {
	name: 'edit',
	waitOn: function() {
		return [

			Meteor.subscribe('singleProject', this.params._id),
			Meteor.subscribe('editors')
		]
	},
	data: function() {
		return {
			filename: 'index.html',
			project: Projects.findOne(this.params._id)
		};
	}
});

Router.route('/edit/:_id/:filename', {
	name: 'editFile',
	template: 'edit',

	waitOn: function() {
		return [
			Meteor.subscribe('singleProject', this.params._id),
			Meteor.subscribe('editors')
		]
	},
	data: function() {

		return {
			project: Projects.findOne(this.params._id),
			filename: this.params.filename
		};
	}
});


Router.route('/show/:_id', {       				//preview public&featured projects
	action: function() {

		this.response.writeHead('302', {
			'Location': '/show/' + this.params._id + '/index.html'
		});
		this.response.end();
	},
	where: 'server'});

var send404 = function(res, message) {
	console.log('404 ' + message);
	res.writeHead(404, message);
	res.end();
}

var deliverVersion = function(res, id, versionId, filename, userId) {
	var project = Projects.findOne(id);
	if (!project) {
		return send404(res, 'Project not found');
	} else if (typeof project.versions === 'undefined') {
		return send404(res, 'No versions set');
	}

	if(! versionId) {
		if (!project.publicVersion) {
			return send404(res, 'No public version set');
		} else {
			versionId = project.publicVersion;
		}
	} /*else if (!userIsProjectEditor(project, userId)) {
		console.log('403 User is not project editor');
		res.writeHead(403, 'User is not project editor');
		res.end();
		return;
	} */

	var version = _.find(project.versions, function(version) {
		return version.version == versionId;
	});

	if (typeof version === 'undefined') {
		return send404(res, 'Public version not found');
	}

	var file = _.find(version.content, function(file) {
		return file.filename === filename;
	});

	if (!file) {
		return send404(res, 'File not found');
	}

	var header= getMime(file.filename);
	res.setHeader("content-type", header );
	res.end(file.content);
}

Router.route('/show/:_id/:filename', {
	name: 'show',
	action: function() {
		deliverVersion(this.response, this.params._id, 0, this.params.filename);
	},
	where: 'server'});

Router.route('/runversion/:_id/:version/:filename', {
	name: 'runversion',
	action: function() {
		deliverVersion(this.response, this.params._id, this.params.version, this.params.filename /*, Meteor.userId()*/);
	},
	where: 'server'});

getContent = function(id, filename) {
	try {
		var docId = id + '_' + filename;
		var doc = Meteor.wrapAsync(ShareJS.model.getSnapshot)(docId);
		return doc.snapshot;
	} catch(e) {
		return '';
	}
};

deliverContent = function(res, id, filename) {
	filecontent = getContent(id, filename);

	var header= getMime(filename);
	res.setHeader("content-type", header );
	res.end(filecontent);
};

Router.route('/run/:_id/:filename', {
	name: 'run',
	action: function() {
		deliverContent(this.response, this.params._id, this.params.filename);
	},where: 'server'});

Router.route('/run/:_id', {                       //redirect to "index.html"
	action: function() {
		deliverContent(this.response, this.params._id, 'index.html');
	},where: 'server'});


Router.route('/ops/:_id/:filename', {
	name: 'ops',
	action: function() {
		this.response.setHeader("Content-Type", "text/plain");

		try {
			var docId = this.params._id + '_' + this.params.filename;
			var ops = Meteor.wrapAsync(ShareJS.model.getOps)(docId, 0, null);

		} catch(e) {
			console.log(e);
		}

		this.response.end(EJSON.stringify(ops));
	},where: 'server'});



Router.onBeforeAction(function() {
	if (! ((userMayEditProject(Projects.findOne(this.params._id))) || (Projects.findOne(this.params._id).publicFlag))) {
    	Router.go('main');
    	this.next();
  	}else {
    	this.next();
 	}
}, {only: 'edit'});
