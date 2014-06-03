CoverVid
========

Make your HTML5 video behave like a background cover image with a simple jQuery extension. Very simple to use, just follow these few steps...

Drop the <code>covervid.min.js</code> file into your javascript folder and load it after jQuery.
```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
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
Now, we simply call the <code>coverVid()</code> function on the video element, passing through the native dimensions of the video.
```javascript
$('.covervid-video').coverVid(1920, 1080);
 ```
