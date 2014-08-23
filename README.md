#scrollReveal.js
[![scrollReveal version](https://badge.fury.io/gh/julianlloyd%2FscrollReveal.js.png)](http://badge.fury.io/gh/julianlloyd%2FscrollReveal.js)

### Easily reveal elements as they enter the viewport.

 - Developed for modern browsers
 - **Only 4.1 KB** minified
 - Made with ♥ by [Julian Lloyd](https://twitter.com/julianlloyd)

### **[See it in action!](http://scrollrevealjs.org/)**
What’s new? See the **[Change Log](https://github.com/julianlloyd/scrollReveal.js/blob/master/CHANGELOG.md)**
<br><br><br><br>
Installation
------------

Download and unzip [master.zip](https://github.com/julianlloyd/scrollReveal.js/archive/master.zip) and copy `scrollReveal.min.js` into your JavaScript directory. Include the file in your project, and instantiate a new scrollReveal object.

*Example:*
```html
  <script src='/js/scrollReveal.min.js'></script>
  <script>

      window.scrollReveal = new scrollReveal();

  </script>
</body>
```

#### Alternate Methods
- GitHub — `git clone https://github.com/julianlloyd/scrollReveal.js.git`
- Bower — `bower install scrollReveal.js`
<br><br><br><br>

Basic Usage
-----------

Just add a `data-scroll-reveal` attribute to your element(s), and scrollReveal.js will automatically reveal them as they enter the viewport.

*Example:*
```html
<!-- Using scrollReveal.js with defaults: -->
<div data-scroll-reveal> Hello world! </div>
```

**But wait…** It’s more fun if you define your own reveal animations, which you can do using using natural, declarative language.

*Example:*
```html
<!-- Reveal using custom parameters: -->
<div data-scroll-reveal="enter left and move 50px over 1.33s"> Foo </div>
<div data-scroll-reveal="enter from the bottom after 1s"> Bar </div>
<div data-scroll-reveal="wait 2.5s and then ease-in-out 100px"> Baz </div>
```
What you enter into the `data-scroll-reveal` attribute is parsed for specific words:

- **keywords** that expect to be followed by a **value**.
- **fillers** as natural language sugar. (optional)

These are detailed in the next section.
<br><br><br><br>
Getting Started
---------------
#### Keywords and Values
<br><br>
**keyword:** `enter` — Controls the vector origin of your animation.<br>
**value:** `top` | `right` | `bottom` | `left`<br><br>
*Example:*
```html
<!-- Reveal your element with a downward motion: -->
<div data-scroll-reveal='enter top'> Foo </div>
```
<br><br><br><br>
**keyword:** `move` — Controls the distance your element moves during animation.<br>
**value:** [ integer ]px.

*Example:*
```html
<div data-scroll-reveal='move 24px'> Bar </div>
```
<br><br><br><br>
**keyword:** `over` — Controls the duration of your animation.<br>
**value:** [ decimal ]s


*Example:*
```html
<div data-scroll-reveal='over 1.66s'> Baz </div>
```
<br><br><br><br>
**keyword:** `after/wait` — Controls the delay before your animation begins.<br>
**value:** [ decimal ]s


*Example:*
```html
<!-- Both are accepted: -->
<div data-scroll-reveal='after 0.33s'> Mel </div>
<div data-scroll-reveal='wait 0.33s'> Mel </div>
```
<br><br><br><br>

#### Combining Keyword/Value Pairs
Next, by combining the above options, you can create dynamic reveal animation effects.

*Example:*
```html
<div data-scroll-reveal='enter top move 50px'> Foo </div>
<div data-scroll-reveal='enter top move 50px after 0.3s'> Bar </div>
<div data-scroll-reveal='enter top move 50px after 0.6s'> Baz </div>
<div data-scroll-reveal='enter top move 50px after 0.9s'> Mel </div>
```
<br><br><br><br>
#### Fillers (optional)
You can use conjoining filler words for more readable language.

- `from`
- `the`
- `and`
- `then`
- `but`
- `with`
- `,`

*Example*:
```html
<!-- These 4 lines are equivalent: -->
<div data-scroll-reveal='wait 0.3s, then enter left and move 40px over 2s'> Foo </div>
<div data-scroll-reveal='enter from the left after 0.3s, move 40px, over 2s'> Bar </div>
<div data-scroll-reveal='enter left move 40px over 2s after 0.3s'> Baz </div>
<div data-scroll-reveal='enter left, move 40px, over 2s, wait 0.3s'> Mel </div>

```
<br><br><br><br>
Advanced Usage
--------------
#### Custom defaults
You can pass an object to the constructor with your desired default configuration.
```html
  <script src='js/scrollReveal.min.js'></script>
  <script>

    var config = {
        after: '0s',
        enter: 'bottom',
        move: '24px',
        over: '0.66s',
        easing: 'ease-in-out',
        viewportFactor: 0.33,
        reset: false,
        init: true
    };

    window.scrollReveal = new scrollReveal( config );

  </script>
</body>
```
>**Tip:** The config object above shows the actual scrollReveal default values.

<br><br><br><br>

#### Controlling The First Reveal

The `scrollReveal.init()` method checks the DOM for all elements with `data-scroll-reveal` attributes, and initializes their reveal animations. By default, this method fires on instantiation, but by amending our config object with `init: false`, one can then call `scrollReveal.init()` as desired.

*Example:*
```html
  <script src='js/scrollReveal.min.js'></script>
  <script>

     window.scrollReveal = new scrollReveal( { init: false } );

    // Here you might load another library, or query an API...
    // Now we initialize scrollReveal:

     scrollReveal.init();

  </script>
</body>
```
>**Tip:** You can call `scrollReveal.init()` more than once, to re-check the DOM.

<br><br><br><br>

#### Viewport Factor
If set to **0**, the element is considered in the viewport as soon as it enters.<br>
If set to **1**, the element is considered in the viewport when it is fully visible.

*Example:*
```javascript
    var config = {
      viewportFactor: 0.33
    };

    // Your reveal animation triggers after 33% of
    // your element is visible within the viewport.
```
<br><br><br><br>
#### Replaying Animations
Using the `reset` keyword makes elements disappear when out of view view, and reveal each time they come into view.

*Example:*
```html
<div data-scroll-reveal="reset"> Foo </div>
```
>**Note:** This is not a keyword–value pair, `reset` is a uniquely solitary keyword.

<br><br><br><br>
#### Controlling Easing
The `move` keyword can be replaced with any one of the following:

- `ease`
- `ease-in`
- `ease-out`
- `ease-in-out`

*Example:*
```html
<div data-scroll-reveal="after 2s, ease-in 32px and reset over .66s"> Foo </div>
```
<br><br><br><br>

Contributions
-------------
Community feedback and involvement is highly encouraged. (See [Open Issues](https://github.com/julianlloyd/scrollReveal.js/issues?state=open).)
#### Special Thanks
scrollReveal.js was inspired by the awesome [cbpScroller.js](http://tympanus.net/codrops/2013/07/18/on-scroll-effect-layout/) by [Mary Lou](https://twitter.com/crnacura). Copyright © 2014 [Codrops](http://tympanus.net/codrops/).

License
-------

The MIT License (MIT)

Copyright © 2014 [Julian Lloyd](https://twitter.com/julianlloyd)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.