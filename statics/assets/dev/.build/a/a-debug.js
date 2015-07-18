define("a/a-debug", [ "jquery/jquery-debug", "common/url-debug" ], function(require, exports, module) {
    var $ = require("jquery/jquery-debug");
    var url = require("common/url-debug");
    //    var C = require("common/common.js");
    //    var Cookie = C.Cookie;
    var LOGIN = {
        init: function() {}
    };
    exports.init = function() {
        alert("xxx");
        alert(url.getUrlParam("fdebug"));
        $("#username,#passwd").keyup(function(e) {
            /*if (this.value != "") {
             $(this).next().addClass("hidden");
             } else {
             $(this).next().removeClass("hidden");
             return false;
             }*/
            _this.showTips(this, "ok", "");
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 13 || key == 10) {
                _this.set();
            }
        });
    };
});
