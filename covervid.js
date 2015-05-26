var coverVid = function (elem, width, height) {

	// call sizeVideo on load
	document.addEventListener('DOMContentLoaded', sizeVideo);

	// throttle for resize function
	function throttle(fn, threshhold, scope) {
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
	}

	// call sizeVideo on resize
	window.onresize = function () {
		throttle(sizeVideo(), 50);
	};

	// Set necessary styles to position video "center center"
	elem.style.position = 'absolute';
	elem.style.top = '50%';
	elem.style.left = '50%';
	elem.style['-webkit-transform'] = 'translate(-50%, -50%)';
	elem.style['-ms-transform'] = 'translate(-50%, -50%)';
	elem.style.transform = 'translate(-50%, -50%)';

	// Set overflow hidden on parent element
	elem.parentNode.style.overflow = 'hidden';


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

		// Based on highest scale factor set width and height
		if (widthScaleFactor > heightScaleFactor) {
			elem.style.height = 'auto';
			elem.style.width = parentWidth+'px';
		} else {
			elem.style.height = parentHeight+'px';
			elem.style.width = 'auto';
		}

	}
};

if (window.jQuery) {
	jQuery.fn.extend({
		'coverVid': function () {
			coverVid(this[0], arguments[0], arguments[1]);
			return this;
		}
	});
}
