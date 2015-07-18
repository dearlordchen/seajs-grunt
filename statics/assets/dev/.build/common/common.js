define("common/common", [ "jquery/jquery" ], function(require, exports, module) {
    var $ = require("jquery/jquery");
    exports = {};
    module.exports = exports;
    var ua = navigator.userAgent.toLowerCase(), $win = $(window), $doc = $(document);
    var ie = /msie/.test(ua), ie6 = ie && "undefined" == typeof document.body.style.maxHeight, ie7 = ie && ua.match(/msie ([\d.]+)/)[1] >= "7.0";
    exports.cm = {
        base: {
            root: "http://www.easyhin.com/index.php",
            center: "http://www.easyhin.com/index.php?c=usercenter",
            img: "http://www.easyhin.com/statics/img/",
            js: "http://www.easyhin.com/statics/js/",
            baidutk: "50fd1fcfbeb7bf7b8e3a425c546b9e78",
            ie: ie,
            ie6: ie6,
            ie7: ie7,
            h5: !!window.FileReader,
            placeholder: !!("placeholder" in document.createElement("input"))
        },
        dialog: {
            tpl: '<div style="padding:5px;background:rgba(0,0,0,.4);filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#64000000,endColorStr=#64000000);width:360px;height:160px;">				<dl style="float:left;width:100%;height:100%;background:#fff;">				<dt style="font-size:14px;font-weight:700;height:35px;line-height:35px;background:#fff;border-bottom:1px solid #e9e9e9;padding:0 8px;color:#333;">				<a mod="btn-close" href="javascript:;" style="float:right;color:#999;text-decoration:none;height:16px;width:16px;line-height:14px;font-size:20px;position:relative;top:10px;">×</a>				<span mod="title">提示</span></dt>				<dd style="float:left;height:90px;width:100%;">				<p mod="content" style="text-align:center;height:60px;padding-top:30px;font-size:14px"></p>				</dd>				<dd style="float:left;width:100%;height:34px;text-align:right;"><a style="margin-right:10px;height:24px;line-height:24px;" href="javascript:;" mod="sure" class="btn btn-yellow">确定</a>				</dd></dl></div>',
            iframe: '<iframe frameborder="0" src="about:blank" style="width:100%;position:absolute;left:0;top:0;z-index:8887;display:none;border:none;filter:alpha(opacity=0);"></iframe>',
            now: "",
            cache: {},
            mask: 0,
            noscroll: false,
            fixed: true,
            inited: false,
            init: function() {
                if (!this.inited) {
                    this.inited = true;
                    this.mask = document.createElement("div");
                    $("body").append(this.mask);
                    if (ie6) {
                        this.iframe = $(this.iframe);
                        $("body").append(this.iframe);
                    } else {
                        this.iframe = false;
                    }
                    this.mask = $(this.mask).css({
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        display: "none",
                        "z-index": 19990,
                        background: "#000000",
                        opacity: .5
                    });
                }
            },
            popup: function(id, html, mask, func_create, func_show) {
                var _this = this, pabs = ie6 || !_this.fixed, pos = pabs ? "absolute" : "fixed";
                if (!_this.cache[id]) {
                    var div = $(document.createElement("div"));
                    div.append(html).attr("id", id).css("position", pos);
                    _this.cache[id] = div;
                    $("body").append(div);
                    if (typeof func_create == "function") {
                        func_create.call(_this, div);
                    }
                } else {
                    var div = _this.cache[id];
                }
                _this.now = id;
                if (_this.noscroll) {
                    $("html").css("overflow-y", "hidden");
                }
                var css = {
                    left: ($doc.width() - div.width()) / 2,
                    top: ($win.height() - div.height()) / 2 - 20,
                    position: pos,
                    "z-index": 2e4
                };
                if (pabs) {
                    css.top = css.top + document.documentElement.scrollTop;
                }
                div.css(css).show();
                if (!_this.inited) {
                    _this.init();
                }
                if (mask) {
                    _this.setMaskHeight();
                    $win.bind("resize", _this.setMaskHeight);
                }
                if (typeof func_show == "function") {
                    func_show.call(_this, div);
                }
            },
            setMaskHeight: function() {
                var that = exports.cm.dialog, height = $doc.height();
                that.mask.css("height", height).show();
                if (that.iframe) {
                    that.iframe.css("height", height).show();
                }
            },
            close: function(id, nomask) {
                var _this = this;
                if (id) {
                    if (_this.cache[id]) {
                        _this.cache[id].hide();
                    } else if (id == "all") {
                        for (var i in _this.cache) {
                            _this.cache[i].hide();
                        }
                    }
                } else if (_this.now && _this.cache[_this.now]) {
                    _this.cache[_this.now].hide();
                }
                if (!_this.inited) {
                    _this.init();
                }
                if (!nomask) {
                    _this.mask.hide();
                    $win.unbind("resize", _this.setMaskHeight);
                }
                if (_this.iframe) {
                    _this.iframe.hide();
                }
                if (_this.noscroll) {
                    $("html").css("overflow-y", "auto");
                }
            },
            alert: function(content, title, func, html) {
                var _this = this;
                this.popup("_alert", this.tpl, true, function(tpl) {
                    tpl.find("dl>dt").draggable(tpl);
                }, function(tpl) {
                    var ctn = tpl.find("[mod=content]"), btn = tpl.find("[mod=sure],[mod=btn-close]").off("click"), fun = typeof func == "function" ? func : function() {
                        _this.close();
                        $("body").off("keydown.esc");
                    };
                    if (html) {
                        ctn.html(content);
                    } else {
                        ctn.text(content);
                    }
                    tpl.find("[mod=title]").text(title ? title : "提示");
                    btn.click(fun).focus();
                    $("body").on("keydown.esc", function(e) {
                        if (e.keyCode == 27) {
                            _this.close();
                            $("body").off("keydown.esc");
                        }
                    });
                });
            },
            confirm: function(title, content, func_sure, func_cancel) {
                var _this = this;
                this.popup("_comfrim", this.tpl, true, function(tpl) {
                    tpl.find("[mod=sure]").after('<a href="javascript:;" mod="cancel" class="btn gray" style="margin-right:10px;height:24px;line-height:24px;">取消</a>');
                    tpl.find("dl>dt").draggable(tpl);
                }, function(tpl) {
                    tpl.find("[mod=content]").text(content);
                    tpl.find("[mod=title]").text(title ? title : "提示");
                    var sure = tpl.find("[mod=sure]").off("click"), cancel = tpl.find("[mod=cancel],[mod=btn-close]").off("click");
                    sure.focus();
                    if (typeof func_sure == "function") {
                        sure.click(func_sure);
                    } else {
                        sure.click(function() {
                            location.reload();
                        });
                    }
                    if (typeof func_cancel == "function") {
                        cancel.click(func_cancel);
                    } else {
                        cancel.click(function() {
                            _this.close();
                        });
                    }
                });
            },
            loading: function(msg) {
                var tpl = '<div style="height:53px;width:220px;background:#f9f9f9;border-radius:8px;"><div class="loading loading32x32"><i></i><span>' + (msg || "加载中...") + "</span></div></div>";
                this.popup("_loading_dialog", tpl, true, function(tpl) {}, function(tpl) {});
            },
            closeLoading: function() {
                this.close("_loading_dialog");
            }
        },
        tools: {}
    };
    $.fn.draggable = function(box) {
        var self = $(this).css("cursor", "move"), $body = $("body"), $box = !box ? self : $(box), ox, oy, ptype = $box.css("position"), fixed = ptype != "absolute" && !ie6;
        box = $box.get(0);
        function ub(e) {
            $doc.off(".drag");
        }
        self.on({
            mousedown: function(e) {
                var p = $box.position(), dw = $body.width(), dh = $body.height(), bw = $box.outerWidth(), bh = $box.outerHeight(), dx, dy;
                ox = e.pageX - p.left;
                oy = e.pageY - p.top;
                $doc.on({
                    "mousemove.drag": function(e) {
                        var x = Math.floor(e.pageX - ox), y = Math.floor(e.pageY - oy), sl = $win.scrollLeft(), st = $win.scrollTop();
                        if (fixed) {
                            x = x - sl;
                            y = y - st;
                            sl = st = 0;
                        }
                        if (x <= sl) {
                            x = sl;
                        } else {
                            dx = dw - bw;
                            if (x > dx) {
                                x = dx;
                            }
                        }
                        box.style.left = x + "px";
                        if (y <= st) {
                            y = st;
                        } else {
                            dy = dh - bh;
                            if (y > dy) {
                                y = dy;
                            }
                        }
                        box.style.top = y + "px";
                        return false;
                    },
                    "mouseup.drag": ub
                });
            },
            mouseup: ub
        });
    };
    exports.addSelect = function(e, t, v) {
        // 新增一个下拉框
        var o = new Option(t, v);
        e.options[e.options.length] = o;
        return o;
    };
    exports.getQS = function(n) {
        var r = location.search.substr(1).match(new RegExp("(^|&)" + n + "=([^&]*)(&|$)"));
        return r != null ? decodeURIComponent(r[2]) : null;
    };
    exports.Cookie = {
        get: function(name) {
            // 读取COOKIE
            var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)");
            var val = document.cookie.match(reg);
            return val ? val[2] ? decodeURIComponent(val[2]) : "" : null;
        },
        del: function(name, path, domain, secure) {
            // 删除cookie
            var value = $getCookie(name);
            if (value != null) {
                var exp = new Date();
                exp.setMinutes(exp.getMinutes() - 1e3);
                path = path || "/";
                document.cookie = name + "=;expires=" + exp.toGMTString() + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
            }
        },
        set: function(name, value, expires, path, domain, secure) {
            // 写入COOKIES
            var exp = new Date(), expires = arguments[2] || null, path = arguments[3] || "/", domain = arguments[4] || null, secure = arguments[5] || false;
            expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
            document.cookie = name + "=" + encodeURIComponent(value) + (expires ? ";expires=" + exp.toGMTString() : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
        }
    };
});
