

exports.setParam = setParam = function(ctx,key,value){
	if(value !== undefined){
		ctx[key] = value;
	}	
}