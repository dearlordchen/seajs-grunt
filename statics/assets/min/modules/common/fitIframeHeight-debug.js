define("common/fitIframeHeight-debug",[],function(a,b,c){b.fitScrollHeight=function(){setInterval(function(){var a=document.documentElement.scrollHeight||document.body.scrollHeight;window.parent.postMessage({sh:a},"*")},300)},b.fitClientHeight=function(){setInterval(function(){window.parent.postMessage({sh:-1},"*")},300)}});