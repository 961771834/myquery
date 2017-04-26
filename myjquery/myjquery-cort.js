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
