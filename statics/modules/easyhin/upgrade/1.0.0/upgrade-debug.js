define("easyhin/upgrade/1.0.0/upgrade-debug", [ "jquery-debug", "easyhin/common/1.0.0/common-debug.js" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var C = require("easyhin/common/1.0.0/common-debug.js");
    var Cookie = C.Cookie;
    function md5() {
        // md5加密
        var hexcase = 0;
        /* hex output format. 0 - lowercase; 1 - uppercase */
        var b64pad = "";
        /* base-64 pad character. "=" for strict RFC compliance */
        var chrsz = 8;
        /* bits per input character. 8 - ASCII; 16 - Unicode */
        var option = {};
        option.hexcase = hexcase;
        option.b64pad = b64pad;
        option.chrsz = chrsz;
        option.hex_md5 = hex_md5;
        option.binl2hex = binl2hex;
        option.core_md5 = core_md5;
        return option;
        function hex_md5(s) {
            return binl2hex(core_md5(str2binl(s), s.length * option.chrsz));
        }
        function binl2hex(binarray) {
            var hex_tab = option.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 15);
            }
            return str;
        }
        function core_md5(x, len) {
            /* append padding */
            x[len >> 5] |= 128 << len % 32;
            x[(len + 64 >>> 9 << 4) + 14] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
            }
            return Array(a, b, c, d);
        }
        function md5_cmn(q, a, b, x, s, t) {
            return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
        }
        function md5_ff(a, b, c, d, x, s, t) {
            return md5_cmn(b & c | ~b & d, a, b, x, s, t);
        }
        function md5_gg(a, b, c, d, x, s, t) {
            return md5_cmn(b & d | c & ~d, a, b, x, s, t);
        }
        function md5_hh(a, b, c, d, x, s, t) {
            return md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function md5_ii(a, b, c, d, x, s, t) {
            return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
        }
        function safe_add(x, y) {
            var lsw = (x & 65535) + (y & 65535);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return msw << 16 | lsw & 65535;
        }
        function bit_rol(num, cnt) {
            return num << cnt | num >>> 32 - cnt;
        }
        function str2binl(str) {
            var bin = Array();
            var mask = (1 << option.chrsz) - 1;
            for (var i = 0; i < str.length * option.chrsz; i += option.chrsz) bin[i >> 5] |= (str.charCodeAt(i / option.chrsz) & mask) << i % 32;
            return bin;
        }
    }
    var Upgrade = {
        init: function() {
            this.bindEvent();
        },
        bindEvent: function() {
            var _this = this;
            $("#username,#passwd").keyup(function(e) {
                if (this.value != "") {
                    $(this).next().addClass("hidden");
                } else {
                    $(this).next().removeClass("hidden");
                    return false;
                }
                _this.showTips(this, "ok", "");
                var key = e.keyCode ? e.keyCode : e.which;
                if (key == 13 || key == 10) {
                    _this.set();
                }
            });
            $("#submit").click(function() {
                _this.set();
                return false;
            });
            $("#verify-refresh,#vcode-img").click(function() {
                _this.refresh();
                return false;
            });
        },
        showTips: function(o, ty, msg) {
            $(o).nextAll("i").attr("class", "icon2 " + ty);
        },
        set: function() {
            var that = this;
            if (!this.verifyFields()) {
                return false;
            }
            var m = md5(), pwd = $("#passwd").val();
            if (pwd.length <= 16) {
                pwd = m.hex_md5(pwd);
            }
            $.ajax({
                url: "/wei/index.php/service/upgrade",
                data: {
                    username: $("#username").val(),
                    password: pwd,
                    vcode: $("#vcode").val()
                },
                type: "post",
                dataType: "json",
                cache: "false",
                beforeSend: function() {
                    $("#submit").html("智能升级中").addClass("disabled");
                },
                error: function() {
                    alert("系统繁忙，请稍后重试");
                    $("#submit").html("下一步，智能升级").removeClass("disabled");
                },
                success: function(d) {
                    $("#submit").html("下一步，智能升级").removeClass("disabled");
                    if (d && d.ret == 0) {
                        window.location = "/wei/index.php";
                    } else {
                        if (d.ret == 4) {
                            that.refresh();
                        }
                        d.msg && alert(d.msg);
                        $("#passwd").focus();
                    }
                }
            });
        },
        refresh: function() {
            $("#vcode_wrap").show();
            $("#vcode-img").attr("src", "/index.php?c=service&m=verifycode&username=" + $("#username").val() + "&r=" + Math.random());
            $("#vcode").val("");
        },
        verifyFields: function() {
            var checked = true;
            if ($.trim($("#username").val()) == "") {
                this.showTips($("#username"), "alt", "请输入微信公众帐号名称");
                checked = false;
            }
            if ($("#passwd").val() == "") {
                this.showTips($("#passwd"), "alt", "请输入微信公众帐号密码");
                checked = false;
            }
            return checked;
        }
    };
    Upgrade.init();
});
