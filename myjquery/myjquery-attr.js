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