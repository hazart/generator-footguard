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

	var prompts = [{
		name: 'unit',
		message: 'Would you like to create associate unit test (' + this.name + ')?',
		default: 'Y/n'
	}];
  
	this.prompt(prompts, function(e, props) {
		if(e) { return self.emit('error', e); }
		
		// manually deal with the response, get back and store the results.
		// We change a bit this way of doing to automatically do this in the self.prompt() method.
		self.unit = true;
		if( props.unit != "Y/n" ) {
			if( props.unit == "n" ) {
				self.unit = false;
			} else if( !(/n/i).test(props.unit) ) {
				self.unit = props.unit;
			}
		}
		
		// we're done, go through next step
		cb();
	});
};

Generator.prototype.createModelFiles = function createCollectionFiles() {
	a = this.name.split("/");
	if (a.length > 1) {
		n = a.pop();
		this.fileName = n;
		this.folder = a.join('/');
	} else {
		this.fileName = this.folder = this.name;
	}

	this.template('model.coffee', path.join('src','models', this.fileName + '_model.coffee'));

	if( this.unit ) {
		this.template('model_test.coffee', path.join('tests/unit/src/models', this.fileName + '_test.coffee'));

		var file = path.join('tests','unit','index.html');
		var body = grunt.file.read(file);

		body = generatorUtil.rewrite({
			needle: '// <test scripts>',
			haystack: body,
			splicable: [
				'				\'models/'+this.fileName+'_test\','
			]
		});
		grunt.file.write(file, body);

	}
};
