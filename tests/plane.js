var plane = require('../plane');
plane.fly(__dirname+'//yard',function(tower){
	tower.fire('hello','world');
	tower.fire('new.hi','ok');
	tower.fire('new.hi.lolo','ok');
});
