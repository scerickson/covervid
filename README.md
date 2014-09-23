CoverVid
========

Why is it special?
------------------

For starters, it makes your HTML5 video behave like a background cover image, but other plugins also do that. CoverVid is very lightweight, with only 800 bytes of Javascripts. It is usable in native Javascript and jQuery. Its' logic is parent based, meaning the parent element can be any size (Not necessarily just a full-screen background).

How do I use it?
----------------

<ol>
    <li>First pull the project down from <a href="http://github.com/stefanerickson/covervid">GitHub</a> and link <code>covervid.min.js</code> into your site. Make sure it is loaded after jQuery if using it.</li>
    <li>It is important to note that the video you target will use its' parent element to scale. With that in mind, we will create some simple markup and add some base styling to size the videos' parent/wrapper element.
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
    </li>
    <li>Now, we would simply call the <code>coverVid(Container-Element, Video-Width, Video-Height)</code> on the video element, passing through the native dimensions of the video. If you are using jQuery, we would call <code>$('.covervid-video').coverVid(1920, 1080);</code>.</li>
</ol>
