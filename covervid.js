var coverVid = function (elem, width, height) {

	// call sizeVideo on load

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

		addEventListener(window, 'resize', debounce(callback, 50));

	}
	restartOnResize(sizeVideo);

	// Define the attached selector
	function sizeVideo() {

		// Get parent element height and width
		var parentHeight = elem.parentNode.offsetHeight;
		var parentWidth = elem.parentNode.offsetWidth;

		// Get native video width and height
		var nativeWidth = width;
		var nativeHeight = height;

		// Get the scale factors
		var heightScaleFactor = parentHeight / nativeHeight;
		var widthScaleFactor = parentWidth / nativeWidth;

		// Set necessary styles to position video "center center"
		elem.style.position = 'absolute';
		elem.style.top = '50%';
		elem.style.left = '50%';
		elem.style['-webkit-transform'] = 'translate(-50%, -50%)';
		elem.style['-moz-transform'] = 'translate(-50%, -50%)';
		elem.style['-ms-transform'] = 'translate(-50%, -50%)';
		elem.style['-o-transform'] = 'translate(-50%, -50%)';
		elem.style.transform = 'translate(-50%, -50%)';

		// Set overflow hidden on parent element
		elem.parentNode.style.overflow = 'hidden';

		// Based on highest scale factor set width and height
		if (widthScaleFactor > heightScaleFactor) {

			elem.offsetHeight = 'auto';
			elem.offsetWidth = parentWidth;

		} else {

			elem.offsetHeight = parentHeight;
			elem.offsetWidth = 'auto';

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