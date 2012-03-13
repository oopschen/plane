var xtower = require('../lib/xtower');
xtower.on('hell1',function(){
	console.log('emit from hello');
});
xtower.on('hello',function(){
	console.assert(2 == arguments.length);
	console.log('hello ' + arguments[0]);
	arguments[1].fire('hell1');
});
xtower.fire('hello','world,xtower');
