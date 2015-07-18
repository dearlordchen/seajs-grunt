/**
 * 下拉列表
 * @version v20140224
 * @author boatxing
 * @description  
 */
define(function(require, exports, module) {
    var _jq = require("jquery/jquery");
	
	exports.add = function(target, val){
		return new selectlist(target, val);
	}
	
	function selectlist(target, val){
		this.val = val;
		this.target = target;
		this.subscribe = {};
		
		if(!target)return;
		
		_jq('.ui_dropdown li', target).each(function(){
			if(_jq(this).attr("data-value") == val){
			    _jq('.current', target).text(_jq(this).text()).attr("data-value", val);    	
			}										
	    });
		
		this.bindEvent();
	}
	
	//获取选择的值
	selectlist.prototype.getValue = function(){
		return this.val;
	}
	
	//设置选中值
	selectlist.prototype.setVal = function(val){
		if(this.val == val)return;
		var that = this;
		_jq('.ui_dropdown li', this.target).each(function(){
			if(_jq(this).attr("data-value") == val){
				that.val = val;
				var txt = _jq(this).text();
			    _jq('.current', that.target).text(txt).attr("data-value", val); 
				that.subscribe["change"] && that.subscribe["change"](val, txt);
			}										
	    });
	}
	
	selectlist.prototype.bindEvent = function(){
		var that = this;
		_jq(that.target).click(function(){
			_jq(this).toggleClass("ui_select_expand");					  
		});
		
		//选择
		_jq('.ui_dropdown', that.target).on("click", "li", function(e){
			var val = _jq(this).attr("data-value");
			if(val == ""){
				e.stopPropagation();
			    return false;	
			}
			if(that.val == val)return;
			that.val = val;
			that.text = _jq.trim(_jq(this).text());
			_jq('.current', that.target).text(that.text).attr("data-value", val);
			that.subscribe["change"] && that.subscribe["change"](val, that.text);
	    });
	}
	
	selectlist.prototype.on = function(type, callback){
	    this.subscribe[type] = callback;	
	}
});