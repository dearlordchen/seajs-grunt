/**
 * 微店装修弹出提示框
 * @version v20140219
 * @author Diarywang
 * @description  
 */
define("common/dialog-debug", [ "jquery/jquery-debug", "common/float-debug", "common/tplparser-debug", "common/fun-debug", "common/floatmask-debug" ], function(require, exports, module) {
    "use strict";
    var $ = require("jquery/jquery-debug"), _float = require("common/float-debug"), _template = require("common/tplparser-debug"), _baseFun = require("common/fun-debug"), _floatmask = require("common/floatmask-debug"), _config = {
        submitId: "wd-dialog-submit",
        closeId: "wd-dialog-close"
    }, _defaults = {
        autoResize: true,
        title: "",
        style: "none",
        dragble: false,
        dragbled: true,
        showClose: false,
        onInited: _baseFun.noop(),
        onConfirm: _baseFun.noop(),
        onClosed: _baseFun.noop(),
        zindex: 99999,
        width: "400",
        closeId: "",
        delayClose: 0
    }, _tpl = {
        tips: '<div class="ui_popup">' + '<i class="icon_<%=@type%>"></i>' + '<div class="ui_popup_container"><%=@html%></div>' + '<div class="ui_popup_action">' + '   <% if( "confirm" == @type ){ %>' + '   <a id="' + _config.submitId + '" class="btn" href="###">确定</a><a id="' + _config.closeId + '" class="btn" href="###">取消</a>' + "   <% }else{ %>" + '   <a id="' + _config.closeId + '" class="btn" href="###">关闭</a>' + "   <% } %>" + "</div>" + "</div>",
        tipsOk: '<div class="ui_popup_tip" style=" display: block " id="' + _config.closeId + '"><%=@title%></div>',
        dialog: '<div class="ui_dialog_wrapper gallery" data-tag="gallery" style="left:0; top:0;background: #FFF; position: relative;display:block;">' + '   <div class="ui_dialog">' + '   <div class="ui_dialog_header" data-tag="dialog_header">' + '       <div class="ui_dialog_title"><%=@title%></div>' + '       <a class="ui_dialog_close" href="###" title="关闭" id="' + _config.closeId + '">×</a>' + "   </div>" + '   <div class="ui_dialog_container"><%=@html%></div>' + '   <div class="ui_dialog_footer">' + "       <% if( @isShowOk ){ %>" + '       <a href="###" class="btn" id="' + _config.submitId + '">确定</a>' + "       <% } %>" + "   </div>" + "   </div>" + "</div>"
    };
    //用于显示 大块内容
    exports.dialog = function(title, html, opt) {
        return openFloat(title, html, opt, "dialog");
    };
    //显示提示框
    exports.warn = function(title, opt) {
        return openFloat("", title, opt, "warn");
    };
    //显示确认框
    exports.confirm = function(title, opt) {
        return openFloat("", title, opt, "confirm");
    };
    //成功提示
    exports.success = function(title, opt) {
        return openFloat("", title, opt, "success");
    };
    //错误提示
    exports.error = function(title, opt) {
        return openFloat("", title, opt, "error");
    };
    //弹出框
    exports.pop = function(dialogId, closeBtns, opt, position) {
        _floatmask.mask(opt);
        _floatmask.show();
        $("#" + dialogId).show();
        if (opt && opt.zIndex) {
            $("#" + dialogId).css("zIndex", parseInt(opt.zIndex, 10) + 2);
        }
        if (!position) {
            position = {};
            position.left = $(document).scrollLeft() + ($(window).width() - $("#" + dialogId).outerWidth()) / 2;
            position.top = $(document).scrollTop() + ($(window).height() - $("#" + dialogId).outerHeight()) / 2;
        }
        $("#" + dialogId).show().offset(position);
        if (closeBtns) {
            $(closeBtns).click(function() {
                _floatmask.hide();
                $("#" + dialogId).hide();
            });
        }
    };
    //关闭弹窗
    function openFloat(title, html, opt, type) {
        var opts = $.extend({}, _defaults, opt), tplTips = _template.Template({
            tpl: _tpl.tips
        }), tipsOk = _template.Template({
            tpl: _tpl.tipsOk
        }), tplDialog = _template.Template({
            tpl: _tpl.dialog
        }), floatOpen = null;
        if (type == "dialog") {
            //内容
            opts.html = tplDialog.render({
                title: title,
                html: html,
                isShowOk: opts.isShowOk
            });
        } else if (type == "success") {
            opts.delayClose = 3e3;
            opts.cover = false;
            //不要背景遮罩
            //内容
            opts.html = tipsOk.render({
                title: html || "保存成功"
            });
        } else {
            //内容
            opts.html = tplTips.render({
                html: html,
                type: type || "warn"
            });
        }
        opts.closeId = _config.submitId + "," + _config.closeId + (opts.closeId ? "," + opts.closeId : "");
        opts.onInit = opts.onInited;
        opts.onClose = function() {
            ui(0);
            opts.onClosed();
            return true;
        };
        //弹窗
        floatOpen = _float.show(opts);
        ui(1);
        //拖动
        if (opts.dragbled) {
            initDragItem({
                barDom: $("#" + floatOpen.boxId + " [data-tag=dialog_header]:first"),
                targetDom: $(floatOpen.boxHandle)
            });
        }
        //延迟关闭
        if (opts.delayClose > 0) {
            //floatOpen.close();
            $("#" + floatOpen.boxId).animate({
                opacity: 0
            }, opts.delayClose, function() {
                floatOpen.close();
            });
            setTimeout(function() {
                ui(0);
            }, 500);
        }
        //确认
        $("#" + _config.submitId).click(function() {
            opts.onConfirm(opts);
            return false;
        });
        //返回  弹窗
        return floatOpen;
    }
    //界面 事件
    function ui(state) {
        state = parseInt(state) || 0;
        // 0 : 关闭， !0 ： 打开
        if (state) {
            $("#mainwrapper, #shopview").addClass("filter_blur");
        } else {
            $("#mainwrapper, #shopview").removeClass("filter_blur");
        }
    }
    // 当 内容区域 大于 屏幕可视区域 ...
    function initDragItem(opt) {
        var _option = {
            barDom: "",
            //拖动区域的dom对象
            targetDom: ""
        }, _targetWidth = 0, _targetHeight = 0, _leftMax = 0, _topMax = 0;
        for (var i in opt) {
            _option[i] = opt[i];
        }
        _option.barDom.css({
            cursor: "move"
        });
        //计算尺寸
        updateSize();
        _option.barDom.mousedown(function(event) {
            var isMove = true, abs_x = event.pageX - _option.targetDom.offset().left, abs_y = event.pageY - _option.targetDom.offset().top;
            $(document).bind("mousemove.shopDialog", function(event) {
                var left = Math.max(0, event.pageX - abs_x), top = Math.max(0, event.pageY - abs_y);
                //不能超过 右、下边界
                left = Math.min(left, _leftMax);
                top = Math.min(top, _topMax);
                if (isMove) {
                    _option.targetDom.css({
                        left: left,
                        top: top
                    });
                }
            }).bind("mouseup.shopDialog", function() {
                isMove = false;
            });
        }).mouseup(function(event) {
            //清楚 绑在 document 的事件
            setTimeout(function() {
                $(document).unbind("mousemove.shopDialog mouseup.shopDialog");
            }, 100);
        });
        setInterval(function() {
            updateSize();
        }, 1e3);
        //动态更新 尺寸
        function updateSize() {
            _targetWidth = _option.targetDom.width();
            _targetHeight = _option.targetDom.height();
            _leftMax = Math.max(0, $(document).width() - _targetWidth);
            _topMax = Math.max(0, $("body").height() - _targetHeight);
        }
    }
});
