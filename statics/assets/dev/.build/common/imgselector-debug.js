/**
 * 微店装修选择拍拍相册图片
 * @version v20140219
 * @author 
 * @description  
 */
define("common/imgselector-debug", [ "jquery/jquery-debug", "common/dialog-debug", "common/float-debug", "common/tplparser-debug", "common/fun-debug", "common/floatmask-debug", "common/loadscript-debug", "common/page-debug" ], function(require, exports, module) {
    "use strict";
    var $ = require("jquery/jquery-debug"), _dialog = require("common/dialog-debug"), _template = require("common/tplparser-debug"), _load = require("common/loadscript-debug"), _page = require("common/page-debug"), _baseFun = require("common/fun-debug"), _config = {
        areaId: "edit-gallery-area",
        loadAlbumCall: _baseFun.noop()
    }, _default = {
        type: "list",
        "max-width": 640,
        "max-height": 960,
        "max-size": 100,
        "width-type": "等于",
        "height-type": "等于",
        path: "/",
        name: "",
        pageSize: 10,
        "allow-type": "0,1,2,3",
        onLoad: _baseFun.noop()
    }, _opts = [], _dom = {
        lists: null,
        path: null,
        searchBtn: null,
        searchIn: null
    }, _cache = {
        dataTotal: 0,
        dataLists: [],
        dirInfo: {
            //当前文件夹信息
            pos: "",
            path: "",
            parentPath: ""
        }
    }, _tpl = {
        base: $("#gallery_select_tpl").html() || "",
        lists: '   <li data-tag="img-item" data-id="<%=@id%>" data-src="<%=@src%>" data-size="<%=@size%>" data-path="<%=@path%>" data-width="<%=@width%>" data-height="<%=@height%>" data-type="<%=@type%>">' + '   <img src="<%=@src%>" ><a><%=@name%></a>' + "</li>"
    }, _dialogOpen = null;
    //加载图片列表
    //
    exports.loadAlbum = function(opt) {
        //参数	 {
        //			'type'          : 'list'
        //          allow-type      : 1,2,3
        //			, 'max-width'   : 640
        //			, 'max-height'  : 2000
        //			, 'max-size'    : 100 //单张图片
        //			, 'path'        : '/'
        //			, 'name'        : ''
        //  		, pageSize      : 10
        //			, 'callback'    : ' '
        //		}
        opt = $.extend({}, _default, opt);
        //检验
        opt["max-width"] = parseFloat(opt["max-width"]) || _default["max-width"];
        opt["max-height"] = parseFloat(opt["max-height"]) || _default["max-height"];
        opt["max-size"] = parseFloat(opt["max-size"]) || _default["max-size"];
        opt["allow-type"] = opt["allow-type"].split(",").concat("0");
        //增加  文件夹类型
        //保存，用户 回调
        _config.loadAlbumCall = opt.onLoad;
        //清除，防止带到 url
        opt.onLoad = "";
        var tpl = _template.Template({
            tpl: _tpl.base
        }), html = tpl.render({
            areaId: _config.areaId,
            allowWidthType: opt["width-type"],
            allowHeightType: opt["height-type"],
            allowWidth: opt["max-width"],
            allowHeight: opt["max-height"]
        });
        //弹窗
        _dialogOpen = _dialog.dialog("选择图片", html, {
            closeId: _config.areaId + "-close",
            fix: true,
            top: "100"
        });
        //填充
        //$('#mainContent').append( html );
        //
        _dom.lists = $("#" + _config.areaId + " [data-tag=lists]");
        _dom.path = $("#" + _config.areaId + " [data-tag=cur-path]");
        _dom.searchBtn = $("#" + _config.areaId + " [data-tag=search-submit]");
        _dom.searchIn = $("#" + _config.areaId + " [data-tag=search-key]");
        //保存起来
        _opts = opt;
        //搜索
        //搜索
        _dom.searchBtn.click(function(e) {
            search(_dom.searchIn.val());
            return false;
        });
        //绑定图片选择事件 ，
        $("#" + _config.areaId).on("click", "li", function() {
            var $this = $(this), tag = $this.attr("data-tag"), type = $this.attr("data-type"), path = "", img = {};
            // 列表节点
            if ("img-item" == tag) {
                path = $this.attr("data-path") + "/" + $this.attr("data-id");
                //防止根目录下面
                path = path.replace(/\/\//g, "/");
                // 文件夹
                if ("0" == type) {
                    _opts.path = path;
                    _opts.type = "list";
                    _opts.name = "";
                    _load.loadScript(getUrl(_opts));
                } else {
                    img = {
                        src: $this.attr("data-src"),
                        width: $this.attr("data-width"),
                        height: $this.attr("data-height"),
                        size: $this.attr("data-size"),
                        type: $this.attr("data-type")
                    };
                    _config.loadAlbumCall(img);
                    //关闭 浮层
                    _dialogOpen.close();
                }
            }
        });
        $("#" + _config.areaId).on("click", "a", function(e) {
            var $this = $(this), tag = $this.attr("data-tag");
            if ("pos" == tag) {
                _opts.path = $(this).attr("data-path") || "/";
                _opts.type = "list";
                _opts.name = "";
                _load.loadScript(getUrl(_opts));
                return false;
            }
        });
        _load.loadScript(getUrl(_opts));
    };
    function search(keyword) {
        _opts.path = "/";
        _opts.type = "search";
        _opts.name = $.trim(keyword || "");
        _load.loadScript(getUrl(_opts));
    }
    //列表 回调
    window.wd_module_imgselector_callGetList = function(json) {
        var lists = json.lists, allowType = _opts["allow-type"], allowSize = _opts["max-size"], allowWidth = _opts["max-width"], allowHeight = _opts["max-height"], widthType = _opts["width-type"], heightType = _opts["height-type"], datas = [];
        var errorMsg = {
            "-7001": "用户不存在",
            "-7002": "没有找到拍拍相册"
        };
        //todo:500003 用户未登录
        if ("0" != json.errCode) {
            _dom.lists.html("<div>" + (errorMsg[json.retCode] || json.msg) + "</div>");
            return;
        }
        //更新路径
        updateDirInfo(json.lists.dirinfo);
        //过滤类型
        $.each(lists.data, function(i, list) {
            //检查类型 , 大小
            if ($.inArray(String(list.type), allowType) > -1 && parseFloat(list.size) <= allowSize) {
                //文件夹
                if (parseInt(list.type) != 0) {
                    // //高度相同
                    if (widthType == "等于" && parseFloat(list.width) != allowWidth) {
                        // 宽度相同
                        return;
                    }
                    //高度相同
                    if (heightType == "等于" && parseFloat(list.height) != allowHeight) {
                        return;
                    }
                    // 宽度小于
                    if (widthType == "小于" && parseFloat(list.width) > allowWidth) {
                        // 宽度相同
                        return;
                    }
                    //高度小于
                    if (heightType == "小于" && parseFloat(list.height) > allowHeight) {
                        //高度相同
                        return;
                    }
                }
                datas.push(list);
            }
        });
        //数量，用与分页等
        _cache.dataTotal = datas.length;
        _cache.dataLists = datas;
        if (0 == _cache.dataTotal) {
            _dom.lists.html('<div class="img_warn_null">此文件夹没有符合尺寸的图片。</div>');
            return;
        }
        showList(1);
        _page.$("#" + _config.areaId + "-pager").setPage(_cache.dataTotal, {
            items_per_page: 10,
            num_display_entries: 4,
            current_page: 0,
            num_edge_entries: 3,
            link_to: "javascript:void(0)",
            prev_text: "&lt;",
            next_text: "&gt;",
            ellipse_text: "...",
            callback: showList
        });
    };
    //######## 私有方法
    //拍拍相册 网址参数
    function getUrl(opt) {
        var domain = location.href.indexOf("wei.jd.com") >= 0 ? "wei.jd.com" : "ext.paipai.com";
        var urls = {
            list: "http://" + domain + "/album/filelist?",
            search: "http://" + domain + "/album/searchlist?"
        };
        opt = $.extend({}, _default, opt);
        opt.callback = "wd_module_imgselector_callGetList";
        //如果 关键词为空，则强制为 列表
        if (!opt.name) {
            opt.type = _default.type;
        }
        //列表区域 弄一朵菊花
        _dom.lists.html("数据加载中...");
        return urls[opt.type] + $.param(opt);
    }
    //获取当前路径的信息
    function updateDirInfo(dirinfo) {
        var pos = [], path = [], dirinfos = [];
        dirinfo = (dirinfo || "").replace(/&#47;/gi, "/").replace(/&#45;/gi, "-");
        dirinfos = dirinfo.split("/");
        dirinfos.unshift("/:我的相册");
        ///d877a1e4-9c50-4047-96a8-e4e49f184ba2:test /c3eafaca-e21f-4a8b-bf6c-350651ec1d21:2级别
        $.each(dirinfos, function(i, dir) {
            var name = "", title = "", curPath = "";
            dir = dir.split(":") || [];
            name = dir[0] || "";
            title = dir[1] || "...";
            if (!name) {
                return;
            }
            path.push(name);
            curPath = path.join("/").replace(/\/\//, "/");
            pos.push('<a href="##" data-tag="pos" data-path="' + curPath + '">' + title + "</a>");
        });
        _dom.path.html(pos.join(" &gt; "));
    }
    // 展示列表
    function showList(page) {
        page = ~~page;
        var lists = _cache.dataLists, pageSize = _opts.pageSize, datas = lists.slice(page * pageSize, (page + 1) * pageSize), html = "", out = [], tpl = _template.Template({
            tpl: _tpl.lists
        }, {
            $: function() {
                return $;
            }
        });
        $.each(datas, function(i, data) {
            var url = "", src = "";
            if ("0" == data.type) {
                //文件夹用自己的图标
                src = "http://static.paipaiimg.com/v5/img/weidian/folder.png";
            } else {
                //小图地址替换成大图地址
                url = data.url;
                src = data.url.replace(/\d+$/, "2000");
            }
            html = tpl.render({
                type: data.type,
                url: url,
                src: src,
                id: data.id,
                path: data.path,
                name: data.name,
                size: data.size,
                width: data.width,
                height: data.height
            });
            out.push(html);
        });
        _dom.lists.html(out.join(""));
    }
});
