(function(window){
	var z = window.z,
	z = Leon;
	Leon.fn.extend({
		css:function(name,value){
			/*判断是获取属性还是设置属性*/
			if(value === undefined){
				/*获得单个样式*/
				if(typeof value == 'string' ) {
						return this[0].style || window.getComputedStyle(this[0])[name];
					
				}else{
					/*传入对象时遍历对象，依次设置*/
					var that = this ;
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