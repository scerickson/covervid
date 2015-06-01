var coverVid = function (elem, onElementResize, width, height) {
	// Set default arguments if not passed.
	if (typeof(onElementResize) === true) {
		onElementResize = true;
	} else {
		onElementResize = false;
	}

	// Call sizeVideo on load.
	document.addEventListener('DOMContentLoaded', sizeVideo);

	// Call sizeVideo on "element resize" if turned on.
	if (onElementResize) {
		addRatioWatcher(elem, 350);
	} else {
		//Default to calling sizeVideo on resize.
		window.onresize = function () {
			throttle(sizeVideo(), 50);
		};
	}

	// Set necessary styles to position video "like cover".
	elem.style.position = 'absolute';
	elem.style.top = '50%';
	elem.style.left = '50%';
	elem.style['-webkit-transform'] = 'translate(-50%, -50%)';
	elem.style['-ms-transform'] = 'translate(-50%, -50%)';
	elem.style.transform = 'translate(-50%, -50%)';

	// Set overflow hidden on parent element.
	elem.parentNode.style.overflow = 'hidden';

	// Throttle for resize function.
	var throttle = function(fn, threshhold, scope) {
	  if(threshhold === undefined) {
	    threshhold = 250;
	  }
	  var last,
	      deferTimer;
	  return function () {
	    var context = scope || this;

	    var now = +new Date(),
	        args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	};

	// Define the attached selector.
	var sizeVideo = function() {
		// Get parent element height and width.
		var parentHeight = elem.parentNode.offsetHeight;
		var parentWidth = elem.parentNode.offsetWidth;

		// Get native video width and height.
		var nativeWidth = width;
		var nativeHeight = height;

		// Get the scale factors.
		var heightScaleFactor = parentHeight / nativeHeight;
		var widthScaleFactor = parentWidth / nativeWidth;

		// Based on highest scale factor set width and height.
		if (widthScaleFactor > heightScaleFactor) {
			elem.style.height = 'auto';
			elem.style.width = parentWidth+'px';
		} else {
			elem.style.height = parentHeight+'px';
			elem.style.width = 'auto';
		}
	};

	/**
	 * Get the elements outer width
	 * including margin.
	 */
	function outerWidth(el) {
	  var width = el.offsetWidth;
	  var style = getComputedStyle(el);

	  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
	  return width;
	}

	/**
	 * Get the elements outer height
	 * including margin.
	 */
	var outerHeight = function(el) {
	  var height = el.offsetHeight;
	  var style = getComputedStyle(el);

	  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
	  return height;
	};

	/**
	 * Attaches a seasonally triggered watcher
	 * to the element that wraps the video. If
	 * the outer width / height changes it
	 * triggers the video resizing.
	 */
	var addRatioWatcher = function(elem, frequency) {
		var last_height = 0,
				last_width = 0,
				new_width = outerWidth(elem),
				new_height = outerHeight(elem);
		var id = window.setInterval(function() {
			if (new_width !== last_width || new_height !== last_height) {
				sizeVideo();
				last_height = new_height;
				last_width = new_width;
			}
		}, frequency);
	};

};

if (window.jQuery) {
	jQuery.fn.extend({
		'coverVid': function () {
			coverVid(this[0], this[1], arguments[0], arguments[1]);
			return this;
		}
	});
}
