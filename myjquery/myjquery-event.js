
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