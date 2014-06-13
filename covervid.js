jQuery.fn.extend({
    coverVid: function(width, height) {

        // Call sizeVideo() on load and resize
        $(document).ready(sizeVideo);
        $(window).resize(sizeVideo);

        // Define the attached selector
        var $this = this;

        function sizeVideo() {

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
            if(widthScaleFactor > heightScaleFactor) {
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
