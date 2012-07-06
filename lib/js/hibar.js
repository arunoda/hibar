function HiBar(code) {

	var HIBAR_CLOSED_COOKIE_NAME = 'hibar_closed_';

	$.extend(HiBar, $.eventEmitter);

	var self = this;
	var options =  {};

	//load tempate and css
	$('body').append("<style type='text/css'>" + hibar_css + "</style>");
	$('body').append(hibar_template);

	var bar = $('#hi-bar');
	var opener = $('#hi-bar-open');
	var orginalBodyMargin = $('body').css('margin-top');;

	this.init = function init(message, linkText, link, _options) {

		options = _options || options;

		$('#hi-bar-content', bar).html(message + '<a target="_blank" href="' + link +'">' + linkText + '</a>');

		//detect state cookie
		var hibar_closed = $.cookie(HIBAR_CLOSED_COOKIE_NAME + code) == '1';

		if(!hibar_closed) {
			self.show();
		}

		//applying options
		if(options['open-text']) {
			$('#hi-bar-open').text(options['open-text']);
		}

		return self;

	};

	this.show = function show() {

		$.cookie(HIBAR_CLOSED_COOKIE_NAME + code, '1', {expires: -1, path: '/'});
		opener.slideUp('fast', function() {
			$('body').animate({'margin-top': bar.height() - 10});
			bar.slideDown();
		});

		return self;
	};

	this.close = function close() {

		$('body').animate({'margin-top': orginalBodyMargin});
		bar.slideUp(function() {
			opener.slideDown('fast');
		});

		//add the cookie
		$.cookie(HIBAR_CLOSED_COOKIE_NAME + code, '1', {expires: 365, path: '/'});

		return self;
	};

	//events
	$('#hi-bar-close', bar).click(function() {

		self.close();
	});

	opener.click(function() {

		self.show();
	});

}