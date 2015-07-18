/**
 * 微店首页和卖场装修，自适应可见高度
 * @version v20140219
 * @author boatxing
 * @description  
 */
define("common/fitIframeHeight-debug", [], function(require, exports, module) {
    exports.fitScrollHeight = function() {
        setInterval(function() {
            var sh = document.documentElement.scrollHeight || document.body.scrollHeight;
            window.parent.postMessage({
                sh: sh
            }, "*");
        }, 300);
    };
    exports.fitClientHeight = function() {
        setInterval(function() {
            window.parent.postMessage({
                sh: -1
            }, "*");
        }, 300);
    };
});
