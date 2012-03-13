var at = require('assert');
exports.evt_hello = function(text,tower){
	at.equal('world',text,text+' not world');
};
