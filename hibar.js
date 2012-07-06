
var hibar_template=" <div id='hi-bar'> <div id='hi-bar-content'>This is the new alternative for hello bar <a href='#'>Download Here<a></div> <div id='hi-bar-close'>x</div> </div> <div id='hi-bar-open'> HI BAR </div> ";
/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */

(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);function makeProxy( name ) {
	return function() {
		( this._JQ || ( this._JQ = $( this ) ) )[name].apply( this._JQ, arguments );
	};
}

$.eventEmitter = {
	emit: makeProxy( "trigger" ),
	once: makeProxy( "one" ),
	on: makeProxy( "on" ),
	off: makeProxy( "off" )
};
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

}var hibar_css=" #hi-bar{position:fixed;top:0;left:0;right:0;display:none}#hi-bar-content{background-color:#EB593C;padding:8px 0 8px 0;box-shadow:0 0 5px #333;color:#fff;font-size:14px;font-family:Georgia;text-align:center}#hi-bar a{background-color:#333;color:#ddd;padding:2px 10px 2px 10px;font-size:12px;box-shadow:0 0 2px #000;border-radius:10px;font-family:Tahoma;margin-left:5px}#hi-bar a:hover{box-shadow:0 0 4px #000}#hi-bar-close{position:absolute;right:20px;top:6px;color:#fff;padding:0;font-size:20px;line-height:20px;font-family:arial;font-weight:700;cursor:pointer}#hi-bar-open{position:fixed;top:-5px;right:25px;background-color:#EB593C;padding:15px 6px 5px 6px;color:#fff;font-family:Arial;font-size:12px;font-weight:700;border:3px solid white;border-radius:3px;box-shadow:0 0 10px #ccc;cursor:pointer} ";
