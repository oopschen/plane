/**
* auto detect dir and parse every file to reg events
* rules:
* 	exports.evt_click stand for event "click" , casesensitive
* 	exports.evt_click_dot stand for event "click.dot" , casesensitive
**/
var fs = require('fs');
var xtower = require('./lib/xtower');
var gEvts = {
	detectDir:'_detect_dir',
	regEvt:'_reg_evt',
	loadEvt:'_load_evt',
	complete:'_complete_load',
	detectDirCB:'_detect_dir_cb'
};

var assemleFile = function() {
	var fullPath = '';
	for(var i=0;i<arguments.length;i++) {
		fullPath += arguments[i] + '/';
	};
	return fullPath.replace(/\/\/+/g,'/').replace(/\/$/g,'');
};
var isRegProp = function(prop){
	if(!prop) {
		return false;
	}
	return 0 == prop.indexOf('evt_');
};
var formatProp = function(prop) {
	if(!prop) {
		return '';
	}
	return prop.replace(/^evt_(.*)$/,'$1').replace(/_/g,'.');
};
var isFSNameCorrect = function(name) {
	return null != /\.js$/g.exec(name) 
};
/**
* input dirname,relative to this file
* output [files]
*/
var detectDir = function(tower,path) {
	fs.readdir(path,function(error,files){
		if(error) {
			console.error('directory not exits %s',path);
			return;
		}
		if(!files || 0 == files.length) {
			console.error('no files found at %s',path);
			return;
		}
		for(var i=0;i<files.length;i++) {
			tower.fire(gEvts.detectDirCB,assemleFile(path,files[i]));
		}
	});
};
xtower.on(gEvts.detectDir,detectDir);

var regEvt = function(tower,name,cb){
	console.info('reg event "%s"',name);
	tower.on(name,cb);
};
xtower.on(gEvts.regEvt,regEvt);

/**
* parse every file and reg every method to tower
*/
var loadEvt = function(tower,file){
	console.log('load file success[%s]',file);
	var obj = require(file);
	for(var i in obj) {
		if(!isRegProp(i)) {
			continue;
		}
		tower.fire(gEvts.regEvt,formatProp(i),obj[i]);
	}
};
xtower.on(gEvts.loadEvt,loadEvt);


exports.fly = function(path,cb){
	xtower.on(gEvts.complete,cb);
	xtower.on(gEvts.detectDirCB,function(tower,file) {
		if(!file) {
			console.error("[%s] detect error",file);
			return;
		}

		fs.stat(file,function(error,stats) {
			if(error) {
				return;
			}
			// if file fire loadEvt
			if(stats.isFile()) {
				if(!isFSNameCorrect(file)) {
					return;
				}
				tower.fire(gEvts.loadEvt,file);
			} else if(stats.isDirectory()) {
				tower.fire(gEvts.detectDir,file);
			}
		});
	});
	xtower.fire(gEvts.detectDir,assemleFile(path));
	xtower.fire(gEvts.complete);
};
