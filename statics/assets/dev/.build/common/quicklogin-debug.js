/**
 * 店铺登录
 * @version v20140508
 * @author boatxing
 * @description  跳转到登录界面
 */
define("common/quicklogin-debug", [ "common/cookie-debug" ], function(require, exports, module) {
    var _cookie = require("common/cookie-debug");
    //登录态失效，通知父窗口，跳转到登录页面
    exports.login = function() {
        /*if(window.parent == window){
            location.href = "/weidian/portal.shtml";
            return true;
        }
        window.parent.postMessage({login: 1}, "*");*/
        return;
    };
    //判断是否登录
    exports.isLogin = function() {
        return _cookie.get("wg_skey") && _cookie.get("wg_uin") || _cookie.get("skey") && _cookie.get("uin") ? true : false;
    };
    //获取登录QQ号
    exports.getUin = function() {
        //返回当前登陆用户的QQ号码 ,没有则返回""
        var uin = _cookie.get("wg_uin") || _cookie.get("uin") || _cookie.get("uin_cookie") || _cookie.get("pt2gguin") || _cookie.get("o_cookie") || _cookie.get("luin") || _cookie.get("buy_uin");
        return uin ? parseInt(uin.replace("o", ""), 10) : "";
    };
    //兼容wei.paipai.com
    function $addToken(url, type, skey) {
        var token = $getToken(skey);
        if (url == "" || (url.indexOf("://") < 0 ? location.href : url).indexOf("http") != 0) {
            return url;
        }
        if (url.indexOf("#") != -1) {
            var f1 = url.match(/\?.+\#/);
            if (f1) {
                var t = f1[0].split("#"), newPara = [ t[0], "&g_tk=", token, "&g_ty=", type, "#", t[1] ].join("");
                return url.replace(f1[0], newPara);
            } else {
                var t = url.split("#");
                return [ t[0], "?g_tk=", token, "&g_ty=", type, "#", t[1] ].join("");
            }
        }
        return token == "" ? url + (url.indexOf("?") != -1 ? "&" : "?") + "g_ty=" + type : url + (url.indexOf("?") != -1 ? "&" : "?") + "g_tk=" + token + "&g_ty=" + type;
    }
    function $empty() {
        return function() {
            return true;
        };
    }
    function $float(opt) {
        var option = {
            id: "",
            left: 0,
            top: 0,
            width: 400,
            height: 0,
            title: "",
            html: "",
            leaver: 2,
            zindex: 255,
            autoResize: false,
            opacity: .5,
            cover: true,
            isCoverClose: false,
            dragble: false,
            fix: false,
            titleId: "",
            showClose: true,
            closeId: "",
            bgframeLeft: -2,
            bgframeTop: -2,
            cName: "module_box_normal vt_float",
            style: "stand",
            contentStyle: "",
            needOutCss: 1,
            cssUrl: window.config_float_css || "http://static.paipaiimg.com/module/module_box.css",
            onInit: $empty(),
            onClose: $empty()
        };
        for (var i in opt) {
            option[i] = opt[i];
        }
        var that = arguments.callee;
        var _host = window.location.hostname, _isQQ = _host.indexOf("qq.com") != -1, _isBBC = _host.indexOf("buy.qq.com") != -1, _isPP = _host.indexOf("paipai.com") != -1;
        if (_isPP) {
            option.bgframeLeft = 0;
            option.bgframeTop = 0;
        }
        that.data ? "" : init(option.cssUrl, option.needOutCss);
        option.id = option.id ? option.id : ++that.data.zIndex;
        option.close = closeFloat;
        option.destruct = destructFloat;
        option.closeOther = closeOther;
        option.keepBoxFix = keepBoxFix;
        option.resize = resize;
        option.show = showBox;
        option.setPos = setPos;
        option.closeOther();
        option.show();
        that.data.list.push(option);
        if (option.dragble) {
            $initDragItem({
                barDom: option.boxTitleHandle,
                targetDom: option.boxHandle
            });
        }
        return option;
        function closeFloat() {
            if (!option.onClose(option)) {
                return;
            }
            option.closeOther();
            option.destruct();
        }
        function destructFloat() {
            var _this = this;
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
        function showBox() {
            this.cover ? that.data.showCover() : "";
            var c = document.createElement("div"), content = "", _style = option.contentStyle ? ' style="' + option.contentStyle + '" ' : "";
            c.id = this.boxId = "float_box_" + this.id;
            c.style.position = "absolute";
            if ($isBrowser("ie6")) {
                content = '<iframe frameBorder="0" style="position:absolute;left:' + option.bgframeLeft + "px;top:" + option.bgframeTop + 'px;z-index:-1;border:none;" id="float_iframe_' + this.id + '"></iframe>';
            }
            switch (option.style + "") {
              case "stand":
                c.className = option.cName;
                c.innerHTML = content + '<div class="box_title" id="float_title_' + this.id + '"><a href="javascript:;" style="display:' + (this.showClose ? "" : "none") + ';"  class="bt_close" id="float_closer_' + this.id + '">×</a><h4>' + this.title + '</h4></div><div class="box_content" ' + _style + ">" + this.html + "</div>";
                break;

              case "":
                c.className = option.cName;
                c.innerHTML = content + '<div class="box_content" ' + _style + ' id="float_title_' + this.id + '">' + this.html + "</div>";
                break;

              case "none":
                c.className = "";
                c.innerHTML = content + '<div class="box_content" ' + _style + ' id="float_title_' + this.id + '">' + this.html + "</div>";
                break;

              case "new":
                c.className = option.cName;
                c.innerHTML = content + '<div class="layer_inner"><div class="layer_hd" ' + _style + ' id="float_title_' + this.id + '"><div class="layer_hd_title">' + this.title + '</div><a href="javascript:void(0);" class="layer_hd_close" id="float_closer_' + this.id + '">close</a></div><div class="layer_bd">' + this.html + "</div></div></div>";
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
            this.isCoverClose ? this.closeId += ",float_cover" : "";
            this.height ? this.boxHandle.style.height = option.height == "auto" ? option.height : option.height + "px" : "";
            this.width ? this.boxHandle.style.width = option.width == "auto" ? option.width : option.width + "px" : "";
            this.boxHandle.style.zIndex = that.data.zIndex;
            this.sw = parseInt(this.boxHandle.offsetWidth);
            this.sh = parseInt(this.boxHandle.offsetHeight);
            this.setPos();
            var _this = this;
            _this.boxCloseHandle ? _this.boxCloseHandle.onclick = function() {
                _this.close();
                return false;
            } : "";
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
            _this.keepBoxFix();
            if (!_this.onInit(option)) {
                return;
            }
        }
        function setPos(left, top) {
            var psw = $getPageScrollWidth(), ww = $getWindowWidth(), psh = $getPageScrollHeight(), wh = $getWindowHeight();
            var p = [ 0, 0 ];
            left && (this.left = left);
            top && (this.top = top);
            p[0] = parseInt(this.left ? this.left : psw + (ww - this.sw) / 2);
            p[1] = parseInt(this.top ? this.top : psh + (wh - this.sh) / 2);
            p[0] + this.sw > psw + ww ? p[0] = psw + ww - this.sw - 10 : "";
            p[1] + this.sh > psh + wh ? p[1] = psh + wh - this.sh - 10 : "";
            p[1] < psh ? p[1] = psh : "";
            p[0] < psw ? p[0] = psw : "";
            if ($isBrowser("ie6")) {
                this.boxIframeHandle.height = this.sh - 2 + "px";
                this.boxIframeHandle.width = this.sw - 2 + "px";
            }
            this.boxHandle.style.left = p[0] + "px";
            this.boxHandle.style.top = p[1] + "px";
            this.keepBoxFix();
        }
        function resize(w, h) {
            if (w && w.constructor === Number) {
                this.sw = w;
                this.boxHandle.style.width = this.sw + "px";
                if ($isBrowser("ie6")) {
                    this.boxIframeHandle.width = this.sw - 2 + "px";
                }
            }
            if (h && h.constructor === Number) {
                this.sh = h;
                this.boxHandle.style.height = this.sh + "px";
                if ($isBrowser("ie6")) {
                    this.boxIframeHandle.height = this.sh - 2 + "px";
                }
            }
            this.setPos();
        }
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
        function autoResize() {
            if (this.autoResize) {
                var _this = this;
                _this.sizeTimer = setInterval(function() {
                    _this.sw = _this.boxHandle.offsetWidth;
                    _this.sh = _this.boxHandle.offsetHeight;
                    if ($isBrowser("ie6")) {
                        _this.boxIframeHandle.height = _this.sh - 2 + "px";
                        _this.boxIframeHandle.width = _this.sw - 2 + "px";
                    }
                }, 50);
            }
        }
        function init(cssUrl, needOutCss) {
            if (cssUrl && needOutCss) {
                $loadCss(cssUrl);
            }
            that.data = {};
            that.data.zIndex = option.zindex;
            that.data.list = [];
            createCover();
            that.data.showCover = showCover;
            that.data.closeCover = closeCover;
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
                c.style.filter = "alpha(opacity=" + option.opacity * 100 + ");";
                c.style.opacity = option.opacity;
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
            function showCover() {
                that.data.cover.style.display = "block";
                that.data.coverIsShow = true;
                keepCoverShow();
                that.data.coverTimer = setInterval(function() {
                    keepCoverShow();
                }, 50);
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
            function closeCover() {
                that.data.cover.style.display = "none";
                that.data.coverIsShow = false;
                clearInterval(that.data.coverTimer);
            }
        }
    }
    function $getContentHeight() {
        var bodyCath = document.body;
        var doeCath = document.compatMode == "BackCompat" ? bodyCath : document.documentElement;
        return window.MessageEvent && navigator.userAgent.toLowerCase().indexOf("firefox") == -1 ? bodyCath.scrollHeight : doeCath.scrollHeight;
    }
    function $getContentWidth() {
        var bodyCath = document.body;
        var doeCath = document.compatMode == "BackCompat" ? bodyCath : document.documentElement;
        return window.MessageEvent && navigator.userAgent.toLowerCase().indexOf("firefox") == -1 ? bodyCath.scrollWidth : doeCath.scrollWidth;
    }
    function $getCookie(name) {
        var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"), val = document.cookie.match(reg);
        return val ? val[2] ? unescape(val[2]) : "" : null;
    }
    function $getMousePosition(e) {
        var e = window.event ? window.event : e;
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
        var _docElement = document.documentElement, _body = document.body, scrollLeft = _docElement && _docElement.scrollLeft || _body && _body.scrollLeft || window.pageXOffset || 0, scrollTop = _docElement && _docElement.scrollTop || _body && _body.scrollTop || window.pageYOffset || 0;
        return [ scrollLeft, scrollTop ];
    }
    function $getToken(skey) {
        var skey = skey ? skey : $getCookie("skey");
        return skey ? $time33(skey) : "";
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
        var option = {
            barDom: "",
            targetDom: ""
        };
        for (var i in opt) {
            option[i] = opt[i];
        }
        var that = arguments.callee;
        that.option ? "" : that.option = {};
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
    function $isDocReady() {
        if (navigator.userAgent.match(/MSIE/)) {
            try {
                document.documentElement.doScroll("left");
                return true;
            } catch (e) {}
            return false;
        } else {
            return document.body ? true : false;
        }
    }
    function $isLogin() {
        return $getCookie("p_skey") && $getCookie("p_uin") || $getCookie("skey") && $getCookie("uin") ? true : false;
    }
    function $itilReport(option) {
        var opt = {
            bid: "1",
            mid: "01",
            res: [],
            onBeforeReport: null,
            delay: 5e3
        };
        for (var k in option) {
            opt[k] = option[k];
        }
        if (opt.res.length > 0) {
            window.reportWebInfo = function(json) {};
            window.setTimeout(function() {
                opt.onBeforeReport && opt.onBeforeReport(opt);
                var pstr = opt.bid + opt.mid + "-" + opt.res.join("|");
                var url = "http://focus.paipai.com/webreport/ReportWebInfo?report=" + pstr + "&t=" + new Date() / 1e3;
                $loadUrl({
                    url: url
                });
            }, opt.delay);
        }
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
    function $loadUrl(o) {
        o.element = o.element || "script";
        var el = document.createElement(o.element);
        el.charset = o.charset || "utf-8";
        o.onBeforeSend && o.onBeforeSend(el);
        el.onload = el.onreadystatechange = function() {
            if (/loaded|complete/i.test(this.readyState) || navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
                o.onLoad && o.onLoad();
                clear();
            }
        };
        el.onerror = function() {
            clear();
        };
        el.src = o.url;
        document.getElementsByTagName("head")[0].appendChild(el);
        function clear() {
            if (!el) {
                return;
            }
            el.onload = el.onreadystatechange = el.onerror = null;
            el.parentNode && el.parentNode.removeChild(el);
            el = null;
        }
    }
    (function() {
        var counter = 1;
        $login = function(opts) {
            var that = arguments.callee;
            var login = {
                option: {
                    version: 201309251107,
                    title: "腾讯电商-请您登录后继续刚才的操作",
                    containerId: "",
                    floatDialog: true,
                    modalDialog: true,
                    dragable: true,
                    showClose: true,
                    quickLogin: true,
                    checkLogin: true,
                    checkReady: true,
                    showProtocol: false,
                    site: "paipai",
                    noChangeQQ: false,
                    defaultQQ: "",
                    type: "self",
                    action: "",
                    x: 0,
                    y: 0,
                    domain: "",
                    skin: "http://static.paipaiimg.com/module/module_box.css",
                    appid: "",
                    onLogin: $empty(),
                    onReset: $empty(),
                    onClose: $empty(),
                    onResize: $empty(),
                    onSuccess: $empty(),
                    onFailure: $empty()
                },
                v: function() {
                    return this.option.version;
                },
                init: function(opts) {
                    var option = this.option;
                    for (var i in opts) {
                        option[i] = opts[i];
                    }
                    if (option.checkReady && !$isDocReady()) {
                        return;
                    }
                    var hn = location.hostname, topDomain = hn.split(".");
                    if (topDomain.length > 1) {
                        topDomain = topDomain[topDomain.length - 2] + "." + topDomain[topDomain.length - 1];
                        try {
                            document.domain = option.domain || topDomain;
                        } catch (e) {}
                    }
                    option.show = this.show;
                    option.close = this.close;
                    option.resize = this.resize;
                    option.doAction = this.doAction;
                    option.syncLogin = this.syncLogin;
                    option.counter = counter++;
                    if (hn.indexOf("paipai.com") != -1) {
                        $setCookie("returnurl", "", -1, "/", "paipai.com");
                        $setCookie("referurl", "", -1, "/", "paipai.com");
                    }
                    if (option.checkLogin && $isLogin()) {
                        this.doAction();
                        return;
                    }
                    this.registerLoginEvent();
                    this.load(option.skin);
                    option.show(option);
                    that.instance = option;
                    return option;
                },
                syncLogin: function() {
                    var hn = location.hostname, isQQ = hn.indexOf("qq.com") != -1, isWG = hn.indexOf("wanggou.com") != -1, isDone = false;
                    var url, url2, url3, url4, url5;
                    if (isQQ) {
                        url = "http://ptlogin2.qq.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.paipai.com/cgi-bin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20");
                        url2 = "http://ptlogin2.qq.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.wanggou.com/userlogin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=20&daid=154");
                        url3 = "http://ptlogin2.qq.com/ho_cross_domain?tourl=" + encodeURIComponent("http://ecclogin.yixun.com/login/synclogin");
                        url4 = "http://ptlogin2.qq.com/pt4_web_jump?succ_url=" + encodeURIComponent("http://chong.qq.com") + "&daid=129&appid=677010801&pt4_token=" + $getCookie("p_skey");
                        url5 = "http://ptlogin2.qq.com/pt4_web_jump?succ_url=" + encodeURIComponent("http://sudi.qq.com") + "&daid=189&appid=677010801&pt4_token=" + $getCookie("p_skey");
                    } else if (isWG) {
                        url = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.paipai.com/cgi-bin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=21");
                        url2 = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://user.buy.qq.com/cgi-bin/ping/visitkey");
                        url3 = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://ecclogin.yixun.com/login/synclogin");
                        url4 = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://chong.qq.com");
                        url5 = "http://ptlogin2.wanggou.com/ho_cross_domain?tourl=" + encodeURIComponent("http://sudi.qq.com");
                    } else {
                        url = "http://ptlogin2.paipai.com/ho_cross_domain?tourl=" + encodeURIComponent("http://user.buy.qq.com/cgi-bin/ping/visitkey");
                        url2 = "http://ptlogin2.paipai.com/ho_cross_domain?tourl=" + encodeURIComponent("http://member.wanggou.com/userlogin/ptlogin?returnurl=http://auction.paipai.com/null.shtml&loginfrom=18&daid=154");
                        url3 = "http://ptlogin2.paipai.com/ho_cross_domain?tourl=" + encodeURIComponent("http://ecclogin.yixun.com/login/synclogin");
                        url4 = "http://ptlogin2.paipai.com/ho_cross_domain?tourl=" + encodeURIComponent("http://chong.qq.com");
                        url5 = "http://ptlogin2.paipai.com/ho_cross_domain?tourl=" + encodeURIComponent("http://sudi.qq.com");
                    }
                    var doAction = function() {
                        if (!isDone) {
                            isDone = true;
                            login.doAction();
                        }
                        if (timer) {
                            clearTimeout(timer);
                            timer = null;
                        }
                    };
                    var timer = setTimeout(function() {
                        doAction();
                    }, 2e3);
                    var img = new Image(), img2 = new Image(), img3 = new Image(), img4 = new Image(), img5 = new Image();
                    img.src = url;
                    img2.src = url2;
                    img3.src = url3;
                    img4.src = url4;
                    img5.src = url5;
                },
                data: {
                    mapDaid: {
                        "wanggou.com": 154,
                        "buy.qq.com": 128,
                        "shop.qq.com": 127,
                        "paipai.com": 126,
                        "sudi.qq.com": 189,
                        "kuyoo.cn": 130,
                        "chong.qq.com": 129,
                        "etg.qq.com": 131,
                        "wkd.qq.com": 66,
                        "weikeduo.qq.com": 132,
                        "victor.qq.com": 133,
                        "piao.qq.com": 76,
                        "go.qq.com": 70,
                        "gaopeng.qq.com": 134,
                        "gaopeng.com": 135,
                        "518.qq.com": 152,
                        "licai.qq.com": 190,
                        "51buy.com": 68,
                        "yixun.com": 174
                    }
                },
                tools: {
                    getDaid: function(domain) {
                        var mapDaid = login.data.mapDaid;
                        for (var key in mapDaid) {
                            if (domain.indexOf(key) != -1) {
                                return mapDaid[key];
                            }
                        }
                        return -1;
                    }
                },
                registerLoginEvent: function() {
                    ptlogin2_onLogin = function() {
                        return that.instance.onLogin() ? true : false;
                    };
                    ptlogin2_onReset = function() {
                        return that.instance.onReset() ? true : false;
                    };
                    ptlogin2_onClose = function() {
                        if (location.hostname.indexOf("qq.com") != -1) {
                            ptlogin2_onSuccess();
                        }
                        return that.instance.onClose() ? true : false;
                    };
                    ptlogin2_onResize = function(w, h) {
                        var login = that.instance;
                        w = parseInt(w);
                        h = parseInt(h);
                        if (!login.onResize(w, h)) {
                            return false;
                        }
                        login.resize($id("login_frame_" + login.counter), w, h);
                        if (login.floatDialog) {
                            h = h + 75 - (login.showProtocol ? 0 : 39);
                            login.floatHandle ? login.floatHandle.resize(w + 28, h) : "";
                            login.resize($id("loginunit"), w + 28, h);
                        } else {
                            h = h + 60 - (login.showProtocol ? 0 : 39);
                            login.resize($id(login.containerId), w, h);
                            login.resize($id("loginunit2"), w, h);
                        }
                        return true;
                    };
                    ptlogin2_onSuccess = function() {
                        var hn = location.hostname, isWG = hn.indexOf("wanggou.com") != -1, isPP = hn.indexOf("paipai.com") != -1;
                        if (isWG || isPP) {
                            $itilReport({
                                bid: "4",
                                mid: "01",
                                res: [ "0:1" ]
                            });
                        }
                        var login = that.instance;
                        if (!login.onSuccess()) {
                            return false;
                        }
                        login.close();
                        login.syncLogin();
                        return true;
                    };
                    ptlogin2_onFailure = function(err) {
                        var hn = location.hostname, isWG = hn.indexOf("wanggou.com") != -1, isPP = hn.indexOf("paipai.com") != -1;
                        if (isWG || isPP) {
                            $itilReport({
                                bid: "4",
                                mid: "01",
                                res: [ "0:0" ]
                            });
                        }
                        var login = that.instance;
                        if (!login.onFailure(err)) {
                            return false;
                        }
                        if (err) {
                            alert("登录失败！可能的错误原因：" + err);
                        }
                        that(login);
                        return true;
                    };
                    ptlogin2_frame_onLoad = function() {
                        var login = that.instance;
                        if (login.noChangeQQ) {
                            var _ifrm = $id("login_frame_" + login.counter);
                            if (_ifrm) {
                                var _u = _ifrm.contentWindow && _ifrm.contentWindow.document.getElementById("u");
                                if (_u) {
                                    _u.disabled = true;
                                }
                            }
                        }
                    };
                },
                doAction: function() {
                    var action = this.option.action;
                    switch (this.option.type) {
                      case "func":
                        action();
                        break;

                      case "top":
                        top.location.href = action;
                        break;

                      case "parent":
                        parent.location.href = action;
                        break;

                      case "self":
                        location.href = action;
                        break;

                      case "blank":
                        window.open(action);
                        break;
                    }
                },
                show: function(option) {
                    var hn = location.hostname, isQQ = hn.indexOf("qq.com") != -1, isWG = hn.indexOf("wanggou.com") != -1;
                    if (!this.appid) {
                        if (isWG) {
                            this.appid = 677010801;
                        } else if (hn.indexOf("buy.qq.com") > -1) {
                            if (hn.indexOf("seller.buy.qq.com") > -1) {
                                this.appid = 703010802;
                            } else {
                                this.appid = 677010801;
                            }
                        } else {
                            this.appid = isQQ ? 8000210 : 17000101;
                        }
                    }
                    if (!this.daid) {
                        this.daid = login.tools.getDaid(hn);
                        $setCookie("daid", this.daid, 525600);
                    }
                    if (this.daid == 154 || this.daid == 128 || this.daid == 127) {
                        this.title = "腾讯网购-请您登录后继续刚才的操作";
                    } else if (this.daid == 126) {
                        this.title = "腾讯拍拍-请您登录后继续刚才的操作";
                    }
                    var query = {
                        hide_border: 1,
                        style: 23,
                        daid: this.daid,
                        pt_safe: 1,
                        hide_title_bar: 1,
                        hide_close_icon: 1,
                        target: "self",
                        no_verifyimg: 1,
                        f_url: "loginerroralert",
                        bgcolor: this.floatDialog ? "f2faff" : "eef5ff",
                        link_target: "blank",
                        uin: this.defaultQQ,
                        appid: this.appid,
                        t: Math.random()
                    };
                    if (!this.quickLogin) {
                        query["enable_qlogin"] = 0;
                    }
                    if (isQQ) {
                        var url = "https://ssl.xui.ptlogin2.qq.com/cgi-bin/xlogin?";
                        query["s_url"] = hn.indexOf("buy.qq.com") > -1 ? "http://buy.qq.com%2Fredirect.html" : /(chong\b|^518\b|^licai\b\.qq\.com)/.test(hn) ? "http%3A%2F%2Fchong.qq.com%2Fmember%2Flogin_s.shtml" : "http://imgcache.qq.com%2Fqqshop%2Fac%2Fportal%2Fredirect.html";
                    } else if (isWG) {
                        var url = "https://ssl.xui.ptlogin2.wanggou.com/cgi-bin/xlogin?";
                        query["s_url"] = encodeURIComponent("http://member.wanggou.com/userlogin/ptlogin?loginfrom=21&daid=154");
                    } else {
                        var url = "https://ssl.xui.ptlogin2.paipai.com/cgi-bin/xlogin?";
                        query["s_url"] = encodeURIComponent("http://member.paipai.com/userlogin/ptlogin?loginfrom=18");
                    }
                    url += $makeUrl(query);
                    var width = 398, ifrmHeight = 370, height = ifrmHeight + 35 + (this.showProtocol ? 39 : 0);
                    var isQQbuy = hn.indexOf("buy.qq.com") > -1 || isWG;
                    var h = '<div class="{class}" id="{class}" style="position:relative;                    height:' + height + "px;                    width:" + width + 'px"><h3 id="login_title_{id}" style="padding:0;                    margin:0"><span id="login_close_btn_{id}"{display}>关闭</span><strong>登录</strong><em>{title}</em></h3><iframe src="' + url + '" id="login_frame_{id}" name="login_frame_{id}" scrolling="no" frameborder="0" allowTransparency ="true" onload="ptlogin2_frame_onLoad()"  style="height:' + ifrmHeight + "px;                    width:" + (width - 2) + 'px"></iframe><div id="login_protocol_{id}" style="text-align:center"><input name="" id="login_protocol_chk_{id}" type="checkbox" value="" checked="checked" /><label for="login_protocol_chk_{id}"> 已阅读并同意<a class="blule" href="' + (isQQbuy ? "http://buy.qq.com/agreement.html" : "http://help.paipai.com/user_agreement.shtml") + '" target="_blank">《' + (isQQbuy ? "腾讯电商服务协议" : "腾讯电商服务协议") + '》</a></label></div><div id="login_protocol_mask_{id}" onclick="alert(\'请先同意《' + (isQQbuy ? "腾讯电商服务协议" : "腾讯电商服务协议") + '》\')" style="position:absolute;                            left:3px;                    top:28px;                    filter:alpha(opacity=1);                    opacity:0.01;                    background-color:#000;                    display:none;                    width:398px;                    height:' + ifrmHeight + 'px"></div></div>';
                    h = h.replace(/{id}/g, option.counter).replace(/{class}/g, this.floatDialog ? "loginunit" : "loginunit2").replace(/{display}/g, this.showClose ? "" : 'style="display:none;                    "').replace(/{title}/g, this.title);
                    if (this.floatDialog) {
                        this.floatHandle = $float({
                            width: width,
                            height: height,
                            cover: this.modalDialog,
                            style: "none",
                            title: this.title,
                            titleId: "login_title_" + option.counter,
                            html: '<div id="login_content_' + option.counter + '">' + h + "</div>",
                            left: this.x,
                            top: this.y,
                            dragble: this.dragable,
                            fix: !this.dragable,
                            showClose: this.showClose,
                            closeId: this.showClose ? "login_close_btn_" + option.counter : ""
                        });
                        this.containerId = "login_content_" + option.counter;
                    } else {
                        $id(this.containerId).innerHTML = h;
                    }
                    if (this.showProtocol) {
                        $id("login_protocol_" + option.counter).style.display = "";
                        $id("login_protocol_chk_" + option.counter).onclick = function() {
                            var a = $id("login_protocol_mask_" + option.counter);
                            if (this.checked) {
                                a.style.display = "none";
                            } else {
                                a.style.display = "";
                            }
                        };
                    } else {
                        $id("login_protocol_" + option.counter).style.display = "none";
                    }
                },
                close: function() {
                    if (this.floatDialog && this.floatHandle) {
                        this.floatHandle.close();
                    }
                },
                load: function(arrURL) {
                    if (arrURL instanceof Array) {
                        for (var i = 0, l = arrURL.length; i < l; i++) {
                            if (arrURL[i] && /^(http|https):\/\//gi.test(arrURL[i])) {
                                $loadCss(arrURL[i]);
                            }
                        }
                    } else if (arrURL) {
                        $loadCss(arrURL);
                    }
                },
                resize: function(obj, w, h) {
                    if (h) {
                        obj.style.height = h + "px";
                    }
                    if (w) {
                        obj.style.width = w + "px";
                    }
                }
            };
            return login.init(opts);
        };
    })(window);
    function $makeUrl(data) {
        var arr = [];
        for (var k in data) {
            arr.push(k + "=" + data[k]);
        }
        return arr.join("&");
    }
    function $setCookie(name, value, expires, path, domain, secure) {
        var exp = new Date(), expires = arguments[2] || null, path = arguments[3] || "/", domain = arguments[4] || null, secure = arguments[5] || false;
        expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
        document.cookie = name + "=" + escape(value) + (expires ? ";expires=" + exp.toGMTString() : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
    }
    function $time33(str) {
        for (var i = 0, len = str.length, hash = 5381; i < len; ++i) {
            hash += (hash << 5) + str.charAt(i).charCodeAt();
        }
        return hash & 2147483647;
    }
    exports.show = $login;
    exports.addToken = $addToken;
});
