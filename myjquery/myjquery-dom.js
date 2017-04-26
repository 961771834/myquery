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