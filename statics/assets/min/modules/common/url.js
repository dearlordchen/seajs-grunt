define("common/url",[],function(a,b,c){c.exports={setHash:function(a){setTimeout(function(){location.hash=a},0)},getHash:function(a){var b=a||location.hash;return b?b.replace(/.*#/,""):""},getHashModelName:function(){var a=this.getHash();return a?a.split("&")[0].split("=")[0]:[]},getHashActionName:function(){var a=this.getHash();return""==a?"":(a?a.split("&"):[])[0].split("=")[1]},getHashParam:function(a){var b=this.getHash().match(new RegExp("(^|&)"+a+"=([^&]*)(&|$)"));return null!=b?b[2]:""},getUrlParam:function(a,b){var c=arguments[1]||window.location.search,d=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),e=c.substr(c.indexOf("?")+1).match(d);return null!=e?e[2]:""},getParams:function(){var a=[],b=this.getHash();paramArr=b?b.split("&"):[];for(var c=1,d=paramArr.length;d>c;c++)a.push(paramArr[c]);return a},decodeUrl:function(a){a=decodeURIComponent(a);var b=this.parseUrl(a),c=[];$.each(b.params,function(a,b){b=decodeURIComponent(b),c.push(a+"="+b)});var d=a.split("?")[0];return d+"?"+c.join("&")},parseUrl:function(a){var b=document.createElement("a");return b.href=a,{source:a,protocol:b.protocol.replace(":",""),host:b.hostname,port:b.port,query:b.search,params:function(){for(var a,c={},d=b.search.replace(/^\?/,"").split("&"),e=d.length,f=0;e>f;f++)d[f]&&(a=d[f].split("="),c[a[0]]=a[1]);return c}(),file:(b.pathname.match(/([^\/?#]+)$/i)||[,""])[1],hash:b.hash.replace("#",""),path:b.pathname.replace(/^([^\/])/,"/$1"),relative:(b.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],segments:b.pathname.replace(/^\//,"").split("/")}}}});