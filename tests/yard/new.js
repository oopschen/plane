var at = require('assert');
exports.evt_new_hi = function(text){
	at.equal('ok',text,text + ' not ok');
};
