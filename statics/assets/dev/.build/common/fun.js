/**
 * 公用函数
 * @version v20140219
 * @author Diarywang
 * @description  
 */
define("common/fun", [ "jquery/jquery" ], function(require, exports, module) {
    "use strict";
    var $ = require("jquery/jquery");
    //空函数
    exports.noop = function() {
        return function() {
            return true;
        };
    };
    //美化 check， radio @2014.02
    //查找 inputArea 区域下 的 所有  check， radio ，按照 name 归类
    //目前还不支持 【全选】功能
    exports.beautyRadio = function(inputArea, opt) {
        var _default = {
            classes: {
                normal: "radio",
                checked: "checked",
                disabled: "disabled"
            }
        };
        opt = $.extend({}, _default, opt);
        return new Radio($(inputArea), opt);
    };
    //美化 radio
    function Radio(inputArea, opt) {
        var _self = this, labels = inputArea.find("input:radio+label"), inputs = labels.prev("input:radio");
        //dom
        this.dom = {
            labels: labels,
            inputs: inputs
        };
        //opts
        this.opts = opt;
        labels.each(function() {
            var input = $(this).prev().hide();
            $(this).addClass(opt.classes.normal);
            if (input.is(":checked")) {
                $(this).addClass(opt.classes.checked);
            } else if (input.is(":disabled")) {
                $(this).addClass(opt.classes.disabled);
            }
        }).click(function(event) {
            var input = $(this).prev();
            if (!input.is(":disabled")) {
                inputs.filter("[name=" + input.attr("name") + "]").next("label").removeClass(opt.classes.checked);
                $(this).addClass(opt.classes.checked);
                input.trigger("click");
            }
        });
    }
    //禁用
    //@radio ，要被禁用的 input ！
    //@type ， disabled, checked！ 如果是 checked 传递进来 ，比如是 相同 name
    //@state ，布尔值
    Radio.prototype.setState = function(radio, type, state) {
        var _self = this, label = radio.next("label");
        state = !!state;
        if ("checked" == type) {
            if (state) {
                //别的 radio
                $.each(this.dom.inputs.filter("[name=" + radio.attr("name") + "]"), function(i, input) {
                    $(input).attr({
                        checked: false
                    }).next().removeClass(_self.opts.classes[type]);
                });
                //radio 状态
                radio.attr({
                    checked: state
                }).next().addClass(_self.opts.classes[type]);
            } else {
                //radio 状态
                radio.attr({
                    checked: state
                }).next().removeClass(_self.opts.classes[type]);
            }
        } else if ("disabled" == type) {
            $.each(radio, function(i, input) {
                $(input).attr({
                    disabled: state
                });
                if (state) {
                    $(input).next().addClass(_self.opts.classes[type]);
                } else {
                    $(input).next().removeClass(_self.opts.classes[type]);
                }
            });
        }
    };
    Radio.prototype.click = function(dom, callback) {
        dom.next().click(function() {
            callback($(this).prev());
        });
    };
});
