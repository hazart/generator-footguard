/*jshint latedef:false */
var path = require('path'),
	util = require('util'),
	grunt = require('grunt'),
	ScriptBase = require('../script-base.js'),
	generatorUtil = require('../util.js'),
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

	// a bit verbose prompt configuration, maybe we can improve that
	// demonstration purpose. Also, probably better to have this in other generator, whose responsability is to ask
	// and fetch all realated bootstrap stuff, that we hook from this generator.
	var prompts = [{
		name: 'model',
		message: 'Would you like to create associate model (' + grunt.util._.singularize(this.name) + ')?',
		default: 'Y/n',
	},
	{
		name: 'unit',
		message: 'Would you like to create associate unit test (' + this.name + ')?',
		default: 'y/N'
	}];

	this.prompt(prompts, function(props) {		
		// manually deal with the response, get back and store the results.
		// We change a bit this way of doing to automatically do this in the self.prompt() method.
		self.model = true;
		if( props.model != "Y/n" ) {
			if( props.model == "y" ) {
				self.model = grunt.util._.singularize(self.name);
			} else if( !(/n/i).test(props.model) ) {
				self.model = props.model;
			}
		}
		
		self.unit = false;
		if( props.unit != "y/N" ) {
			if( props.unit == "n" ) {
				self.unit = false;
			} else if( !(/n/i).test(props.unit) ) {
				self.unit = props.unit;
			}
		}

		cb();
	});
};

Generator.prototype.createCollectionFiles = function createCollectionFiles() {
	a = this.name.split("/");
	if (a.length > 1) {
		n = a.pop();
		this.fileName = n;
		this.folder = a.join('/');
	} else {
		this.fileName = this.name;
		this.folder = '';
	}

	this.modelName = grunt.util._.singularize(this.fileName);

	this.template('collection.coffee', path.join('src/collections', this.folder, this.fileName + '_collection.coffee'));
	
	if( this.model ) {
		mg = new helpers.createGenerator(
			'pr0d:model',
      			[__dirname + '/../model'],
      			[this.modelName, this.folder]
      		);
      		helpers.mockPrompt(mg, {
			unit: this.unit ? 'y' : 'n'
		});
		mg.run();
	}

	if( this.unit ) {
		this.template('collection_test.coffee', path.join('tests/unit/src/collections', this.fileName + '_test.coffee'));

		var file = path.join('tests','unit','index.html');
		var body = grunt.file.read(file);

		body = generatorUtil.rewrite({
			needle: '// <test scripts>',
			haystack: body,
			splicable: [
				'				\'collections/'+this.fileName+'_test\','
			]
		});
		grunt.file.write(file, body);

	}	
};
