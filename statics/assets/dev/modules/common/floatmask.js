/**
 * 浮层遮罩
 * author boatxing
 * desc
 **/
define(function(require, exports, module){
    var $ = require("jquery/jquery");

    var _mask = null;
    var _index = 0;
    var _zIndex = [];

    /**
     * 创建浮层遮罩对象
     */
    exports.mask = function(opt){
        _mask = createMask(opt)
    }

    exports.show = function(){
        show();
    }

    exports.hide = function(){
        hide();
    }

    //显示
    function show(){
        var c = _mask;
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
        _index --;
        var c = _mask;
        if(_index > 0){
            c.style.zIndex = _zIndex[_index];
            return true;
        }
        c.style.display = "none";
        if(c.t){
            c.t=clearInterval(c.t);
        }
    }

    //保持浮层的全屏幕覆盖尺寸
    function keepMaskShow(c) {
        var ch = $( window ).height(), wh = $( document ).height(), cw = $( window ).width(), ww = $( document ).width(), ns = [wh, ww];

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
        opt = opt || {
            backgroundColor: "",
            zIndex: "",
            opacity: ""
        };
        _index ++;
        _zIndex[_index] = opt.zIndex || 200;
        if (_mask) {
            opt.backgroundColor && (_mask.style.backgroundColor = opt.backgroundColor);
            opt.zIndex != "" && (_mask.style.zIndex = opt.zIndex);
            if (opt.opacity != "") {
                _mask.style.filter = "alpha(opacity=" + opt.opacity * 100 || 50 + ");";
                _mask.style.opacity = opt.opacity || "0.5";
            }
            return _mask;
        }
        var c = document.createElement("div");
        c.style.display = "none";
        c.style.width = "0px";
        c.style.height = "0px";
        c.style.backgroundColor = opt.backgroundColor || "#cccccc";
        c.style.zIndex = opt.zIndex || 200;
        c.style.position = "fixed";
        c.style.hasLayout = -1;
        c.style.left = "0px";
        c.style.top = "0px";
        c.style.filter = "alpha(opacity=" + opt.opacity * 100 || 50 + ");";
        c.style.opacity = opt.opacity || "0.5";
        document.body.appendChild(c);

        c.s = [0, 0];
        return c;
    }
});