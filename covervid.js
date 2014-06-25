var coverVid = function (elem, width, height) {

	// call sizeVideo on load
	if (window.jQuery) {
		$(document).ready(sizeVideo);
	} else {
		// Mozilla, Opera and webkit nightlies currently support this event
		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', sizeVideo);

			// If IE event model is used
		} else if (document.attachEvent) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent("onreadystatechange", function () {
				if (document.readyState === "complete") {
					document.detachEvent("onreadystatechange", arguments.callee);
					sizeVideo();
				}
			});
		} else {
			// A fallback to window.onload, that will always work
			if (el.addEventListener) {
				el.addEventListener('load', sizeVideo);
			} else {
				el.attachEvent('on' + 'load', sizeVideo);
			}
		}
	}

	// call sizeVideo on resize
	function restartOnResize(callback) {

		function debounce(fn, delay) {
			var timer = null;

			return function () {
				var context = this,
					args = arguments;

				clearTimeout(timer);

				timer = setTimeout(function () {
					fn.apply(context, args);
				}, delay);
			};
		}

		if (window.jQuery) {
			$(window).resize(debounce(callback, 50));
		} else {
			addEventListener(window, 'resize', debounce(callback, 50));
		}

	}
	restartOnResize(sizeVideo);

	// Define the attached selector
	function sizeVideo() {

		// Get parent element height and width
		var parentHeight = (window.jQuery) ? elem.parent().height() : elem.parentNode.offsetHeight;
		var parentWidth = (window.jQuery) ? elem.parent().width() : elem.parentNode.offsetWidth;

		// Get native video width and height
		var nativeWidth = width;
		var nativeHeight = height;

		// Get the scale factors
		var heightScaleFactor = parentHeight / nativeHeight;
		var widthScaleFactor = parentWidth / nativeWidth;

		// Set necessary styles to position video "center center"
		if (window.jQuery) {
			elem.css({
				'position': 'absolute',
				'top': '50%',
				'left': '50%',
				'-webkit-transform': 'translate(-50%, -50%)',
				'-moz-transform': 'translate(-50%, -50%)',
				'-ms-transform': 'translate(-50%, -50%)',
				'-o-transform': 'translate(-50%, -50%)',
				'transform': 'translate(-50%, -50%)',
			});
		} else {
			elem.style.position = 'absolute';
			elem.style.top = '50%';
			elem.style.left = '50%';
			elem.style['-webkit-transform'] = 'translate(-50%, -50%)';
			elem.style['-moz-transform'] = 'translate(-50%, -50%)';
			elem.style['-ms-transform'] = 'translate(-50%, -50%)';
			elem.style['-o-transform'] = 'translate(-50%, -50%)';
			elem.style.transform = 'translate(-50%, -50%)';
		}

		// Set overflow hidden on parent element
		if (window.jQuery) {
			elem.parent().css('overflow', 'hidden');
		} else {
			elem.parentNode.style.overflow = 'hidden';
		}

		// Based on highest scale factor set width and height
		if (widthScaleFactor > heightScaleFactor) {
			if (window.jQuery) {
				elem.css({
					'height': 'auto',
					'width': parentWidth
				});
			} else {
				elem.offsetHeight = 'auto';
				elem.offsetWidth = parentWidth;
			}
		} else {
			if (window.jQuery) {
				elem.css({
					'height': parentHeight,
					'width': 'auto'
				});
			} else {
				elem.offsetHeight = parentHeight;
				elem.offsetWidth = 'auto';
			}
		}

	}
};

if (window.jQuery) {
	jQuery.fn.extend({
		'coverVid': function () {
			coverVid(this, arguments[0], arguments[1]);
			return this;
		}
	});
}