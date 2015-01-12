CoverVid
========
At the core of CoverVid, is the idea of this little CSS snippet being possible...
```css
.selector {
    background-video: url('../foo/bar.mp4 || ../foo/bar.webm');
    background-size: cover;
    background-position: center center;
}
```
Why is it special?
------------------
CoverVid is very lightweight, with only 800 bytes of Javascripts. It is usable in native Javascript and jQuery. Its' logic is parent based, meaning the parent element can be any size (Not necessarily just a full-screen background).

How do I use it?
----------------
1. First pull the project down from <a href="http://github.com/stefanerickson/covervid">GitHub</a>, or install with bower running <code>bower install covervid</code> and link <code>covervid.min.js</code> into your site. Make sure it is loaded after jQuery if using it.

2. It is important to note that the video you target will use its' parent element to scale. With that in mind, we will create some simple markup and add some base styling to size the videos' parent/wrapper element.

    ```html
    <div class="covervid-wrapper">
        <video class="covervid-video" autoplay loop poster="img/video-fallback.png">
            <source src="videos/video.webm" type="video/webm">
            <source src="videos/video.mp4" type="video/mp4">
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

3. Now, we would simply call <code>coverVid(Container-Element, Video-Width, Video-Height)</code> on the video element, passing through the native dimensions of the video. If you are using jQuery, we would call <code>$('.covervid-video').coverVid(1920, 1080);</code>.
