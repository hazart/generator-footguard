/*jshint latedef:false */
var path = require('path'),
	util = require('util'),
	grunt = require('grunt'),
	ScriptBase = require('../script-base.js'),
	generatorUtil = require('../util.js'),
	ModelGenerator = require('../model/index.js');
	helpers = require('yeoman-generator').test;	

grunt.util._.mixin( require('underscore.inflections') );

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor (argument) {
	var cb = this.async(),
		self = this;

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
		name: 'styl',
		message: 'Would you like to create associate stylus file (' + this.name + ')?',
		default: 'Y/n'
	},
	{
		name: 'func',
		message: 'Would you like to create associate functional test file (' + this.name + ')?',
		default: 'y/N'
	},
	{
		name: 'module',
		message: 'Would you like to create associate require module (' + this.name + ')?',
		default: 'Y/n'
	}];
  
	this.prompt(prompts, function(props) {
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
		
		self.styl = self.name;
		if( props.styl != "Y/n" ) {
			if( props.styl == "n" ) {
				self.styl = false;
			} else {
				self.styl = props.styl;
			}
		}

		self.func = false;
		if( props.func != "y/N" ) {
			if( props.func == "y" ) {
				self.func = true;
			} else if( !(/n/i).test(props.func) ) {
				self.func = props.func;
			}
		}		

		self.module = self.name;
		if( props.module != "Y/n" ) {
			if( props.module == "n" ) {
				self.module = false;
			} else {
				self.module = props.module;
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
		mg = new helpers.createGenerator(
			'pr0d:model',
      			[__dirname + '/../model'],
      			[this.fileName, this.folder]
      		);
      		helpers.mockPrompt(mg, {
			unit: this.unit ? 'y' : 'n'
		});
		mg.run();
	}
	
	if( this.styl ) {
		this.template('view.styl', path.join('src/views', this.folder, this.fileName + '.styl'));
	}
	
	if( this.tpl ) {
		this.template('view.jade', path.join('src/views', this.folder, this.fileName + '.jade'));
	}

	if( this.func ) {
		this.template('view_test.coffee', path.join('tests/func/src/views', this.folder, this.fileName + '_test.coffee'));
	}

	if( this.module ) {
		var file = 'Gruntfile.coffee';
		var body = grunt.file.read(file);

		body = generatorUtil.rewrite({
			needle: '# view modules',
			haystack: body,
			splicable: [
				'						{ name: \'views/'+this.folder+'/'+this.fileName+'_view\', exclude: [\'vendors\', \'init\', \'app\', \'normalize\'] }' 
			]
		});
		grunt.file.write(file, body);
	}
};
