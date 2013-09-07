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
		message: 'Would you like to create associate model (' + grunt.util._.singularize(this.name) + ')?',
		default: 'y/N',
	}];

	this.prompt(prompts, function(e, props) {
		if(e) { return self.emit('error', e); }
		
		// manually deal with the response, get back and store the results.
		// We change a bit this way of doing to automatically do this in the self.prompt() method.
		self.model = false;
		if( props.model != "y/N" ) {
			if( props.model == "y" ) {
				self.model = grunt.util._.singularize(self.name);
			} else if( !(/n/i).test(props.model) ) {
				self.model = props.model;
			}
		}
		
		self.test = (/y/i).test(props.test);
		
		// we're done, go through next step
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
		mg = new ModelGenerator(this.options);
		mg.name = this.modelName;
		mg.createModelFiles();
	}
};
