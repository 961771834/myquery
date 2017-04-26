
/*myjquery*/
/*沙箱环境*/
(function(Window){
	var arr = [],
	push = arr.push,
	slice = arr.slice;
	/*工具函数,可做为这个constructor的私有属性来获得应用*/
	Leon.isArrayLike = function (arr){
		var length = arr && arr.length;
		return typeof length == "number" && length >= 0 ;
	}
	Leon.each = function (arr,callback){
		if (Leon.isArrayLike(arr)) {
			/*如果是数组用for循环*/
			for(var i = 0 ; i < arr.length ; i++){
				/*return flase 时要跳出循环*/
				if (callback.call(arr[i],i,arr[i]) == false) break ;
			}
		}else{
			/*如果不是数组用for-in循环*/
			for(var k in arr) {
				if(callback.call(arr[i],k,arr[k]) == false ) break;
			}
		}
		return arr;
	}	

	Leon.map = function (arr,callback){
		var res = [],temp;
		if (Leon.isArrayLike(arr)) {
			/*如果是数组用for循环*/
			for(var i = 0 ; i < arr.length ; i++){
				/*return flase 时要跳出循环*/
				temp = callback.call(arr[i],i,arr[i]);
				if(temp !== undefined) res.push(temp);
			}
		}else{
			/*如果不是数组用for-in循环*/
			for(var k in arr) {
				temp = callback.call(arr[i],i,arr[i]);
				if(temp !== undefined) res.push(temp);
			}
		}
		return res;
	}

	/*选择器*/
	Leon.select = function (selector){
		return document.querySelectorAll(selector);
	};

	function fn(obj) {
		for(var k in obj ){
			this[k] = obj[k];
		}
	}
	Leon.extend = fn;
	Leon.pushStack = function(obj){
		
	}
	Leon.unquie = function (arr){
		var box = [],i,
		znewboj = z();
		for( i = 0;i < arr.length;i++){
			if(box.indexOf(arr[i]) !== -1){
				box.push(arr[i]);
			}
		}
		box.push.apply(znewboj,box);
		return znewboj;
	}

	/*=============================原型============================*/
	function Leon(selector){
		return new Leon.fn.init(selector);
	}

	/*在他的原型上添加方法，并把它的原型作为他的一个私有属性*/
	Leon.fn = Leon.prototype = {
		constructor:Leon,
		length:0,
		each:function(callback){
			return Leon.each(this,callback);
		},
		map:function(callback){
			return Leon.map(this,callback);
		},
		get:function (num){
			return num !== null ?(num >= 0 ? this[num] : this[this.length + num]) : this.toArray; 
		},
		toArray:function(){
			return slice.call(this);
		},
		end : function(obj){
			return this.pre || this;
		},
		pushStack:function(obj){
			obj.pre = this;
			return obj;
		},
		extend:fn,
	}

	/*映射原型*/
	
	/* 暴露变量让外界可以访问*/
	window.z = window.Leon = Leon;
})(window);