/*jshint latedef:false */
var path = require('path'),
	util = require('util'),
	grunt = require('grunt'),
	ScriptBase = require('../script-base.js'),
	generatorUtil = require('../util.js'),
	ModelGenerator = require('../model/index.js');

grunt.util._.mixin( require('underscore.inflections') );

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor (argument) {
	var cb = this.async(),
		self = this;

	// a bit verbose prompt configuration, maybe we can improve that
	// demonstration purpose. Also, probably better to have this in other generator, whose responsability is to ask
	// and fetch all realated bootstrap stuff, that we hook from this generator.
	var prompts = [{
		name: 'model',
		message: 'Would you like to create associate model (' + this.name + ')?',
		default: 'y/N'
	},
	{	name: 'tpl',
		message: 'Would you like to create associate template (' + this.name + ')?',
		default: 'Y/n'
	},
	{
		name: 'sass',
		message: 'Would you like to create associate sass file (' + this.name + ')?',
		default: 'Y/n'
	}];
  
	this.prompt(prompts, function(e, props) {
		if(e) { return self.emit('error', e); }
		
		// manually deal with the response, get back and store the results.
		// We change a bit this way of doing to automatically do this in the self.prompt() method.
		self.model = false;
		if( props.model != "y/N" ) {
			if( props.model == "y" ) {
				self.model = self.name;
			} else if( !(/n/i).test(props.model) ) {
				self.model = props.model;
			}
		}
		
		self.tpl = self.name;
		if( props.tpl != "Y/n" ) {
			if( props.tpl == "n" ) {
				self.tpl = false;
			} else {
				self.tpl = props.tpl;
			}
		}
		
		self.sass = self.name;
		if( props.sass != "Y/n" ) {
			if( props.sass == "n" ) {
				self.sass = false;
			} else {
				self.sass = props.sass;
			}
		}
		
		// we're done, go through next step
		cb();
	});
};

Generator.prototype.createViewFiles = function createCollectionFiles() {
	a = this.name.split("/");
	if (a.length > 1) {
		n = a.pop();
		this.fileName = n;
		this.folder = a.join('/');
	} else {
		this.fileName = this.folder = this.name;
	}

	this.template('view.coffee', 'src/views/' + this.folder + "/" + this.fileName + '_view.coffee');
	
	if( this.model ) {
		mg = new ModelGenerator(this.options);
		mg.name = this.fileName;
		mg.createModelFiles();
	}
	
	if( this.sass ) {
		this.template('view.sass', path.join('src/views', this.folder, '_' + this.fileName + '.sass'));
		var file = 'src/main.sass';
		var body = grunt.file.read(file);

		body = generatorUtil.rewrite({
			needle: '// <here> don\'t remove this comment',
			haystack: body,
			splicable: [
				'@import ' + path.join('views/' + this.folder + '/' + this.fileName)
			]
		});

		grunt.file.write(file, body);
	}
	
	if( this.tpl ) {
		this.template('view.jade', path.join('src/views', this.folder, this.fileName + '.jade'));
	}
};
