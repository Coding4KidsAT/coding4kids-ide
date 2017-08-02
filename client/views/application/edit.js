Template.edit.onRendered(function () {
	$(this.firstNode).layout({
		east__size: "400",
		west__minSize: "200",
		maskIframesOnResize: true,
		onshow: function (pane) {
			console.log('show ' + pane);
			$("#editor").resize();
		},
		onresize: function (pane) {
			$("#editor").resize();
		}
	});
	this.$('[data-toggle="tooltip"]').tooltip();

	this.$("#editor").resize();
});

Template.edit.helpers({			//helpers for ui-layout-center

	docId:function(){
		return this.project._id + "_"+ this.filename ;
	},

	previewVersionIsOn:function(){
		return 	Session.get('previewVersionOn');
	},

	configAce: function() {

		var that = this;
		return function(editor) {
			var authenticated=userMayEditProject(that.project);
			if(authenticated ==false){
				editor.on("focus", function(){
					editor.setReadOnly(true); 						//disable the editor
				});
			}
			var flag=true;
			editor.on('input', function(e){							//automatic reload
				if(flag == true){
					flag=false;
					setTimeout(function(){
						flag=true;
						if ($(".btn-group").hasClass("autoplay"))
							{
								$('#myResult')[0].contentWindow.location.reload();
							}
					},2000);
				}
			});

			var user = Meteor.user();
			if (user && user.profile.settings && user.profile.settings.theme) {
				editor.setTheme("ace/theme/" + user.profile.settings.theme);
			} else {
				editor.setTheme("ace/theme/monokai");
			}
			editor.setShowPrintMargin(false);
			editor.getSession().setUseWrapMode(true);

			var type= getMode(that.filename);
			editor.getSession().setMode(type);						//set the syntax highlighting

			$("#editor").on("resize", function() {
				editor.resize(true);
			});
		}
	},

	projectId: function() {
		return this.project._id;
	},


	activeRouteClass: function(/* route names */) {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();

		var active = _.any(args, function(name) {
		  return Router.current().route.name === name
		});

		return active && 'active';
	},

	versionIsSetPublic: function(){

		if( typeof this.project.publicVersion === "undefined" || this.project.publicVersion.length === 0){
			return false;
		}else{
			return true;
		}
	}

});

Template.edit.events({

	'submit form.newfile':function(e){
		e.preventDefault();
		var input = e.target.filename.value;

		if(!input.length)
		{
			throwError("File name is empty.");
		}
		else if(/[^a-z0-9\.\-\_]/gi.test(input) ){
			throwError("Incorrect File Name.");
		}
		else if (!getMode(input))
		{
			throwError("Unknown File type.");
		}
		else if((Projects.find({files: {filename: input}, _id: this.project._id}).count()!= 0) )			//check if such file already exists
		{
			throwError("File already exists.");
		}
		else {
			Projects.update(this.project._id, {$push: {files: {filename: input}}});  	//add a new file
		}

	},

	'click .btn-reload':function(e){							//reload the page
		e.preventDefault();

		var frame = $('#myResult')[0];

		if ($(frame).data('src')) {
			frame.contentWindow.location.href = $(frame).data('src');
			$(frame).data('src', '');
		} else {
			frame.contentWindow.location.reload();
		}
	},


	'click .btn-preview':function(e){							//open the page in new window
		e.preventDefault();
		window.open("/run/"+this.project._id+"/");
	},

	'click .btn-play':function(e){							//actvate automatic updating of the editor
		e.preventDefault();
		$(e.target).closest('.btn-group').removeClass('autoplay');
	},

	'click .btn-stop':function(e){							//deactive automatoc updating
		e.preventDefault();
		$(e.target).closest('.btn-group').addClass('autoplay');
		$('#myResult')[0].contentWindow.location.reload();
	},

	'click .toggle-editor .display .start-edit': function(e) {
		$(e.target).closest('.toggle-editor').addClass('editing');
	},

	'submit form.edit-name': function(e) {
		e.preventDefault();
		var newName = $(e.target).find('[name=name]').val();
		if(!newName){
			Modal.show('rejectUpdateModal');
		}else{
			Projects.update(this.project._id, {$set: {name: newName}});
			$(e.target).closest('.toggle-editor').removeClass('editing');
		}
	},


	'submit form.description': function(e) {
		e.preventDefault();
		var description = $(e.target).find('[name=project-description]').val();
		Projects.update(this.project._id, {$set: {description: description}});
		$(e.target).closest('.toggle-editor').removeClass('editing');
	},


	'click .btn-non-public':function(e){
		e.preventDefault();
		Projects.update(this.project._id, {$unset: {publicVersion:""}});
		Projects.update(this.project._id, {$unset: {publicVersionDate:""}});
	},

	'click .btn-public':function(e){
		e.preventDefault();
		var date=new Date;
		var that=this;
		Meteor.call('saveProject',this.project,function(err,data){
			if (err){
				console.log(err);
			}
			Projects.update(that.project._id, {$set: {publicVersion: data}});
			Projects.update(that.project._id, {$set: {publicVersionDate: date}});
		});
	},

	'click .btn-close-version':function(e){
		e.preventDefault();
		var source="/run/"+Projects.findOne()._id+"/index.html";
		$('#myResult').attr("src", source);
		Session.set('previewVersionOn',false);
	}
});

