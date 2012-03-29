var at = require('assert');
exports.evt_new_hi = function(tower,text){
	at.equal('ok',text,text + ' not ok');
};
