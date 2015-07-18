define(function(require, exports, module) {
	var $ = require('jquery');
	var C = require('common');
	var getQS = C.getQS;

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
			for ( var i = 0; i < binarray.length * 4; i++) {
				str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
			}
			return str;
		}

		function core_md5(x, len) {
			/* append padding */
			x[len >> 5] |= 0x80 << ((len) % 32);
			x[(((len + 64) >>> 9) << 4) + 14] = len;

			var a = 1732584193;
			var b = -271733879;
			var c = -1732584194;
			var d = 271733878;

			for ( var i = 0; i < x.length; i += 16) {
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
			return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}

		function md5_gg(a, b, c, d, x, s, t) {
			return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}

		function md5_hh(a, b, c, d, x, s, t) {
			return md5_cmn(b ^ c ^ d, a, b, x, s, t);
		}

		function md5_ii(a, b, c, d, x, s, t) {
			return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
		}

		function safe_add(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		}

		function bit_rol(num, cnt) {
			return (num << cnt) | (num >>> (32 - cnt));
		}

		function str2binl(str) {
			var bin = Array();
			var mask = (1 << option.chrsz) - 1;
			for ( var i = 0; i < str.length * option.chrsz; i += option.chrsz)
				bin[i >> 5] |= (str.charCodeAt(i / option.chrsz) & mask) << (i % 32);
			return bin;
		}
	}

	module.exports = {
		init : function(pageid) {
			if (pageid == "reg") {
				REG.init();
			}
			else {
				RegResult.init();
			}
		}
	};
	var REG = {
		text : [ '请输入您的常用邮箱', '请输入您的密码，至少6个字符', '请输入您的昵称', '请输入验证码' ],
		init : function() {
			this.bindEvent();
			this.refresh();
		},
		bindEvent : function() {
			var _this = this;
			var un = $('#username');
			un.blur(function() {
				if ($.trim($(this).val()) == '') {
					$(this).next().html(_this.text[0]);
					_this.showTips(this, 'error', '电子邮箱不能为空');
				}
				else if (!_this.verifyMail($(this).val())) {
					_this.showTips(this, 'error', '电子邮箱格式错误，如abc@qq.com');
				}
				else {
					$(this).css({
						borderColor : '#7abd54'
					});
					_this.showTips(this, 'ok', '');
				}
			}).focus(function() {
				$(this).removeAttr('style').next().html('').parent().next().attr('class', 'tips msg').html('请输入正确的邮箱，可用于找回密码');
			}).keyup(function(e) {
				var key = e.keyCode ? e.keyCode : e.which;
				if (key == 13 || key == 10) {
					_this.set();
				}
			});
			var pwd = $('#passwd');
			pwd.blur(function() {
				if ($(this).val() == '') {
					$(this).next().html(_this.text[1]);
					_this.showTips(this, 'error', '密码不能为空');
				}
				else if ($(this).val().length < 6) {
					_this.showTips(this, 'error', '密码长度不能小于6位');
				}
				else {
					$(this).css({
						borderColor : '#7abd54'
					});
					_this.showTips(this, 'ok', '');
					_this.showPwdTips(this);
				}
			}).focus(function() {
				$(this).removeAttr('style').next().html('').parent().next().attr('class', 'tips msg').html('请输入密码，长度为6-16个字符');
			}).keyup(function(e) {
				var key = e.keyCode ? e.keyCode : e.which;
				if (key == 13 || key == 10) {
					_this.set();
				}
				if ($(this).val() == '') {
					_this.showTips(this, 'error', '密码不能为空');
				}
				else if ($(this).val().length < 6) {
					_this.showTips(this, 'error', '密码长度不能小于6位');
				}
				else {
					$(this).css({
						borderColor : '#7abd54'
					});
					_this.showTips(this, 'ok', '');
					_this.showPwdTips(this);
				}
			});
			var cpwd = $('#cpasswd');
			cpwd.blur(function() {
				if ($(this).val() == '') {
					$(this).next().html(_this.text[1]);
					_this.showTips(this, 'error', '密码不能为空');
				}
				else if ($(this).val() != $(pwd).val()) {
					_this.showTips(this, 'error', '密码不一致');
				}
				else {
					$(this).css({
						borderColor : '#7abd54'
					});
					_this.showTips(this, 'ok', '');
				}
			}).focus(function() {
				$(this).removeAttr('style').next().html('').parent().next().attr('class', 'tips msg').html('请再次输入密码');
			}).keyup(function(e) {
				var key = e.keyCode ? e.keyCode : e.which;
				if (key == 13 || key == 10) {
					_this.set();
				}
				if ($(this).val() == '') {
					_this.showTips(this, 'error', '密码不能为空');
				}
				else if ($(this).val() != $(pwd).val()) {
					_this.showTips(this, 'error', '密码不一致');
				}
				else {
					$(this).css({
						borderColor : '#7abd54'
					});
					_this.showTips(this, 'ok', '');
				}
			});
			var nn = $('#nickname');
			nn.blur(function() {
				if ($.trim($(this).val()) == '') {
					$(this).next().html(_this.text[2]);
					_this.showTips(this, 'error', '昵称不能为空');
				}
				else {
					$(this).css({
						borderColor : '#7abd54'
					});
					_this.showTips(this, 'ok', '');
				}
			}).focus(function() {
				$(this).removeAttr('style').next().html('').parent().next().attr('class', 'tips msg').html('请输入昵称');
			}).keyup(function(e) {
				var key = e.keyCode ? e.keyCode : e.which;
				if (key == 13 || key == 10) {
					_this.set();
				}
			});
			var vc = $('#vcode');
			vc.blur(function() {
				if ($.trim($(this).val()) == '') {
					$(this).next().html(_this.text[3]);
				}
				else if ($.trim($(this).val()).length != 4) {
				}
				else {
					$(this).css({
						borderColor : '#7abd54'
					});
				}
			}).focus(function() {
				$(this).removeAttr('style').next().html('');
			}).keyup(function(e) {
				var key = e.keyCode ? e.keyCode : e.which;
				if (key == 13 || key == 10) {
					_this.set();
				}
			});
			$('#verify-refresh,#vcode-img').click(function() {
				_this.refresh();
				return false;
			});
			$('#submitbtn').click(function() {
				_this.set();
				return false;
			});
			$('#protocol').click(function() {
				if (this.checked) {
					$('#submitbtn').removeClass('disabled').click(function() {
						_this.set();
						return false;
					});
				}
				else {
					$('#submitbtn').addClass('disabled').unbind();
				}
			});
		},
		refresh : function() {
			$('#vcode-img').attr('src', '/index.php?c=vcode&r=' + Math.random());
			$('#vcode').val('');
		},
		set : function() {
			if (!this.verifyFields()) {
				return false;
			}
			var _this = this;
			var username = $('#username').val();
			var m = md5(), pwd = $('#passwd').val();
			pwd = m.hex_md5(m.hex_md5(m.hex_md5(pwd))).toUpperCase();
			$.ajax({
				url : '/index.php?c=register&m=reg',
				data : {
					username : username,
					password : pwd,
					nickname : $('#nickname').val(),
					vcode : $('#vcode').val()
				},
				type : 'post',
				dataType : 'json',
				cache : 'false',
				beforeSend : function() {
					$('#submitbtn').html('<span>注册中</span>');
				},
				error : function() {
					alert('系统繁忙，请稍后重试');
					$('#submitbtn').html('<span>立即注册</span>');
				},
				success : function(d) {
					$('#submitbtn').html('<span>立即注册</span>');
					switch (d.retCode*1) {
					case 0:
						window.location = '/index.php?c=register&m=result';
						break;
					case 4:
						_this.refresh();
						alert(d.retMsg);
						break;
					default:
						_this.refresh();
						alert(d.retMsg);
						break;
					}
				}
			});
		},
		verifyMail : function(mail) {
			if (/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ig.test(mail)) {
				return true;
			}
			return false;
		},
		verifyFields : function() {
			var checked = true;
			var un = $('#username');
			if ($.trim(un.val()) == '') {
				un.next().html(this.text[0]);
				this.showTips(un, 'error', '电子邮箱不能为空');
				checked = false;
			}
			else if (!this.verifyMail(un.val())) {
				this.showTips(un, 'error', '电子邮箱格式错误，如abc@qq.com');
				checked = false;
			}
			var pwd = $('#passwd');
			if (pwd.val() == '') {
				pwd.next().html(this.text[1]);
				this.showTips(pwd, 'error', '密码不能为空');
				checked = false;
			}
			else if ($.trim(pwd.val()).length < 6) {
				this.showTips(pwd, 'error', '密码长度不能小于6位');
				checked = false;
			}
			var cpwd = $('#cpasswd');
			if (cpwd.val() == '') {
				cpwd.next().html(this.text[1]);
				this.showTips(cpwd, 'error', '密码不能为空');
				checked = false;
			}
			else if (cpwd.val() != pwd.val()) {
				this.showTips(cpwd, 'error', '密码不一致');
				checked = false;
			}
			var nn = $('#nickname');
			if (nn.val() == '') {
				nn.next().html(this.text[2]);
				this.showTips(nn, 'error', '昵称不能为空');
				checked = false;
			}
			var vc = $('#vcode');
			if ($.trim(vc.val()) == '') {
				vc.next().html(this.text[3]);
				checked = false;
			}
			else if ($.trim(vc.val()).length != 4) {
				checked = false;
			}
			return checked;
		},
		sendActivateMail : function() {
			if ($('#username').val() == '') {
				return false;
			}
			$.ajax({
				url : '/index.php?c=register&m=sendActivateMail',
				data : {
					'username' : $('#username').val()
				},
				type : 'post',
				dataType : 'json',
				cache : 'false',
				beforeSend : function() {
				},
				error : function() {
					alert('系统繁忙，请稍后重试');
				},
				success : function(d) {
					switch (d.retCode*1) {
					case 0:
						alert(d.retMsg);
						break;
					default:
						alert(d.retMsg);
						break;
					}
				}
			});
		},
		showTips : function(o, ty, msg) {
			$(o).parent().next().attr('class', 'tips ' + ty).html(msg);
		},
		showPwdTips : function(o) {
			var n = this.checkStrong($(o).val());
			if (n == 0) {
				this.showTips(o, 'error', '密码长度不能小于6位');
			}
			else {
				n = n - 1;
				$('#pwdstrength-tips').css('visibility', 'visible');
				$('#pwdstrength').attr('class', [ 'rankLow', 'rankMiddle', 'rankMiddle', 'rankHigh' ][n]);
			}
		},
		charMode : function(iN) {
			if (iN >= 48 && iN <= 57)
				return 1;
			if (iN >= 65 && iN <= 90)
				return 2;
			if (iN >= 97 && iN <= 122)
				return 4;
			else
				return 8;
		},
		bitTotal : function(num) {
			var modes = 0;
			for ( var i = 0; i < 4; i++) {
				if (num & 1)
					modes++;
				num >>>= 1;
			}
			return modes;
		},
		checkStrong : function(sPW) {
			if (sPW.length < 6)
				return 0;
			var Modes = 0;
			for (i = 0; i < sPW.length; i++) {
				Modes |= this.charMode(sPW.charCodeAt(i));
			}
			return this.bitTotal(Modes);
		}
	};

	var RegResult = {
		mailList : {
			'qq.com' : 'mail.qq.com',
			'foxmail.com' : 'mail.foxmail.com',
			'vip.qq.com' : 'mail.qq.com',
			'163.com' : 'mail.163.com',
			'126.com' : 'www.126.com',
			'yeah.net' : 'yeah.net',
			'vip.126.com' : 'vip.126.com',
			'vip.163.com' : 'vip.163.com',
			'188.com' : 'mail.188.com',
			'x263.net' : 'mail.263.net',
			'263.net' : 'mail.263.net',
			'263.net.cn' : 'mail.263.net',
			'wo.com.cn' : 'mail.wo.com.cn',
			'189.cn' : 'mail.189.cn',
			'139.com' : 'mail.10086.cn',
			'sohu.com' : 'mail.sohu.com',
			'eyou.com' : 'www.eyou.com',
			'sogou.com' : 'mail.sogou.com',
			'21cn.com' : 'mail.21cn.com',
			'tom.com' : 'mail.tom.com',
			'vip.sina.com' : 'vip.sina.com.cn',
			'sina.com.cn' : 'mail.sina.com.cn',
			'hotmail.com' : 'mail.hotmail.com',
			'outlook' : 'www.outlook.com',
			'live.cn' : 'www.live.cn',
			'live.com' : 'www.live.com',
			'yahoo.com.cn' : 'mail.cn.yahoo.com',
			'yahoo.com' : 'mail.yahoo.com',
			'ymail.com' : 'www.ymail.com',
			'rocketmail.com' : 'www.rocketmail.com'
		},
		text : [ '请输入您的常用邮箱', '请输入您的密码，至少6个字符', '请输入您的昵称', '请输入验证码' ],
		init : function() {
			this.bindEvent();
		},
		bindEvent : function() {
			var _this = this;
			$('#sendActivateMailBtn').click(function() {
				_this.sendActivateMail();
				return false;
			});
			$('#toMailHomePageBtn').click(function() {
				var username = getQS('un');
				var domain = username.split('@')[1];
				window.open('http://' + (_this.mailList[domain] ? _this.mailList[domain] : ('mail.' + domain)));
				return false;
			});
		},
		sendActivateMail : function() {
			var username = getQS('un');
			if (username == '') {
				return false;
			}
			$.ajax({
				url : '/index.php?c=register&m=sendActivateMail',
				data : {
					'username' : username
				},
				type : 'post',
				dataType : 'json',
				cache : 'false',
				beforeSend : function() {
				},
				error : function() {
					alert('系统繁忙，请稍后重试');
				},
				success : function(d) {
					switch (d.retCode*1) {
					case 0:
						alert(d.retMsg);
						break;
					default:
						alert(d.retMsg);
						break;
					}
				}
			});
		},
	};
});