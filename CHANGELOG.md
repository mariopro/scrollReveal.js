0.1.3
------
###### 5/26/14
- Add support for customizing starting element `opacity`. ([#33](https://github.com/julianlloyd/scrollReveal.js/pull/33))
- Implement `requestAnimationFrame`. ([#46](https://github.com/julianlloyd/scrollReveal.js/pull/46))
- Refactor the scrollReveal `styleBank`. ([#38](https://github.com/julianlloyd/scrollReveal.js/pull/38))

0.1.2
-----
###### 3/13/14
- Add support for elements with `position: fixed`. ([#35](https://github.com/julianlloyd/scrollReveal.js/pull/35))
- Revise `genCSS()` method to create less greedy styles. ([#37](https://github.com/julianlloyd/scrollReveal.js/pull/37))

0.1.1
------
###### 3/6/14
- Fixed a serious bug with `enter top` and `enter left` not correctly recognizing the pixel distance declared with the `move` keyword. ([#13](https://github.com/julianlloyd/scrollReveal.js/issues/13), [#31](https://github.com/julianlloyd/scrollReveal.js/issues/31))

0.1.0
------
###### 3/5/14
- scrollReveal.js now has a `dist` folder containing the AMD/CommonJS compatibile library.
- [Gulp](http://gulpjs.com/) has been integrated, facilitating the build process.
- Basic testing using [Testling](https://ci.testling.com/) has been put in place. *(Anyone care to take this further?)*

### Breaking Change

- ~~scrollReveal is now implemented using the `data-scroll-reveal` attribute, **NOT** `data-scrollReveal`.~~ (Updated again in [0.2.0](https://github.com/julianlloyd/scrollReveal.js/blob/master/CHANGELOG.md#v020))

0.0.4
------
###### 2/28/14
- scrollReveal no longer destroys the existing `style` attribute on revealed elements, but instead, now appends the necessary reveal animation styles after any existing styles. ([#18](https://github.com/julianlloyd/scrollReveal.js/issues/13))

>**Note:** scrollReveal will still override any existing transition or transform in the `style` attribute.

0.0.3
-----
###### 2/22/14
- Removed unnecessary styles (with `-moz-` & `-o-`) from css transitions & transforms
- Added top-line comment, intending it to be kept after minification

0.0.2
------
###### 2/13/14

### What’s New

#### Manual Instantiation
scrollReveal no longer automatically instantiates on the `DOMContentLoaded` event. It now requires that you instantiate it manually.

```html
    <!-- Everything else… -->

  <script src='{your_JavaScript_path}/scrollReveal.js'></script>
  <script>

      window.scrollReveal = new scrollReveal();

  </script>
```
#### Defaults Object

You can now pass your own starting defaults object to the scrollReveal constructor.

```html
<script>

    // The starting defaults.
    var config = {
            enter: 'bottom',
            move: '0',
            over: '0.66s',
            delay: '0s',
            easing: 'ease-in-out',
            viewportFactor: 0.33,
            reset: false,
            init: true
          };

    window.scrollReveal = new scrollReveal( config );

</script>
```
#### Replay Reveal Animations
Due to popular demand, the `reset` keyword was added. Now, you can configure your animations to replay every time they enter the viewport:

*example*:
```html
<script>
    window.scrollReveal = new scrollReveal( {reset: true} );
</script>
```

>**See it in action:** The [demo page](http://julianlloyd.me/scrollreveal) has been updated with the `reset: true` property.

#### Easing Control
Now you can replace the `move` keyword with easing keywords to control the easing of your reveal animation.

*example*:
```html
<div data-scrollReveal="after 0.33s, ease-out 24px"> Foo </div>
```
