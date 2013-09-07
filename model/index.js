/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  ScriptBase = require('../script-base.js'),
  generatorUtil = require('../util.js');

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
	var prompts = [];
  
	this.prompt(prompts, function(e, props) {
		if(e) { return self.emit('error', e); }
		cb();
	});
};

Generator.prototype.createModelFiles = function createCollectionFiles() {
	this.template('model.coffee', path.join('src/models', this.name + '_model.coffee'));
};
