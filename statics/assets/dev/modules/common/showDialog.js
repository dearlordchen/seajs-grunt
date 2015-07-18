/*
 *小巧的显示浮层函数，能居中，有半透明背景蒙板。用来代替体形巨大的$float({style:none}	        
 *显示Dialog
 */
define(function(require, exports, module){
	
	var Dialog = null;
	  
	var $showDialog = function(opt){
		//如果有的话，先关闭存在的浮层   
		if(Dialog){
			Dialog.close();
		} 
		var option = {
			sid:"",	//要显示的浮层的id（或其本身）
			cid:"",	//隐藏该浮层的id（或其本身）
			bgColor:"#000000",//背景默认#000000
			zIndex:"50",//背景默认50
			snodeZIndex: "90",//弹窗的zIndex
			opacity:0.3,//背景默认0.3
			location:true,//是否需要函数处理居中
			fix:false,//是否固定在页面中,
			closeTime:undefined,//自动关闭的时间
			onclose:$empty() //关闭时的事件
		};
		for (var i in opt) {
        	option[i] = opt[i];
    	}
    	var sid = option.sid , cid = option.cid;
	    if(!window.mask){
		    window.mask=$floatMask({
	            backgroundColor:option.bgColor,
	            zIndex:option.zIndex,
	            opacity:option.opacity
	        });
		}
		var sndoe = "";
		typeof sid == "string"?sndoe = $id(sid):sndoe = sid;
		if(!sndoe){
			return;
		}
		window.mask.show(); 
		sndoe.style.display = "block";
		sndoe.style.zIndex = option.snodeZIndex;
		//居中
		if(option.location){
			var w = parseInt(sndoe.offsetWidth);
			var h = parseInt(sndoe.offsetHeight);
			var psw = $getPageScrollWidth(), ww = $getWindowWidth(), psh = $getPageScrollHeight(), wh = $getWindowHeight();
			if(option.fix){
				sndoe.style.left = (ww - w) / 2 + "px";
		    	sndoe.style.top = (wh - h) / 2 + "px";
			}else{
				sndoe.style.left = psw + (ww - w) / 2 + "px";
		    	sndoe.style.top = psh + (wh - h) / 2 + "px";
			}
		}
	    if(cid){
			if(typeof cid != "string"){
				cid.onclick = function(){
					closeDialog(sid,option.onclose);
				}
			}else{
				var cids = cid.split(","), i = 0;
				while(cid = cids[i++]){
					cid = $id(cid);
					if(cid){
						cid.onclick = function(){
							closeDialog(sid,option.onclose);
						}
					}
				}
			}
			
	    	
	    }
	    if(option.closeTime && /^\d+$/.test(option.closeTime+"")){
	    	setTimeout(function(){
	    		closeDialog(sid,option.onclose);
	    	},option.closeTime);
	    }
	    return Dialog = (new function(){
	    	this.close = function(){
	    		closeDialog(sid,option.onclose);
	    	}
	    });
	};
	function closeDialog(id,func){
		func && func();
		Dialog = null;
		if(typeof id == "string"){
			$id(id).style.display = "none";
		}else{
			id.style.display = "none";
		}
		window.mask.hide();
	}
	
	function $empty(){
//返回全局空函数，不做任何事情，返回true；
   return function(){return true;}
};
function $extend(){
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, options;
	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target != "object" && typeof target != "function" )
		target = {};
	for ( ; i < length; i++ )
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null )
			// Extend the base object
			for ( var name in options ) {
				var copy = options[ name ];
				// Prevent never-ending loop
				if ( target === copy )
					continue;
				if ( copy !== undefined )
					target[ name ] = copy;
			}
	// Return the modified object
	return target;
};
var $floatMask=(function(){
	/**
	 * 创建浮层遮罩对象
	 */
	var ie6=$isBrowser("ie6");
	//显示
	function show(){
		var c=this.mask;
		c.style.display = "block";
		keepMaskShow(c);
		if(!c.t){
			c.t = setInterval(function() {
				keepMaskShow(c);
			}, 50);
		}
	}
	//隐藏
	function hide(){
		var c=this.mask;
		c.style.display = "none";
		if(c.t){
			c.t=clearInterval(c.t);
		}
	}
	//保持浮层的全屏幕覆盖尺寸
	function keepMaskShow(c) {
		var ch = $getContentHeight(), wh = $getWindowHeight(), cw = $getContentWidth(), ww = $getWindowWidth(), ns = [wh, ww];
		if(ie6) {
			c.style.top = $getPageScrollHeight() + "px";
			c.style.left = $getPageScrollWidth() + "px";
		}
		if(ns.toString() != c.s.toString()) {
			c.s = ns;
			c.style.height = ns[0].toFixed(0) + "px";
			c.style.width = ns[1].toFixed(0) + "px";
			if(c.f) {
				c.f.style.height = ns[0].toFixed(0) + "px";
				c.f.style.width = ns[1].toFixed(0) + "px";
			}
		}
	}
	//创建浮层对象
	function createMask(opt) {
		opt=opt||{
			backgroundColor:"",
			zIndex:"",
			opacity:""
		};
		var c = document.createElement("div");
		c.style.display = "none";
		c.style.width = "0px";
		c.style.height = "0px";
		c.style.backgroundColor = opt.backgroundColor||"#000000";
		c.style.zIndex = opt.zIndex||250;
		c.style.position = "fixed";
		c.style.hasLayout = -1;
		c.style.left = "0px";
		c.style.top = "0px";
		c.style.filter = "alpha(opacity="+opt.opacity*100||80+");";
		c.style.opacity = opt.opacity||"0.8";
		document.body.appendChild(c);
		if(ie6) {
			var iframe=document.createElement("iframe");
			$extend(iframe.style,{
				position:"absolute",
				left:"0px",
				top:"0px",
				width:"100%",
				zIndex:-1,
				border:"none",
				backgroundColor:opt.backgroundColor||"#000000"
			});
			iframe.setAttribute("allowtransparency","yes");
			var t=setInterval(function(){
				try{
					iframe.contentWindow.document.body.style.backgroundColor=opt.backgroundColor||"#000000";
					clearInterval(t);
				}catch(e){}
			},50);
			c.appendChild(iframe);
			c.style.position = "absolute";
			c.f=iframe;
		}
		c.s = [0, 0];
		return c;
	}
	return function(opt){
		return {
			mask:createMask(opt),
			show:show,
			hide:hide
		};
	}
})();
function $getContentHeight(){
//获取页面内容的实际高度
var bodyCath=document.body;
var doeCath=document.compatMode=='BackCompat'?bodyCath:document.documentElement;
return (window.MessageEvent&&navigator.userAgent.toLowerCase().indexOf('firefox')==-1)?bodyCath.scrollHeight:doeCath.scrollHeight;
};
function $getContentWidth(){
//获取页面内容的实际宽度
	var bodyCath=document.body;
	var doeCath=document.compatMode=='BackCompat'?bodyCath:document.documentElement;
	return (window.MessageEvent&&navigator.userAgent.toLowerCase().indexOf('firefox')==-1)?bodyCath.scrollWidth:doeCath.scrollWidth;
};
function $getPageScrollHeight(){
	var bodyCath=document.body;
	var doeCath=document.compatMode=='BackCompat'?bodyCath:document.documentElement;
	var ua = navigator.userAgent.toLowerCase();
	return (window.MessageEvent && ua.indexOf('firefox')==-1 && ua.indexOf('opera')==-1&&ua.indexOf('msie')==-1)?bodyCath.scrollTop:doeCath.scrollTop;
};
function $getPageScrollWidth(){
	var bodyCath=document.body;
	var doeCath=document.compatMode=='BackCompat'?bodyCath:document.documentElement;
	return (window.MessageEvent&&navigator.userAgent.toLowerCase().indexOf('firefox')==-1)?bodyCath.scrollLeft:doeCath.scrollLeft;
};
function $getWindowHeight(){
	var bodyCath=document.body;
	return (document.compatMode=='BackCompat'?bodyCath:document.documentElement).clientHeight;
};
function $getWindowWidth(){
	var bodyCath=document.body;
	return (document.compatMode=='BackCompat'?bodyCath:document.documentElement).clientWidth;
};
function $id(id){
	return typeof(id)=="string"?document.getElementById(id):id;
};
function $isBrowser(str){
	str=str.toLowerCase();
	var b=navigator.userAgent.toLowerCase();
	var arrB=[];
	arrB['firefox']=b.indexOf("firefox")!=-1;
	arrB['opera']=b.indexOf("opera")!=-1;
	arrB['safari']=b.indexOf("safari")!=-1;
        arrB['chrome']=b.indexOf("chrome")!=-1;
	arrB['gecko']=!arrB['opera']&&!arrB['safari']&&b.indexOf("gecko")>-1;
	arrB['ie']=!arrB['opera']&&b.indexOf("msie")!=-1;
	arrB['ie6']=!arrB['opera']&&b.indexOf("msie 6")!=-1;
	arrB['ie7']=!arrB['opera']&&b.indexOf("msie 7")!=-1;
        arrB['ie8']=!arrB['opera']&&b.indexOf("msie 8")!=-1;
        arrB['ie9']=!arrB['opera']&&b.indexOf("msie 9")!=-1;
        arrB['ie10']=!arrB['opera']&&b.indexOf("msie 10")!=-1;
	return arrB[str];
}
	
	exports.showDialog  = $showDialog;
	
});