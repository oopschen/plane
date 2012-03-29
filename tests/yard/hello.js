var at = require('assert');
exports.evt_hello = function(tower,text){
	at.equal('world',text,text+' not world');
};
