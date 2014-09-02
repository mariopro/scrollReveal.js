### 0.2.0
###### 9/8/14

#### What’s New

- **Start/Stop**: New `sr.start()` and `sr.stop()` methods for controlling reveal animations.
- **Scale Transforms:** New `scale up` and `scale down` keywords for animating element size during reveal animations.
- **Custom Container**: New `config.elem` allows different container element to be used. (The default is still `window.document.documentElement`.) ([#68](https://github.com/julianlloyd/scrollReveal.js/pull/68))
- **Reveal Callback**: New `config.complete` that expects a `function( elem )` to fire after complete animations. ([#71](https://github.com/julianlloyd/scrollReveal.js/pull/71))

#### Improvements
- Major refactor of how styles are generated and stored. (see `self.data`)
- Added more comments to `scrollReveal.js`.

#### Breaking Changes
- **Primary Attribute**: `scrollReveal.js` uses the (now much shorter) `data-sr` attribute for all reveal declarations.
- **scrollReveal.init()**: No longer triggers animation, but simply readies all elements in the DOM with `data-sr` attributes


### 0.1.3
###### 5/26/14

#### What’s New
- **Element Opacity**: The `opacity` member is new to the config object, allowing customization of the initial opacity of revealed elements. ([#33](https://github.com/julianlloyd/scrollReveal.js/pull/33))

- **Callback on Complete:** The `complete` member is also new to the config object, and takes a `function( domElem )` that fires on animation complete! ([#33](https://github.com/julianlloyd/scrollReveal.js/pull/71))

#### Improvements
- Implement `requestAnimationFrame`. ([#46](https://github.com/julianlloyd/scrollReveal.js/pull/46))
- Minor refactor of how styles are stored. ([#38](https://github.com/julianlloyd/scrollReveal.js/pull/38))

### 0.1.2
###### 3/13/14
#### Fixes
- Support elements with `position: fixed`. ([#35](https://github.com/julianlloyd/scrollReveal.js/pull/35))
- `genCSS()` method generates less greedy styles. ([#37](https://github.com/julianlloyd/scrollReveal.js/pull/37))

### 0.1.1
###### 3/6/14
#### Fixes
- `enter top` and `enter left` now properly recognizes pixel distance declared with the `move` keyword. ([#13](https://github.com/julianlloyd/scrollReveal.js/issues/13), [#31](https://github.com/julianlloyd/scrollReveal.js/issues/31))

### 0.1.0
###### 3/5/14
####  What’s New
- **AMD/CommonJS**: scrollReveal.js now has a `dist` folder containing AMD/CommonJS compatibile library files.
- **Gulp**: A basic [Gulp](http://gulpjs.com/) build process has been added.
- **Testling**: Basic testing using [Testling](https://ci.testling.com/) has been added.

#### Breaking Changes

- **Primary Attribute**: ~~scrollReveal.js uses the `data-scroll-reveal` attribute for all reveal declarations.~~ (See latest changes made in [0.2.0](https://github.com/julianlloyd/scrollReveal.js/blob/master/CHANGELOG.md#v020))

### 0.0.4
###### 2/28/14
#### Fixes
- scrollReveal no longer destroys the existing `style` attribute on revealed elements, but instead, now appends the necessary reveal animation styles after any existing styles. ([#18](https://github.com/julianlloyd/scrollReveal.js/issues/13))

### 0.0.3
###### 2/22/14
#### Fixes
- Removed unnecessary styles (with `-moz-` & `-o-`) from generated CSS.
- Added top-line comment, intending it to be kept after minification.

### 0.0.2
###### 2/13/14
#### What’s New
- **Manual Instantiation**: scrollReveal.js no longer automatically instantiates on the `DOMContentLoaded` event. It now requires that you instantiate it manually.
- **Defaults Object**: You can now pass a config object to the scrollReveal constructor.
- **Reset Keyword**: The `reset` keyword was added. Now, you can configure your animations to replay every time they enter the viewport.
- **Easing Control**: Now you can replace the `move` keyword with easing keywords to control the easing of your reveal animation.
