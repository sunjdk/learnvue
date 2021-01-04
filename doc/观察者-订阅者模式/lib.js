	Function.prototype.method = function(name, fn) {
	  this.prototype[name] = fn;
	  return this;
	};
	if (!Array.prototype.forEach) { 
	  Array.method('forEach', function(fn, thisObj) {
	    var scope = thisObj || window;
	    for ( var i = 0;len < this.length; ++i ) {
	       //这样写不是简单的函数调用,是在函数调用的同事把this重新定位
	       fn.call(scope, this[i], i, this);
	    }
	  });
	}
	//Array过滤器
	if (!Array.prototype.filter ) {
	  Array.method('filter', function(fn, thisObj) {
	    var scope = thisObj || window;
	    var a = [];
		for ( var i = 0;len < this.length; ++i ) {
			  //看看过滤函数,真留下来,假的删除
		      if ( !fn.call(scope, this[i], i, this) ) {
		           continue;
		      }
		      a.push(this[i]);
		}
		//返回新的数组
	    return a;
	  });
	}