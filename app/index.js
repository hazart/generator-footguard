'use strict';
var path = require('path');
var util = require('util');
var exec = require('child_process').exec;
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
	yeoman.generators.Base.apply(this, arguments);
	
	var welcome =
	'\n                                                              :::  '        +
	'\n                                                              :::  '        +
	'\n                                                              :::  '        +
	'\n   :::::::::::      :::::::::::     :::::::::::        ::::::::::  '        +
	'\n   :::::::::::::  :::::::::::::   :::::::::::::::    ::::::::::::  '        +
	'\n             :::  :::            :::           :::  :::            '        +
	'\n             :::  :::            :::           :::  :::            '        +
	'\n             :::  :::            :::    :::    :::  :::            '        +
	'\n             :::  :::            :::    :::    :::  :::            '        +
	'\n             :::  :::            :::           :::  :::            '        +
	'\n             :::  :::            :::           :::  :::            '        +
	'\n   :::::::::::::  :::             :::::::::::::::   :::::::::::::  '        +
	'\n   ::::::::::::   :::               :::::::::::       :::::::::::  '        +
	'\n   :::                                                             '        +
	'\n   :::                                                             '        +
	'\n   :::                                                             '        
                                                
	console.log(welcome);
}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.setupEnv = function setupEnv() {
	// Copies the contents of the generator `templates`
	// directory into your users new application path
	console.log("");
	console.log("Install starter's files");
	console.log("=======================");
	this.directory('.','.', true);
};

Generator.prototype.installNodeModules = function setupEnv() {
	var cb = this.async();
	
	console.log("");
	console.log("Install node modules dependencies");
	console.log("=================================");
	
	exec('npm install', function(error, stdout, stderr) {
		console.log(stdout);
		cb();
	});
};

Generator.prototype.installBowerModules = function setupEnv() {
	var cb = this.async();
	
	console.log("");
	console.log("Install bower modules dependencies");
	console.log("==================================");
	
	exec('bower install', function(error, stdout, stderr) {
		console.log(stdout);
		cb();
	});
};
