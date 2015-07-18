/**
 * Created by lordchen on 14-6-19.
 */
define("common/float-debug", [], function(require, exports, module) {
    exports.show = $float;
    function $float(opt) {
        //显示浮窗,支持各种形态
        var option = {
            id: "",
            //string, 唯一id
            left: 0,
            //number
            top: 0,
            //number
            width: 400,
            //number
            height: 0,
            //number
            title: "",
            //string, 标题名称
            html: "",
            //string, 显示的html内容
            leaver: 2,
            //number,浮层等级
            zindex: 255,
            //number, 把zindex作为参数传入
            autoResize: false,
            //boolean, 自动调整高度
            cover: true,
            //boolean, 显示覆盖透明背景
            dragble: false,
            //boolean, title是否可拖动。默认不可拖动
            fix: false,
            //boolean, 是否固定居中随屏幕滚动
            titleId: "",
            //string, title的dom id
            showClose: true,
            //boolean, 显示关闭按钮
            closeId: "",
            //string, 关闭按钮的id, 支持多个id，以逗号分隔。
            bgframeLeft: -2,
            bgframeTop: -2,
            cName: "module_box_normal vt_float",
            //string, div容器的类名称
            style: "stand",
            //string, stand\none\poptip
            contentStyle: "",
            //string, 自定义content的style，默认是class="box_content"，无style
            cssUrl: window.config_float_css || "http://static.paipaiimg.com/module/module_box.css",
            //string, 需要加载的css绝对路径，window.config_float_css为系统配置样式
            onInit: $empty(),
            //显示完成事件
            onClose: $empty()
        };
        for (var i in opt) {
            option[i] = opt[i];
        }
        var that = arguments.callee;
        var _host = window.location.hostname, _isQQ = _host.indexOf("qq.com") != -1, _isBBC = _host.indexOf("buy.qq.com") != -1, _isPP = _host.indexOf("paipai.com") != -1;
        if (_isPP) {
            //拍拍的样式统一为0
            option.bgframeLeft = 0;
            option.bgframeTop = 0;
        }
        //初始化
        that.data ? "" : init(option.cssUrl);
        //获得唯一标记
        option.id = option.id ? option.id : ++that.data.zIndex;
        //关闭浮层的方法
        option.close = closeFloat;
        //销毁浮层的方法
        option.destruct = destructFloat;
        //关闭同等级或者低等级的浮层
        option.closeOther = closeOther;
        //保持浮层随屏幕滚动
        option.keepBoxFix = keepBoxFix;
        //调整浮层大小
        option.resize = resize;
        //显示浮层内容
        option.show = showBox;
        //窗口定位
        option.setPos = setPos;
        //执行操作
        option.closeOther();
        //显示浮层内容
        option.show();
        that.data.list.push(option);
        //如果标题title可拖动那么执行拖动操作
        if (option.dragble) {
            $initDragItem({
                barDom: option.boxTitleHandle,
                targetDom: option.boxHandle
            });
        }
        return option;
        //关闭浮层的方法
        function closeFloat() {
            if (!option.onClose(option)) {
                return;
            }
            //关闭兄弟和子浮层
            option.closeOther();
            option.destruct();
        }
        //销毁浮层的方法
        function destructFloat() {
            var _this = this;
            //关闭低级浮层
            _this.cover ? that.data.closeCover() : "";
            if (_this.sizeTimer) {
                clearInterval(_this.sizeTimer);
            }
            if (_this.fixTimer) {
                clearInterval(_this.fixTimer);
            }
            _this.boxHandle ? document.body.removeChild(_this.boxHandle) : "";
            _this.boxHandel = _this.boxHandle = null;
            for (var i = 0, l = that.data.list.length; i < l; i++) {
                if (!that.data.list[i]) {
                    continue;
                }
                if (_this.id == that.data.list[i].id) {
                    that.data.list[i] = null;
                }
            }
            if (_this.closeId) {
                var arrClose = _this.closeId.split(",");
                for (var l = arrClose.length; l--; ) {
                    var _el = $id(arrClose[l]);
                    if (_el) {
                        _el.onclick = null;
                        _el = null;
                    }
                }
            }
        }
        //关闭同等级或者低等级的浮层
        function closeOther() {
            for (var i = 0, l = that.data.list.length; i < l; i++) {
                if (!that.data.list[i]) {
                    continue;
                }
                if (that.data.list[i].leaver >= this.leaver && this.id != that.data.list[i].id) {
                    that.data.list[i].destruct();
                }
            }
        }
        //显示浮层内容
        function showBox() {
            this.cover ? that.data.showCover() : "";
            var c = document.createElement("div"), content = "", _style = option.contentStyle ? ' style="' + option.contentStyle + '" ' : "";
            c.id = this.boxId = "float_box_" + this.id;
            c.style.position = "absolute";
            //根据样式输出不同模板，有标题和关闭按钮的
            if ($isBrowser("ie6")) {
                content = '<iframe frameBorder="0" style="position:absolute;left:' + option.bgframeLeft + "px;top:" + option.bgframeTop + 'px;z-index:-1;border:none;" id="float_iframe_' + this.id + '"></iframe>';
            }
            switch (option.style + "") {
              case "stand":
                c.className = option.cName;
                c.innerHTML = content + '<div class="box_title" id="float_title_' + this.id + '"><a href="javascript:;" style="display:' + (this.showClose ? "" : "none") + ';"  class="bt_close" id="float_closer_' + this.id + '">×</a><h4>' + this.title + '</h4></div><div class="box_content" ' + _style + ">" + this.html + "</div>";
                break;

              case "":
                //根据样式输出不同模板,无任何样式的时候输出一个空的div
                c.className = option.cName;
                c.innerHTML = content + '<div class="box_content" ' + _style + ' id="float_title_' + this.id + '">' + this.html + "</div>";
                break;

              case "none":
                //完全空白，不含样式的模板
                c.className = "";
                c.innerHTML = content + '<div class="box_content" ' + _style + ' id="float_title_' + this.id + '">' + this.html + "</div>";
                break;

              case "new":
                c.className = option.cName;
                c.innerHTML = content + '<div class="layer_inner"><div class="layer_hd" ' + _style + ' id="float_title_' + this.id + '"><div class="layer_hd_title">' + this.title + '</div><a href="javascript:void(0);" class="layer_hd_close" id="float_closer_' + this.id + '">close</a> </div> <div class="layer_bd">' + this.html + "</div></div></div>";
                break;
            }
            document.body.appendChild(c);
            c = null;
            this.boxHandel = this.boxHandle = $id("float_box_" + this.id);
            if ($isBrowser("ie6")) {
                this.boxIframeHandle = $id("float_iframe_" + this.id);
            }
            this.boxTitleHandle = $id(option.titleId || "float_title_" + this.id);
            this.boxCloseHandle = $id("float_closer_" + this.id);
            this.height ? this.boxHandle.style.height = option.height == "auto" ? option.height : option.height + "px" : "";
            this.width ? this.boxHandle.style.width = option.width == "auto" ? option.width : option.width + "px" : "";
            this.boxHandle.style.zIndex = that.data.zIndex;
            //窗口可见宽度
            this.sw = parseInt(this.boxHandle.offsetWidth);
            //窗口可见高度
            this.sh = parseInt(this.boxHandle.offsetHeight);
            //窗口定位
            this.setPos();
            var _this = this;
            //绑定关闭按钮的事件
            _this.boxCloseHandle ? _this.boxCloseHandle.onclick = function() {
                _this.close();
                return false;
            } : "";
            //绑定关闭按钮的事件
            if (_this.closeId) {
                var arrClose = _this.closeId.split(",");
                for (var l = arrClose.length; l--; ) {
                    var _el = $id(arrClose[l]);
                    if (_el) {
                        _el.onclick = function() {
                            _this.close();
                            return false;
                        };
                        _el = null;
                    }
                }
            }
            //保持浮层随屏幕滚动
            _this.keepBoxFix();
            if (!_this.onInit(option)) {
                return;
            }
        }
        function setPos(left, top) {
            //窗口定位，如果没有指定坐标则居中
            var psw = $getPageScrollWidth(), ww = $getWindowWidth(), psh = $getPageScrollHeight(), wh = $getWindowHeight();
            var p = [ 0, 0 ];
            left && (this.left = left);
            top && (this.top = top);
            p[0] = parseInt(this.left ? this.left : psw + (ww - this.sw) / 2);
            p[1] = parseInt(this.top ? this.top : psh + (wh - this.sh) / 2);
            //如果超出屏幕则自动移入
            //超出右侧
            p[0] + this.sw > psw + ww ? p[0] = psw + ww - this.sw - 10 : "";
            //超出底部
            p[1] + this.sh > psh + wh ? p[1] = psh + wh - this.sh - 10 : "";
            //超出顶部
            p[1] < psh ? p[1] = psh : "";
            //超出左侧
            p[0] < psw ? p[0] = psw : "";
            if ($isBrowser("ie6")) {
                //调整iframe的高度与浮窗一样大小
                this.boxIframeHandle.height = this.sh - 2 + "px";
                //兼容border的存在
                this.boxIframeHandle.width = this.sw - 2 + "px";
            }
            //显示iframe坐标
            this.boxHandle.style.left = p[0] + "px";
            this.boxHandle.style.top = p[1] + "px";
            //保持浮层随屏幕滚动
            this.keepBoxFix();
        }
        //调整浮层大小
        function resize(w, h) {
            if (w && w.constructor === Number) {
                this.sw = w;
                //窗口可见宽度
                this.boxHandle.style.width = this.sw + "px";
                if ($isBrowser("ie6")) {
                    this.boxIframeHandle.width = this.sw - 2 + "px";
                }
            }
            if (h && h.constructor === Number) {
                this.sh = h;
                //窗口可见高度
                this.boxHandle.style.height = this.sh + "px";
                if ($isBrowser("ie6")) {
                    this.boxIframeHandle.height = this.sh - 2 + "px";
                }
            }
            //重定位
            this.setPos();
        }
        //保持浮层随屏幕滚动
        function keepBoxFix() {
            if (this.fix) {
                var _this = this;
                if ($isBrowser("ie6")) {
                    !_this.fixTimer && (_this.fixTimer = setInterval(function() {
                        _this.boxHandle.style.left = (_this.left ? _this.left : $getPageScrollWidth() + ($getWindowWidth() - _this.sw) / 2) + "px";
                        _this.boxHandle.style.top = (_this.top ? _this.top : $getPageScrollHeight() + ($getWindowHeight() - _this.sh) / 2) + "px";
                    }, 30));
                } else {
                    _this.boxHandle.style.position = "fixed";
                    _this.boxHandle.style.left = (_this.left ? _this.left : ($getWindowWidth() - _this.sw) / 2) + "px";
                    _this.boxHandle.style.top = (_this.top ? _this.top : ($getWindowHeight() - _this.sh) / 2) + "px";
                }
            }
        }
        //当内容的发生变化时自动调整窗口高度
        function autoResize() {
            if (this.autoResize) {
                var _this = this;
                _this.sizeTimer = setInterval(function() {
                    //窗口可见宽度
                    _this.sw = _this.boxHandle.offsetWidth;
                    //窗口可见高度
                    _this.sh = _this.boxHandle.offsetHeight;
                    //调整iframe的高度与浮窗一样大小
                    if ($isBrowser("ie6")) {
                        _this.boxIframeHandle.height = _this.sh - 2 + "px";
                        _this.boxIframeHandle.width = _this.sw - 2 + "px";
                    }
                }, 50);
            }
        }
        //初始化全局浮层cache
        function init(cssUrl) {
            //加载css,如果cssUrl为空则不异步加载样式
            if (cssUrl) {
                $loadCss(cssUrl);
            }
            that.data = {};
            //起始层号从255开始
            that.data.zIndex = option.zindex;
            //浮层库列表
            that.data.list = [];
            //增加一个覆盖的半透明浮层
            createCover();
            that.data.showCover = showCover;
            that.data.closeCover = closeCover;
            //创建浮层对象
            function createCover() {
                var c = document.createElement("div");
                c.id = "float_cover";
                c.style.display = "none";
                c.style.width = "0px";
                c.style.height = "0px";
                c.style.backgroundColor = "#cccccc";
                c.style.zIndex = 250;
                c.style.position = "fixed";
                c.style.hasLayout = -1;
                c.style.left = "0px";
                c.style.top = "0px";
                c.style.filter = "alpha(opacity=50);";
                c.style.opacity = "0.5";
                document.body.appendChild(c);
                if ($isBrowser("ie6")) {
                    c.innerHTML = '<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;border:none;" id="float_cover_iframe"></iframe>';
                    c.style.position = "absolute";
                }
                that.data.cover = $id("float_cover");
                that.data.coverIframe = $id("float_cover_iframe");
                that.data.coverIsShow = false;
                that.data.coverSize = [ 0, 0 ];
                c = null;
            }
            //显示灰色浮层背景对象
            function showCover() {
                that.data.cover.style.display = "block";
                that.data.coverIsShow = true;
                keepCoverShow();
                that.data.coverTimer = setInterval(function() {
                    keepCoverShow();
                }, 50);
                //保持浮层的全屏幕覆盖尺寸
                function keepCoverShow() {
                    var _d = that.data;
                    if (_d.coverIsShow) {
                        var ch = $getContentHeight(), wh = $getWindowHeight(), cw = $getContentWidth(), ww = $getWindowWidth(), ns = [ wh, ww ];
                        if ($isBrowser("ie6")) {
                            _d.cover.style.top = $getPageScrollHeight() + "px";
                        }
                        if (ns.toString() != that.data.coverSize.toString()) {
                            _d.coverSize = ns;
                            _d.cover.style.height = ns[0].toFixed(0) + "px";
                            _d.cover.style.width = ns[1].toFixed(0) + "px";
                            if (_d.coverIframe) {
                                _d.coverIframe.style.height = ns[0].toFixed(0) + "px";
                                _d.coverIframe.style.width = ns[1].toFixed(0) + "px";
                            }
                        }
                    }
                }
            }
            //关闭灰色浮层背景对象
            function closeCover() {
                that.data.cover.style.display = "none";
                that.data.coverIsShow = false;
                clearInterval(that.data.coverTimer);
            }
        }
    }
    function $empty() {
        //返回全局空函数，不做任何事情，返回true；
        return function() {
            return true;
        };
    }
    function $getContentHeight() {
        //获取页面内容的实际高度
        var bodyCath = document.body;
        var doeCath = document.compatMode == "BackCompat" ? bodyCath : document.documentElement;
        return window.MessageEvent && navigator.userAgent.toLowerCase().indexOf("firefox") == -1 ? bodyCath.scrollHeight : doeCath.scrollHeight;
    }
    function $getContentWidth() {
        //获取页面内容的实际宽度
        var bodyCath = document.body;
        var doeCath = document.compatMode == "BackCompat" ? bodyCath : document.documentElement;
        return window.MessageEvent && navigator.userAgent.toLowerCase().indexOf("firefox") == -1 ? bodyCath.scrollWidth : doeCath.scrollWidth;
    }
    function $getMousePosition(e) {
        //获取鼠标的位置
        var e = window.event ? window.event : e;
        // 兼容老的用法，避免重新生成时出错。
        if (e.evt) e = e.evt;
        var pos = [];
        if (typeof e.pageX != "undefined") {
            pos = [ e.pageX, e.pageY ];
        } else if (typeof e.clientX != "undefined") {
            pos = [ e.clientX + $getScrollPosition()[0], e.clientY + $getScrollPosition()[1] ];
        }
        return pos;
    }
    function $getPageScrollHeight() {
        var bodyCath = document.body;
        var doeCath = document.compatMode == "BackCompat" ? bodyCath : document.documentElement;
        var ua = navigator.userAgent.toLowerCase();
        return window.MessageEvent && ua.indexOf("firefox") == -1 && ua.indexOf("opera") == -1 && ua.indexOf("msie") == -1 ? bodyCath.scrollTop : doeCath.scrollTop;
    }
    function $getPageScrollWidth() {
        var bodyCath = document.body;
        var doeCath = document.compatMode == "BackCompat" ? bodyCath : document.documentElement;
        return window.MessageEvent && navigator.userAgent.toLowerCase().indexOf("firefox") == -1 ? bodyCath.scrollLeft : doeCath.scrollLeft;
    }
    function $getScrollPosition() {
        //获取滚动条的位置
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
        return [ scrollLeft ? scrollLeft : 0, scrollTop ? scrollTop : 0 ];
    }
    function $getWindowHeight() {
        var bodyCath = document.body;
        return (document.compatMode == "BackCompat" ? bodyCath : document.documentElement).clientHeight;
    }
    function $getWindowWidth() {
        var bodyCath = document.body;
        return (document.compatMode == "BackCompat" ? bodyCath : document.documentElement).clientWidth;
    }
    function $id(id) {
        return typeof id == "string" ? document.getElementById(id) : id;
    }
    function $initDragItem(opt) {
        //控制组件拖动方法
        var option = {
            barDom: "",
            //拖动区域的dom对象
            targetDom: ""
        };
        for (var i in opt) {
            option[i] = opt[i];
        }
        var that = arguments.callee;
        that.option ? "" : that.option = {};
        //设置状态
        option.barDom.style.cursor = "move";
        option.targetDom.style.position = "absolute";
        option.barDom.onmousedown = function(e) {
            var e = window.event || e;
            that.option.barDom = this;
            that.option.targetDom = option.targetDom;
            var currPostion = [ parseInt(option.targetDom.style.left) ? parseInt(option.targetDom.style.left) : 0, parseInt(option.targetDom.style.top) ? parseInt(option.targetDom.style.top) : 0 ];
            that.option.diffPostion = [ $getMousePosition({
                evt: e
            })[0] - currPostion[0], $getMousePosition({
                evt: e
            })[1] - currPostion[1] ];
            document.onselectstart = function() {
                return false;
            };
            window.onblur = window.onfocus = function() {
                document.onmouseup();
            };
            return false;
        };
        option.targetDom.onmouseup = document.onmouseup = function() {
            if (that.option.barDom) {
                that.option = {};
                document.onselectstart = window.onblur = window.onfocus = null;
            }
        };
        option.targetDom.onmousemove = document.onmousemove = function(e) {
            try {
                var e = window.event || e;
                if (that.option.barDom && that.option.targetDom) {
                    that.option.targetDom.style.left = $getMousePosition({
                        evt: e
                    })[0] - that.option.diffPostion[0] + "px";
                    that.option.targetDom.style.top = $getMousePosition({
                        evt: e
                    })[1] - that.option.diffPostion[1] + "px";
                }
            } catch (e) {}
        };
    }
    function $isBrowser(str) {
        str = str.toLowerCase();
        var b = navigator.userAgent.toLowerCase();
        var arrB = [];
        arrB["firefox"] = b.indexOf("firefox") != -1;
        arrB["opera"] = b.indexOf("opera") != -1;
        arrB["safari"] = b.indexOf("safari") != -1;
        arrB["chrome"] = b.indexOf("chrome") != -1;
        arrB["gecko"] = !arrB["opera"] && !arrB["safari"] && b.indexOf("gecko") > -1;
        arrB["ie"] = !arrB["opera"] && b.indexOf("msie") != -1;
        arrB["ie6"] = !arrB["opera"] && b.indexOf("msie 6") != -1;
        arrB["ie7"] = !arrB["opera"] && b.indexOf("msie 7") != -1;
        arrB["ie8"] = !arrB["opera"] && b.indexOf("msie 8") != -1;
        arrB["ie9"] = !arrB["opera"] && b.indexOf("msie 9") != -1;
        arrB["ie10"] = !arrB["opera"] && b.indexOf("msie 10") != -1;
        return arrB[str];
    }
    function $loadCss(path, callback) {
        if (!path) {
            return;
        }
        var l;
        if (!window["_loadCss"] || window["_loadCss"].indexOf(path) < 0) {
            l = document.createElement("link");
            l.setAttribute("type", "text/css");
            l.setAttribute("rel", "stylesheet");
            l.setAttribute("href", path);
            l.setAttribute("id", "loadCss" + Math.random());
            document.getElementsByTagName("head")[0].appendChild(l);
            window["_loadCss"] ? window["_loadCss"] += "|" + path : window["_loadCss"] = "|" + path;
        }
        l && typeof callback == "function" && (l.onload = callback);
        return true;
    }
});
