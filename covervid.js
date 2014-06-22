jQuery.fn.extend({
	coverVid: function (width, height) {

		function addEventListener(el, eventName, handler) {
			if (el.addEventListener) {
				el.addEventListener(eventName, handler);
			} else {
				el.attachEvent('on' + eventName, function () {
					handler.call(el);
				});
			}
		}

		// call sizeVideo on load
		function startOnReady(callback) {
			if (window.jQuery) {
				$(document).ready(sizeVideo);
			} else {
				// Taken from jQuery source

				// Mozilla, Opera and webkit nightlies currently support this event
				if (document.addEventListener) {
					// Use the handy event callback
					document.addEventListener("DOMContentLoaded", function () {
						document.removeEventListener("DOMContentLoaded", arguments.callee, false);
						callback;
					}, false);


					// If IE event model is used
				} else if (document.attachEvent) {
					// ensure firing before onload,
					// maybe late but safe also for iframes
					document.attachEvent("onreadystatechange", function () {
						if (document.readyState === "complete") {
							document.detachEvent("onreadystatechange", arguments.callee);
							callback;
						}
					});

					// If IE and not an iframe
					// continually check to see if the document is ready
					if (document.documentElement.doScroll && window == window.top)(function () {
						try {
							// If IE is used, use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							document.documentElement.doScroll("left");
						} catch (error) {
							setTimeout(arguments.callee, 0);
							return;
						}

						callback;
					})();
				}

				// A fallback to window.onload, that will always work
				addEventListener(window, 'load', callback);
			}
		}
		startOnReady(sizeVideo);

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
		var $this = this,
			sizeVideo = function () {

				// Get parent element height and width
				var parentHeight = $this.parent().height();
				var parentWidth = $this.parent().width();

				// Get native video width and height
				var nativeWidth = width;
				var nativeHeight = height;

				// Get the scale factors
				var heightScaleFactor = parentHeight / nativeHeight;
				var widthScaleFactor = parentWidth / nativeWidth;

				// Set necessary styles to position video "center center"
				$this.css({
					'position': 'absolute',
					'top': '50%',
					'left': '50%',
					'-webkit-transform': 'translate(-50%, -50%)',
					'-moz-transform': 'translate(-50%, -50%)',
					'-ms-transform': 'translate(-50%, -50%)',
					'-o-transform': 'translate(-50%, -50%)',
					'transform': 'translate(-50%, -50%)',
				});

				// Set overflow hidden on parent element
				$this.parent().css('overflow', 'hidden');

				// Based on highest scale factor set width and height
				if (widthScaleFactor > heightScaleFactor) {
					$this.css({
						'height': 'auto',
						'width': parentWidth
					});
				} else {
					$this.css({
						'height': parentHeight,
						'width': 'auto'
					});
				}

			}
	}
});