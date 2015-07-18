var dBannerList = $('#bannerList div'),
	dBannerTag = $('#bannerTag a');

function initBanners() {
	var sCurCls = 'current';
	dBannerTag.on('mouseover', function(e) {
		if (!$(this).hasClass(sCurCls)) {
			var idx = this.getAttribute('index') * 1;
			dBannerList.filter('div.current').fadeOut(function() {
				$(this).removeClass(sCurCls)
			}).end().eq(idx).fadeIn(function() {
				$(this).addClass(sCurCls);
			});

			$(this).siblings().removeClass(sCurCls).end().addClass(sCurCls);
		}
	}).eq(0).trigger('mouseover');
}

(function init() {
	initBanners();
})();