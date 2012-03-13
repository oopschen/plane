var xtower = require('../lib/xtower');
xtower.fire('hell1');
xtower.on('hell1',function(){
	console.log('emit from hello');
});
