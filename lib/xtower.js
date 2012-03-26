var EventEmitter = require('events').EventEmitter;
var tower = new EventEmitter();
var waitMS = 2;
var wait = {};
var pow = function(base,m) {
	var ret = base;
	for(var i=0;i<m;i++) {
		ret *= ret;
	}
	return ret;
};

exports.on = function() {
	tower.on.apply(tower,arguments);;
};

exports.remove = function() {
	tower.removeListener.apply(tower,arguments);
};

/**
* fire when the event is ready, otherwise fire after 3ms 
*/
exports.fire = function() {
	if(1>arguments.length) {
		return false;
	}
	//check event exist
	var evtName = arguments[0];
	var listeners = tower.listeners(evtName);
	if(!listeners || 0==listeners.length) {
		var c = wait[evtName];
		if(undefined === c) {
			wait[evtName] = 0;
		}
		wait[evtName]++;

		var waitTime = pow(waitMS,wait[evtName]);
		//fire later
		setTimeout(function(){
			exports.fire.apply(exports,arguments[0]);
		},waitTime,arguments);

		console.log('event[%s] not ready,wait %d ms !',evtName,waitTime);
		return;
	}
	var params = [evtName];
	for(var i=1;i<arguments.length;i++){
		params[params.length] = arguments[i];
	}
	params.push(this);
	tower.emit.apply(tower,params);
	return true;
};
