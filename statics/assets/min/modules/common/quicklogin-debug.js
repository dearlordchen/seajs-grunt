define("common/quicklogin-debug",["common/cookie-debug"],function(a,b,c){function d(a,b,c){var d=n(c);if(""==a||0!=(a.indexOf("://")<0?location.href:a).indexOf("http"))return a;if(-1!=a.indexOf("#")){var e=a.match(/\?.+\#/);if(e){var f=e[0].split("#"),g=[f[0],"&g_tk=",d,"&g_ty=",b,"#",f[1]].join("");return a.replace(e[0],g)}var f=a.split("#");return[f[0],"?g_tk=",d,"&g_ty=",b,"#",f[1]].join("")}return""==d?a+(-1!=a.indexOf("?")?"&":"?")+"g_ty="+b:a+(-1!=a.indexOf("?")?"&":"?")+"g_tk="+d+"&g_ty="+b}function e(){return function(){return!0}}function f(a){function b(){t.onClose(t)&&(t.closeOther(),t.destruct())}function c(){var a=this;a.cover?v.data.closeCover():"",a.sizeTimer&&clearInterval(a.sizeTimer),a.fixTimer&&clearInterval(a.fixTimer),a.boxHandle?document.body.removeChild(a.boxHandle):"",a.boxHandel=a.boxHandle=null;for(var b=0,c=v.data.list.length;c>b;b++)v.data.list[b]&&a.id==v.data.list[b].id&&(v.data.list[b]=null);if(a.closeId)for(var d=a.closeId.split(","),c=d.length;c--;){var e=q(d[c]);e&&(e.onclick=null,e=null)}}function d(){for(var a=0,b=v.data.list.length;b>a;a++)v.data.list[a]&&v.data.list[a].leaver>=this.leaver&&this.id!=v.data.list[a].id&&v.data.list[a].destruct()}function f(){this.cover?v.data.showCover():"";var a=document.createElement("div"),b="",c=t.contentStyle?' style="'+t.contentStyle+'" ':"";switch(a.id=this.boxId="float_box_"+this.id,a.style.position="absolute",s("ie6")&&(b='<iframe frameBorder="0" style="position:absolute;left:'+t.bgframeLeft+"px;top:"+t.bgframeTop+'px;z-index:-1;border:none;" id="float_iframe_'+this.id+'"></iframe>'),t.style+""){case"stand":a.className=t.cName,a.innerHTML=b+'<div class="box_title" id="float_title_'+this.id+'"><a href="javascript:;" style="display:'+(this.showClose?"":"none")+';"  class="bt_close" id="float_closer_'+this.id+'">×</a><h4>'+this.title+'</h4></div><div class="box_content" '+c+">"+this.html+"</div>";break;case"":a.className=t.cName,a.innerHTML=b+'<div class="box_content" '+c+' id="float_title_'+this.id+'">'+this.html+"</div>";break;case"none":a.className="",a.innerHTML=b+'<div class="box_content" '+c+' id="float_title_'+this.id+'">'+this.html+"</div>";break;case"new":a.className=t.cName,a.innerHTML=b+'<div class="layer_inner"><div class="layer_hd" '+c+' id="float_title_'+this.id+'"><div class="layer_hd_title">'+this.title+'</div><a href="javascript:void(0);" class="layer_hd_close" id="float_closer_'+this.id+'">close</a></div><div class="layer_bd">'+this.html+"</div></div></div>"}document.body.appendChild(a),a=null,this.boxHandel=this.boxHandle=q("float_box_"+this.id),s("ie6")&&(this.boxIframeHandle=q("float_iframe_"+this.id)),this.boxTitleHandle=q(t.titleId||"float_title_"+this.id),this.boxCloseHandle=q("float_closer_"+this.id),this.isCoverClose?this.closeId+=",float_cover":"",this.height?this.boxHandle.style.height="auto"==t.height?t.height:t.height+"px":"",this.width?this.boxHandle.style.width="auto"==t.width?t.width:t.width+"px":"",this.boxHandle.style.zIndex=v.data.zIndex,this.sw=parseInt(this.boxHandle.offsetWidth),this.sh=parseInt(this.boxHandle.offsetHeight),this.setPos();var d=this;if(d.boxCloseHandle?d.boxCloseHandle.onclick=function(){return d.close(),!1}:"",d.closeId)for(var e=d.closeId.split(","),f=e.length;f--;){var g=q(e[f]);g&&(g.onclick=function(){return d.close(),!1},g=null)}d.keepBoxFix(),!d.onInit(t)}function i(a,b){var c=l(),d=p(),e=k(),f=o(),g=[0,0];a&&(this.left=a),b&&(this.top=b),g[0]=parseInt(this.left?this.left:c+(d-this.sw)/2),g[1]=parseInt(this.top?this.top:e+(f-this.sh)/2),g[0]+this.sw>c+d?g[0]=c+d-this.sw-10:"",g[1]+this.sh>e+f?g[1]=e+f-this.sh-10:"",g[1]<e?g[1]=e:"",g[0]<c?g[0]=c:"",s("ie6")&&(this.boxIframeHandle.height=this.sh-2+"px",this.boxIframeHandle.width=this.sw-2+"px"),this.boxHandle.style.left=g[0]+"px",this.boxHandle.style.top=g[1]+"px",this.keepBoxFix()}function j(a,b){a&&a.constructor===Number&&(this.sw=a,this.boxHandle.style.width=this.sw+"px",s("ie6")&&(this.boxIframeHandle.width=this.sw-2+"px")),b&&b.constructor===Number&&(this.sh=b,this.boxHandle.style.height=this.sh+"px",s("ie6")&&(this.boxIframeHandle.height=this.sh-2+"px")),this.setPos()}function m(){if(this.fix){var a=this;s("ie6")?!a.fixTimer&&(a.fixTimer=setInterval(function(){a.boxHandle.style.left=(a.left?a.left:l()+(p()-a.sw)/2)+"px",a.boxHandle.style.top=(a.top?a.top:k()+(o()-a.sh)/2)+"px"},30)):(a.boxHandle.style.position="fixed",a.boxHandle.style.left=(a.left?a.left:(p()-a.sw)/2)+"px",a.boxHandle.style.top=(a.top?a.top:(o()-a.sh)/2)+"px")}}function n(a,b){function c(){var a=document.createElement("div");a.id="float_cover",a.style.display="none",a.style.width="0px",a.style.height="0px",a.style.backgroundColor="#cccccc",a.style.zIndex=250,a.style.position="fixed",a.style.hasLayout=-1,a.style.left="0px",a.style.top="0px",a.style.filter="alpha(opacity="+100*t.opacity+");",a.style.opacity=t.opacity,document.body.appendChild(a),s("ie6")&&(a.innerHTML='<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;border:none;" id="float_cover_iframe"></iframe>',a.style.position="absolute"),v.data.cover=q("float_cover"),v.data.coverIframe=q("float_cover_iframe"),v.data.coverIsShow=!1,v.data.coverSize=[0,0],a=null}function d(){function a(){var a=v.data;if(a.coverIsShow){var b=(g(),o()),c=(h(),p()),d=[b,c];s("ie6")&&(a.cover.style.top=k()+"px"),d.toString()!=v.data.coverSize.toString()&&(a.coverSize=d,a.cover.style.height=d[0].toFixed(0)+"px",a.cover.style.width=d[1].toFixed(0)+"px",a.coverIframe&&(a.coverIframe.style.height=d[0].toFixed(0)+"px",a.coverIframe.style.width=d[1].toFixed(0)+"px"))}}v.data.cover.style.display="block",v.data.coverIsShow=!0,a(),v.data.coverTimer=setInterval(function(){a()},50)}function e(){v.data.cover.style.display="none",v.data.coverIsShow=!1,clearInterval(v.data.coverTimer)}a&&b&&w(a),v.data={},v.data.zIndex=t.zindex,v.data.list=[],c(),v.data.showCover=d,v.data.closeCover=e}var t={id:"",left:0,top:0,width:400,height:0,title:"",html:"",leaver:2,zindex:255,autoResize:!1,opacity:.5,cover:!0,isCoverClose:!1,dragble:!1,fix:!1,titleId:"",showClose:!0,closeId:"",bgframeLeft:-2,bgframeTop:-2,cName:"module_box_normal vt_float",style:"stand",contentStyle:"",needOutCss:1,cssUrl:window.config_float_css||"http://static.paipaiimg.com/module/module_box.css",onInit:e(),onClose:e()};for(var u in a)t[u]=a[u];var v=arguments.callee,x=window.location.hostname,y=(-1!=x.indexOf("qq.com"),-1!=x.indexOf("buy.qq.com"),-1!=x.indexOf("paipai.com"));return y&&(t.bgframeLeft=0,t.bgframeTop=0),v.data?"":n(t.cssUrl,t.needOutCss),t.id=t.id?t.id:++v.data.zIndex,t.close=b,t.destruct=c,t.closeOther=d,t.keepBoxFix=m,t.resize=j,t.show=f,t.setPos=i,t.closeOther(),t.show(),v.data.list.push(t),t.dragble&&r({barDom:t.boxTitleHandle,targetDom:t.boxHandle}),t}function g(){var a=document.body,b="BackCompat"==document.compatMode?a:document.documentElement;return window.MessageEvent&&-1==navigator.userAgent.toLowerCase().indexOf("firefox")?a.scrollHeight:b.scrollHeight}function h(){var a=document.body,b="BackCompat"==document.compatMode?a:document.documentElement;return window.MessageEvent&&-1==navigator.userAgent.toLowerCase().indexOf("firefox")?a.scrollWidth:b.scrollWidth}function i(a){var b=new RegExp("(^| )"+a+"(?:=([^;]*))?(;|$)"),c=document.cookie.match(b);return c?c[2]?unescape(c[2]):"":null}function j(a){var a=window.event?window.event:a;a.evt&&(a=a.evt);var b=[];return"undefined"!=typeof a.pageX?b=[a.pageX,a.pageY]:"undefined"!=typeof a.clientX&&(b=[a.clientX+m()[0],a.clientY+m()[1]]),b}function k(){var a=document.body,b="BackCompat"==document.compatMode?a:document.documentElement,c=navigator.userAgent.toLowerCase();return window.MessageEvent&&-1==c.indexOf("firefox")&&-1==c.indexOf("opera")&&-1==c.indexOf("msie")?a.scrollTop:b.scrollTop}function l(){var a=document.body,b="BackCompat"==document.compatMode?a:document.documentElement;return window.MessageEvent&&-1==navigator.userAgent.toLowerCase().indexOf("firefox")?a.scrollLeft:b.scrollLeft}function m(){var a=document.documentElement,b=document.body,c=a&&a.scrollLeft||b&&b.scrollLeft||window.pageXOffset||0,d=a&&a.scrollTop||b&&b.scrollTop||window.pageYOffset||0;return[c,d]}function n(a){var a=a?a:i("skey");return a?A(a):""}function o(){var a=document.body;return("BackCompat"==document.compatMode?a:document.documentElement).clientHeight}function p(){var a=document.body;return("BackCompat"==document.compatMode?a:document.documentElement).clientWidth}function q(a){return"string"==typeof a?document.getElementById(a):a}function r(a){var b={barDom:"",targetDom:""};for(var c in a)b[c]=a[c];var d=arguments.callee;d.option?"":d.option={},b.barDom.style.cursor="move",b.targetDom.style.position="absolute",b.barDom.onmousedown=function(a){var a=window.event||a;d.option.barDom=this,d.option.targetDom=b.targetDom;var c=[parseInt(b.targetDom.style.left)?parseInt(b.targetDom.style.left):0,parseInt(b.targetDom.style.top)?parseInt(b.targetDom.style.top):0];return d.option.diffPostion=[j({evt:a})[0]-c[0],j({evt:a})[1]-c[1]],document.onselectstart=function(){return!1},window.onblur=window.onfocus=function(){document.onmouseup()},!1},b.targetDom.onmouseup=document.onmouseup=function(){d.option.barDom&&(d.option={},document.onselectstart=window.onblur=window.onfocus=null)},b.targetDom.onmousemove=document.onmousemove=function(a){try{var a=window.event||a;d.option.barDom&&d.option.targetDom&&(d.option.targetDom.style.left=j({evt:a})[0]-d.option.diffPostion[0]+"px",d.option.targetDom.style.top=j({evt:a})[1]-d.option.diffPostion[1]+"px")}catch(a){}}}function s(a){a=a.toLowerCase();var b=navigator.userAgent.toLowerCase(),c=[];return c.firefox=-1!=b.indexOf("firefox"),c.opera=-1!=b.indexOf("opera"),c.safari=-1!=b.indexOf("safari"),c.chrome=-1!=b.indexOf("chrome"),c.gecko=!c.opera&&!c.safari&&b.indexOf("gecko")>-1,c.ie=!c.opera&&-1!=b.indexOf("msie"),c.ie6=!c.opera&&-1!=b.indexOf("msie 6"),c.ie7=!c.opera&&-1!=b.indexOf("msie 7"),c.ie8=!c.opera&&-1!=b.indexOf("msie 8"),c.ie9=!c.opera&&-1!=b.indexOf("msie 9"),c.ie10=!c.opera&&-1!=b.indexOf("msie 10"),c[a]}function t(){if(navigator.userAgent.match(/MSIE/)){try{return document.documentElement.doScroll("left"),!0}catch(a){}return!1}return document.body?!0:!1}function u(){return i("p_skey")&&i("p_uin")||i("skey")&&i("uin")?!0:!1}function v(a){var b={bid:"1",mid:"01",res:[],onBeforeReport:null,delay:5e3};for(var c in a)b[c]=a[c];b.res.length>0&&(window.reportWebInfo=function(a){},window.setTimeout(function(){b.onBeforeReport&&b.onBeforeReport(b);var a=b.bid+b.mid+"-"+b.res.join("|"),c="http://focus.paipai.com/webreport/ReportWebInfo?report="+a+"&t="+new Date/1e3;x({url:c})},b.delay))}function w(a,b){if(a){var c;return(!window._loadCss||window._loadCss.indexOf(a)<0)&&(c=document.createElement("link"),c.setAttribute("type","text/css"),c.setAttribute("rel","stylesheet"),c.setAttribute("href",a),c.setAttribute("id","loadCss"+Math.random()),document.getElementsByTagName("head")[0].appendChild(c),window._loadCss?window._loadCss+="|"+a:window._loadCss="|"+a),c&&"function"==typeof b&&(c.onload=b),!0}}function x(a){function b(){c&&(c.onload=c.onreadystatechange=c.onerror=null,c.parentNode&&c.parentNode.removeChild(c),c=null)}a.element=a.element||"script";var c=document.createElement(a.element);c.charset=a.charset||"utf-8",a.onBeforeSend&&a.onBeforeSend(c),c.onload=c.onreadystatechange=function(){(/loaded|complete/i.test(this.readyState)||-1==navigator.userAgent.toLowerCase().indexOf("msie"))&&(a.onLoad&&a.onLoad(),b())},c.onerror=function(){b()},c.src=a.url,document.getElementsByTagName("head")[0].appendChild(c)}function y(a){var b=[];for(var c in a)b.push(c+"="+a[c]);return b.join("&")}function z(a,b,c,d,e,f){var g=new Date,c=arguments[2]||null,d=arguments[3]||"/",e=arguments[4]||null,f=arguments[5]||!1;c?g.setMinutes(g.getMinutes()+parseInt(c)):"",document.cookie=a+"="+escape(b)+(c?";expires="+g.toGMTString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(f?";secure":"")}function A(a){for(var b=0,c=a.length,d=5381;c>b;++b)d+=(d<<5)+a.charAt(b).charCodeAt();return 2147483647&d}var B=a("common/cookie-debug");b.login=function(){},b.isLogin=function(){return B.get("wg_skey")&&B.get("wg_uin")||B.get("skey")&&B.get("uin")?!0:!1},b.getUin=function(){var a=B.get("wg_uin")||B.get("uin")||B.get("uin_cookie")||B.get("pt2gguin")||B.get("o_cookie")||B.get("luin")||B.get("buy_uin");return a?parseInt(a.replace("o",""),10):""},function(){var a=1;$login=function(b){var c=arguments.callee,d={option:{version:201309251107,title:"腾讯电商-请您登录后继续刚才的操作",containerId:"",floatDialog:!0,modalDialog:!0,dragable:!0,showClose:!0,quickLogin:!0,checkLogin:!0,checkReady:!0,showProtocol:!1,site:"paipai",noChangeQQ:!1,defaultQQ:"",type:"self",action:"",x:0,y:0,domain:"",skin:"http://static.paipaiimg.com/module/module_box.css",appid:"",onLogin:e(),onReset:e(),onClose:e(),onResize:e(),onSuccess:e(),onFailure:e()},v:function(){return this.option.version},init:function(b){var d=this.option;for(var e in b)d[e]=b[e];if(!d.checkReady||t()){var f=location.hostname,g=f.split(".");if(g.length>1){g=g[g.length-2]+"."+g[g.length-1];try{document.domain=d.domain||g}catch(h){}}return d.show=this.show,d.close=this.close,d.resize=this.resize,d.doAction=this.doAction,d.syncLogin=this.syncLogin,d.counter=a++,-1!=f.indexOf("paipai.com")&&(z("returnurl","",-1,"/","paipai.com"),z("referurl","",-1,"/","paipai.com")),d.checkLogin&&u()?void this.doAction():(this.registerLoginEvent(),this.load(d.skin),d.show(d),c.instance=d,d)}},syncLogin:function(){var a,b,c,e,f,g=location.hostname,h=-1!=g.indexOf("qq.com"),j=-1!=g.indexOf("wanggou.com"),k=!1;h?(a="http://ptlogin2.qq.com/ho_cross_domain?tourl="+encodeURIComponent("http://member.paipai.com/cgi-bin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20"),b="http://ptlogin2.qq.com/ho_cross_domain?tourl="+encodeURIComponent("http://member.wanggou.com/userlogin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20&daid=154"),c="http://ptlogin2.qq.com/ho_cross_domain?tourl="+encodeURIComponent("http://ecclogin.yixun.com/login/synclogin"),e="http://ptlogin2.qq.com/pt4_web_jump?succ_url="+encodeURIComponent("http://chong.qq.com")+"&daid=129&appid=677010801&pt4_token="+i("p_skey"),f="http://ptlogin2.qq.com/pt4_web_jump?succ_url="+encodeURIComponent("http://sudi.qq.com")+"&daid=189&appid=677010801&pt4_token="+i("p_skey")):j?(a="http://ptlogin2.wanggou.com/ho_cross_domain?tourl="+encodeURIComponent("http://member.paipai.com/cgi-bin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=21"),b="http://ptlogin2.wanggou.com/ho_cross_domain?tourl="+encodeURIComponent("http://user.buy.qq.com/cgi-bin/ping/visitkey"),c="http://ptlogin2.wanggou.com/ho_cross_domain?tourl="+encodeURIComponent("http://ecclogin.yixun.com/login/synclogin"),e="http://ptlogin2.wanggou.com/ho_cross_domain?tourl="+encodeURIComponent("http://chong.qq.com"),f="http://ptlogin2.wanggou.com/ho_cross_domain?tourl="+encodeURIComponent("http://sudi.qq.com")):(a="http://ptlogin2.paipai.com/ho_cross_domain?tourl="+encodeURIComponent("http://user.buy.qq.com/cgi-bin/ping/visitkey"),b="http://ptlogin2.paipai.com/ho_cross_domain?tourl="+encodeURIComponent("http://member.wanggou.com/userlogin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=18&daid=154"),c="http://ptlogin2.paipai.com/ho_cross_domain?tourl="+encodeURIComponent("http://ecclogin.yixun.com/login/synclogin"),e="http://ptlogin2.paipai.com/ho_cross_domain?tourl="+encodeURIComponent("http://chong.qq.com"),f="http://ptlogin2.paipai.com/ho_cross_domain?tourl="+encodeURIComponent("http://sudi.qq.com"));var l=function(){k||(k=!0,d.doAction()),m&&(clearTimeout(m),m=null)},m=setTimeout(function(){l()},2e3),n=new Image,o=new Image,p=new Image,q=new Image,r=new Image;n.src=a,o.src=b,p.src=c,q.src=e,r.src=f},data:{mapDaid:{"wanggou.com":154,"buy.qq.com":128,"shop.qq.com":127,"paipai.com":126,"sudi.qq.com":189,"kuyoo.cn":130,"chong.qq.com":129,"etg.qq.com":131,"wkd.qq.com":66,"weikeduo.qq.com":132,"victor.qq.com":133,"piao.qq.com":76,"go.qq.com":70,"gaopeng.qq.com":134,"gaopeng.com":135,"518.qq.com":152,"licai.qq.com":190,"51buy.com":68,"yixun.com":174}},tools:{getDaid:function(a){var b=d.data.mapDaid;for(var c in b)if(-1!=a.indexOf(c))return b[c];return-1}},registerLoginEvent:function(){ptlogin2_onLogin=function(){return c.instance.onLogin()?!0:!1},ptlogin2_onReset=function(){return c.instance.onReset()?!0:!1},ptlogin2_onClose=function(){return-1!=location.hostname.indexOf("qq.com")&&ptlogin2_onSuccess(),c.instance.onClose()?!0:!1},ptlogin2_onResize=function(a,b){var d=c.instance;return a=parseInt(a),b=parseInt(b),d.onResize(a,b)?(d.resize(q("login_frame_"+d.counter),a,b),d.floatDialog?(b=b+75-(d.showProtocol?0:39),d.floatHandle?d.floatHandle.resize(a+28,b):"",d.resize(q("loginunit"),a+28,b)):(b=b+60-(d.showProtocol?0:39),d.resize(q(d.containerId),a,b),d.resize(q("loginunit2"),a,b)),!0):!1},ptlogin2_onSuccess=function(){var a=location.hostname,b=-1!=a.indexOf("wanggou.com"),d=-1!=a.indexOf("paipai.com");(b||d)&&v({bid:"4",mid:"01",res:["0:1"]});var e=c.instance;return e.onSuccess()?(e.close(),e.syncLogin(),!0):!1},ptlogin2_onFailure=function(a){var b=location.hostname,d=-1!=b.indexOf("wanggou.com"),e=-1!=b.indexOf("paipai.com");(d||e)&&v({bid:"4",mid:"01",res:["0:0"]});var f=c.instance;return f.onFailure(a)?(a&&alert("登录失败！可能的错误原因："+a),c(f),!0):!1},ptlogin2_frame_onLoad=function(){var a=c.instance;if(a.noChangeQQ){var b=q("login_frame_"+a.counter);if(b){var d=b.contentWindow&&b.contentWindow.document.getElementById("u");d&&(d.disabled=!0)}}}},doAction:function(){var a=this.option.action;switch(this.option.type){case"func":a();break;case"top":top.location.href=a;break;case"parent":parent.location.href=a;break;case"self":location.href=a;break;case"blank":window.open(a)}},show:function(a){var b=location.hostname,c=-1!=b.indexOf("qq.com"),e=-1!=b.indexOf("wanggou.com");this.appid||(e?this.appid=677010801:b.indexOf("buy.qq.com")>-1?b.indexOf("seller.buy.qq.com")>-1?this.appid=703010802:this.appid=677010801:this.appid=c?8000210:17000101),this.daid||(this.daid=d.tools.getDaid(b),z("daid",this.daid,525600)),154==this.daid||128==this.daid||127==this.daid?this.title="腾讯网购-请您登录后继续刚才的操作":126==this.daid&&(this.title="腾讯拍拍-请您登录后继续刚才的操作");var g={hide_border:1,style:23,daid:this.daid,pt_safe:1,hide_title_bar:1,hide_close_icon:1,target:"self",no_verifyimg:1,f_url:"loginerroralert",bgcolor:this.floatDialog?"f2faff":"eef5ff",link_target:"blank",uin:this.defaultQQ,appid:this.appid,t:Math.random()};if(this.quickLogin||(g.enable_qlogin=0),c){var h="https://ssl.xui.ptlogin2.qq.com/cgi-bin/xlogin?";g.s_url=b.indexOf("buy.qq.com")>-1?"http://buy.qq.com%2Fredirect.html":/(chong\b|^518\b|^licai\b\.qq\.com)/.test(b)?"http%3A%2F%2Fchong.qq.com%2Fmember%2Flogin_s.shtml":"http://imgcache.qq.com%2Fqqshop%2Fac%2Fportal%2Fredirect.html"}else if(e){var h="https://ssl.xui.ptlogin2.wanggou.com/cgi-bin/xlogin?";g.s_url=encodeURIComponent("http://member.wanggou.com/userlogin/ptlogin?loginfrom=21&daid=154")}else{var h="https://ssl.xui.ptlogin2.paipai.com/cgi-bin/xlogin?";g.s_url=encodeURIComponent("http://member.paipai.com/userlogin/ptlogin?loginfrom=18")}h+=y(g);var i=398,j=370,k=j+35+(this.showProtocol?39:0),l=b.indexOf("buy.qq.com")>-1||e,m='<div class="{class}" id="{class}" style="position:relative;                    height:'+k+"px;                    width:"+i+'px"><h3 id="login_title_{id}" style="padding:0;                    margin:0"><span id="login_close_btn_{id}"{display}>关闭</span><strong>登录</strong><em>{title}</em></h3><iframe src="'+h+'" id="login_frame_{id}" name="login_frame_{id}" scrolling="no" frameborder="0" allowTransparency ="true" onload="ptlogin2_frame_onLoad()"  style="height:'+j+"px;                    width:"+(i-2)+'px"></iframe><div id="login_protocol_{id}" style="text-align:center"><input name="" id="login_protocol_chk_{id}" type="checkbox" value="" checked="checked" /><label for="login_protocol_chk_{id}"> 已阅读并同意<a class="blule" href="'+(l?"http://buy.qq.com/agreement.html":"http://help.paipai.com/user_agreement.shtml")+'" target="_blank">《腾讯电商服务协议》</a></label></div><div id="login_protocol_mask_{id}" onclick="alert(\'请先同意《腾讯电商服务协议》\')" style="position:absolute;                            left:3px;                    top:28px;                    filter:alpha(opacity=1);                    opacity:0.01;                    background-color:#000;                    display:none;                    width:398px;                    height:'+j+'px"></div></div>';m=m.replace(/{id}/g,a.counter).replace(/{class}/g,this.floatDialog?"loginunit":"loginunit2").replace(/{display}/g,this.showClose?"":'style="display:none;                    "').replace(/{title}/g,this.title),this.floatDialog?(this.floatHandle=f({width:i,height:k,cover:this.modalDialog,style:"none",title:this.title,titleId:"login_title_"+a.counter,html:'<div id="login_content_'+a.counter+'">'+m+"</div>",left:this.x,top:this.y,dragble:this.dragable,fix:!this.dragable,showClose:this.showClose,closeId:this.showClose?"login_close_btn_"+a.counter:""}),this.containerId="login_content_"+a.counter):q(this.containerId).innerHTML=m,this.showProtocol?(q("login_protocol_"+a.counter).style.display="",q("login_protocol_chk_"+a.counter).onclick=function(){var b=q("login_protocol_mask_"+a.counter);this.checked?b.style.display="none":b.style.display=""}):q("login_protocol_"+a.counter).style.display="none"},close:function(){this.floatDialog&&this.floatHandle&&this.floatHandle.close()},load:function(a){if(a instanceof Array)for(var b=0,c=a.length;c>b;b++)a[b]&&/^(http|https):\/\//gi.test(a[b])&&w(a[b]);else a&&w(a)},resize:function(a,b,c){c&&(a.style.height=c+"px"),b&&(a.style.width=b+"px")}};return d.init(b)}}(window),b.show=$login,b.addToken=d}),define("common/cookie-debug",[],function(a,b,c){function d(a){var b=new RegExp("(^| )"+a+"(?:=([^;]*))?(;|$)"),c=document.cookie.match(b);return c?c[2]?unescape(c[2]):"":null}function e(a,b,c,d,e,f){var g=new Date,c=arguments[2]||null,d=arguments[3]||"/",e=arguments[4]||null,f=arguments[5]||!1;c?g.setMinutes(g.getMinutes()+parseInt(c)):"",document.cookie=a+"="+escape(b)+(c?";expires="+g.toGMTString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(f?";secure":"")}function f(a,b,c,e){var f=d(a);if(null!=f){var g=new Date;g.setMinutes(g.getMinutes()-1e3),b=b||"/",document.cookie=a+"=;expires="+g.toGMTString()+(b?";path="+b:"")+(c?";domain="+c:"")+(e?";secure":"")}}b.get=d,b.set=e,b.del=f});