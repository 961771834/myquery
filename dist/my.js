
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
	Leon.fn.init.prototype = Leon.prototype;
	/* 暴露变量让外界可以访问*/
	window.z = window.Leon = Leon;
})(window);
(function(window){
	var Leon = window.Leon,
	z = Leon,
	arr = [],
	push = arr.push;
	init = Leon.fn.init = function(selector){
			/*处理null undefined */
			if(!selector) return this;
			/*处理string*/
			
			/*处理Leon对象*/
			if(selector.constructor == "Leon") {
				return this;
			};
			/*处理函数*/
			if(typeof selector == "function"){
				window.addEventListener('load',selector);
			}

			if(typeof selector == "string"){
				/*处理标签*/
				if(selector.charAt(0) == "<" && selector.charAt(selector.length-1) == ">"){
					push.apply(this,Leon.parseHtml(selector));
				}else{
					push.apply(this,Leon.select(selector));
				}
			}

			/*处理dom元素*/
			if(selector.nodeType){
				push.call(this,selector);
			}
			this.events = {};
			return this;
		}
})(window);

(function (window){
	Leon.parseHtml = function(strHtml){
		var div = document.createElement("div");
		div.innerHTML = strHtml;
		return div.childNodes;
		/*constructor*/
	}

	Leon.fn.extend({
		appendTo:function(dom){
			var dom = z(dom),
			len = dom.length,
			zNewobj = z(),
			arr = [],
			temp,  
			i ;
			/*如果dom是数组*/
			this.each(function(i,v){
				for(i = 0; i < len - 1;i++ ){
					temp = i == len - 1 ? this : this.cloneNode(true)
					dom[i].appendChild( temp );
					arr.push(tmp)
				}
				push.apply(zNewobj,arr);
			})
			return this.pushStack(zNewobj);
		},
		parent:function(){
			return this.pushStack( Leon.unquie(this.map(function(){
				return this.parentNode;
			}) ) )
		}
	})
	
})(window);

/*myjquery*/
/*沙箱环境*/
(function(Window){
	Leon.fn.extend({
		on:function(type,fn){
				/*询问对象是否有对应type的事件池*/
				if(!this.events[type]){
					/*没有创建一个*/
					this.events[type] = [];
					/*遍历每一个对象，调用事件池中函数*/
					var that = this;
					this.each(function(){
						var f = function(){
							/*遍历事件池中的函数一一调用*/
							for(var i = 0;i < that.events[type].length;i++){
								that.events[type][i]();
							}
						}
					
					/*兼容*/
					if( this.addEventListener ){
						this.addEventListener(type,f);
					}else{
						this.attachEvent("on"+ type,f);
					}

					})

				}
				/*如果已经有事件池，将该事件函数push进数组中*/
				this.events[type].push(fn);
				/*实现链式编程*/
				return this;
		},
		off:function(type,fn){
			var arr = this.events[type];
			if( arr ){
				/*如果存在事件池,遍历事件函数*/
				for(var i = 0;i < arr.length;i++){
					if( arr [ i ] == fn ){
						break;
					}
				}
				/*如果找到了删除*/
				if( i !== arr.length ){
					arr.splice(i,1);
				}
			return this;
			}
		},
		/*hover toggle*/
		hover:function(f1,f2){
			return this.mouseover(f1).mouseout(f2);
		},
		toggle:function(fn){
			var i = 0;
			var argu = arguments;
			this.on("click",function(){
				argu[i% argu.length]().call(this,e)
				i++;
			})
		},
		attr:function(name,value){
			if(value == undefined ){
				/*获得第一个dom元素的值*/
				return this[0].getAttribute(name);
			}else{
				return this.each(function(){
					return this.setAttribute(name,value)
				});
			}

		},
		prop:function(name,value){
			if(value == undefined ){
				/*获得第一个dom元素的值*/
				return this[0][name];
			}else{
				return this.each(function(){
					return this[name] = value;
				});
			}

		},
	});

	/*其他所有的事件*/
	Leon.each("webkitfullscreenerror,abort,blur,cancel,canplay,canplaythrough,"+
		"change,click,close,contextmenu,cuechange,dblclick,drag,dragend"+
		",dragenter,dragleave,dragover,dragstart,drop,durationchange,"+
		"emptied,ended,error,focus,input,invalid,keydown,keypress,keyup,"+
		"load,loadeddata,loadedmetadata,loadstart,mousedown,mouseenter,mouseleave,"+
		"mousemove,mouseout,mouseover,mouseup,mousewheel,pause,play,playing,progress,"+
		"ratechange,reset,resize,scroll,seeked,seeking,select,show,stalled,submit,suspend,"+
		"timeupdate,toggle,volumechange,waiting,beforecopy,beforecut,beforepaste,copy,cut,"+
		"paste,search,selectstart,wheel,webkitfullscreenchange,webkitfullscreenerror".split(","),function(i,v){
			Leon.fn[v] = function(callback){
			/*链式编程*/
				return this.on(v,callback);
		};
	})
	 
	window.z = window.Leon = Leon;
})(window);
(function(window){
	var z = window.z,
	z = Leon;
	Leon.fn.extend({
		attr:function(name,value){
			if (value === undefined) {
				/*获得第一个dom元素样式*/
				return this[0].getAttribute(name);
			}else{
				/*給伪数组中的每一个设置属性*/
				return this.each(function(){
					this.setAtrribute(name,value);
				})				
			}
		},
		prop:function(name,value){
			if(value === undefined){
				return this[0][name]				
			}else{
				return this.each(function(){
					this[name] = value;
				})
			}
		},
	});
/*批量给html,val,text*/
	Leon.each({
		html:"innerHTML",
		text:"innerText",
		val:"value"
	},function(i,v){
		Leon.fn[i]  = function(value){
			if(value === undefined){
				/*表示获得*/
				return this[0][v]
			}else{
				/*表示设置*/
				return this.each(function(){
					this[v] = value;
				})
			}
		}
	});

})(window);
(function(window){
	var z = window.z,
	z = Leon;
	Leon.fn.extend({
		css:function(name,value){
			/*判断是获取属性还是设置属性*/
			if(value === undefined){
				/*获得单个样式*/
				if(typeof value = 'string' ) {
						return this[0].style || window.getComputedStyle(this[0])[name];
					
				}else{
					/*传入对象时遍历对象，依次设置*/
					var this = that;
					return this.each(function(){
						Leon.each(name,function(i,v){
							/*注意这里不能用this,这里的this是指v*/
							that.style[k] = v;
						})
					});
				}
			}else{
				/*设置单个属性*/
				return this.each(function(){
					this.style[name] = value;
				})
			}
		},

		/*类名操作*/
		addClass:function(name){
			return this.each(function(){
				if(this.className){
					this.className += " " + name;
				}else{
					this.className = name;
				}
			})

		},
		removeClass:function(name){
			return this.each(function(){
				var names = this.className.split(" ");
				/*去掉*/
				/*fliter*/
				names.fliter(function(v){
					return v != name;
				})

				/*var newNames = name.map(function(v,i){
					if(v != name){
						return v;
					}
				});
				*/
				this.className = names.join(",");
			})
		},
		hasClass:function(name){
			/*判断第一个元素是否有类名*/
			this.pushStack();
			var names = this[0].className && this[0].className.split(" ") || [];
			if(names.indexOf(name) !== -1){
				return false;
			}else{
				return true;
			}
		},
		toggleClass:function(name){
			/*第一个元素切换类名*/
			return this.each(function(){
				var ele = z(this);
				if(ele.hasClass(name)){
					ele.removeClass(name);
				}else{
					ele.addClass(name);
				}	
			})
			
		}
	})


})(window);