function HiBar(code) {

	var HIBAR_CLOSED_COOKIE_NAME = 'hibar_closed_';

	$.extend(HiBar, $.eventEmitter);

	var self = this;

	//contains option values
	var options =  {};
	//contain behaviours for option values
	var optionBehaviours = [];

	//default options
	options['cookie-life'] = 365;

	//load tempate and css
	$('body').append("<style type='text/css'>" + hibar_css + "</style>");
	$('body').append(hibar_template);

	var bar = $('#hi-bar');
	var opener = $('#hi-bar-open');
	var orginalBodyMargin = $('body').css('margin-top');

	this.init = function init(message, linkText, link, _options) {

		$('#hi-bar-content', bar).html(message + '<a target="_blank" href="' + link +'">' + linkText + '</a>');

		//detect state cookie
		var hibar_closed = $.cookie(HIBAR_CLOSED_COOKIE_NAME + code) == '1';

		if(!hibar_closed) {
			self.show();
		}

		if(_options) {
			//add options if options array exists
			for(var key in _options) {
				options[key] = _options[key];
			}
		}
		applyOptions();

		return self;

	};

	this.show = function show() {

		var expireDate = new Date();
		expireDate.setTime(expireDate.getTime() - 1000);
		$.cookie(HIBAR_CLOSED_COOKIE_NAME + code, '1', {expires: expireDate, path: '/'});
		
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
		var expireDate = new Date();
		expireDate.setTime(expireDate.getTime() + 1000 * 60 * 60 * 24 * options['cookie-life']);
		$.cookie(HIBAR_CLOSED_COOKIE_NAME + code, '1', {expires: expireDate, path: '/'});

		return self;
	};

	/*
		Set options for the bar and apply the behavoiur
	*/
	this.set = function set (key, value) {
		
		options[key] = value;
		var behavoiur = optionBehaviours[key];
		if(behavoiur) {
			behavoiur();
		}
	};

	//events
	$('#hi-bar-close', bar).click(function() {

		self.close();
	});

	opener.click(function() {

		self.show();
	});

	/* OPTIONS */

	//apply all the options defined
	function applyOptions() {

		for(var key in options) {

			var behaviour = optionBehaviours[key];
			if(behaviour) {
				behaviour();
			}
		}
	}

	//define option behaviours

	/*
		To change the text appers in the open mini widget
	*/
	optionBehaviours['open-text'] = function() {
		$('#hi-bar-open').text(options['open-text']);
	};

	/*
		Add the cookie life (in days) - used to persist closed state
		no behaviour	
	*/
	optionBehaviours['cookie-life'] = null;

}