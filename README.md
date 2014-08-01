CoverVid
========

Make your HTML5 video behave like a background cover image. This is a native JS fork of the original jQuery plugin. It works with both normal and jquery api calls.

Very simple to use, just follow these few steps...

Load <code>covervid.min.js</code> (after jQuery if using it).
```html
<script src="covervid.min.js"></script>
 ```
 
It is important to note that the video you target will use its' parent element to scale. With that in mind, we will create some simple markup and add some base styling to size the videos' parent/wrapper element.
```html
<div class="covervid-wrapper">
    <video class="covervid-video" autoplay loop poster="img/video-fallback.png">
        <source src="videos/clouds.webm" type="video/webm">
        <source src="videos/clouds.mp4" type="video/mp4">
    </video>
</div>
 ```
 ```css
.covervid-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
 ```
Now, we simply call the <code>coverVid(Element, Video-Width, Video-Height)</code> function on the video element, passing through the native dimensions of the video.
```javascript
coverVid(document.querySelector('.covervid-video'), 1920, 1080);

// or, if using jQuery

$('.covervid-video').coverVid(1920, 1080);
 ```
