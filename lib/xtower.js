var EventEmitter = require('events').EventEmitter;
var tower = new EventEmitter();

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
	var listeners = tower.listeners(arguments[0]);
	if(!listeners || 0==listeners.length) {
		setTimeout(function(){
			exports.fire.apply(exports,arguments[0]);
		},2,arguments);
		console.log('event[%s] not ready,wait!',arguments[0]);
		return;
	}
	var params = [arguments[0]];
	for(var i=1;i<arguments.length;i++){
		params[params.length] = arguments[i];
	}
	params[params.length] = this;
	tower.emit.apply(tower,params);
	return true;
};
