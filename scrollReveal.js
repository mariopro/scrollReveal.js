/*
                       _ _ _____                      _   _
                      | | |  __ \                    | | (_)
    ___  ___ _ __ ___ | | | |__) |_____   _____  __ _| |  _ ___
   / __|/ __| '__/ _ \| | |  _  // _ \ \ / / _ \/ _` | | | / __|
   \__ \ (__| | | (_) | | | | \ \  __/\ V /  __/ (_| | |_| \__ \
   |___/\___|_|  \___/|_|_|_|  \_\___| \_/ \___|\__,_|_(_) |___/ v.0.2.0
                                                        _/ |
                                                       |__/

    "Declarative on-scroll reveal animations."

============================================================================*/

/**
 * scrollReveal.js v0.2.0 (c) 2014 Julian Lloyd
 *
 * Inspired by cbpScroller.js (c) 2014 Codrops
 *
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */

window.scrollReveal = (function( window ) {

  'use strict';

var requestAnimFrame,
    isMobile,
    bankId,
    self;

  /**
   * RequestAnimationFrame polyfill
   * @function
   * @private
   */
  requestAnimFrame = (function () {
    return window.requestAnimationFrame        ||
           window.webkitRequestAnimationFrame  ||
           window.mozRequestAnimationFrame     ||

          function( callback ) {
            window.setTimeout( callback, 1000 / 60 );
          };
  }());

  function scrollReveal( userConfig ) {

      self = this;
      self.docElem = window.document.documentElement;

      /**
       * prepare the style bank
       */
      bankId = 1;
      self.bank = {};

      /**
       * build the config object
       */
      self.config = self._extend( self.defaults, userConfig );

      /**
       * check for a mobile browsers, and pull the plug if on
       * on a mobile device and config.mobile set to false
       */
      self.isMobile = self.checkMobile();
      if ( self.isMobile && !self.config.mobile ) { return }; /* Goodbye… */
      /**
       * otherwise, get things moving
       */
      if ( self.config.run == true ) self.run();
  }

  scrollReveal.prototype = {

    defaults: {

      after:  '0s',     /* delay    */
      enter:  'top',    /* vector   */
      move:   '0',      /* distance */
      over:   '0.5s',   /* duration */

      easing: 'ease-out',
      opacity: 0,

      /**
       * true, enables scrollReveal on mobile devices
       * false, disabled scrollReveal on mobile devices
       */
      mobile: false,

      /**
       * 1, the element is considered in the viewport when it's fully visible
       * 0, the element is considered in the viewport as soon as it enters
       */
      viewportFactor: 0.33,

      /**
       * true, animations occur each time an element enters the viewport
       * false, animations occur only once
       */
      reset: false,

      /**
       * true, init() is called during instantiation
       * false, init() must be called manually
       */
      run: true
    },

    /**
     * the init() method is what kicks everything into motion. If you‘re looking to
     * use other JavaScript libraries with scrollReveal, especially ones that manipulate
     * the DOM, manually calling the init() method will allow you to capture and prepare
     * any new elements (ie. from a template, or AJAX) for scrollReveal animation.
     */
    run: function() {

      self.eventBlocked = false;
      self.elems = Array.prototype.slice.call( self.docElem.querySelectorAll( '[data-scroll-reveal]' ) );
      self._updateBank();

      window.addEventListener( 'scroll', self._eventHandler, false );
      window.addEventListener( 'resize', self._eventHandler, false );

      self._updatePage();
    },

    _eventHandler: function( e ) {
      if ( !self.eventBlocked ) {
        self.eventBlocked = true;
        requestAnimFrame(function() {
          self._updatePage();
        });
      }
    },

    /**
     * _updateBank() goes through all scrollReveal elements, and captures
     * the values of any existing style attributes. Storing these values in turn
     * allows control over CSS specificity, without destroying existing styles.
     */
    _updateBank: function() {

      var id;

      self.elems.forEach( function( el, i ) {
        id = self._getBankId( el );
        /**
         * if no id found, assign a new one
         */
        if ( !id ) {
          id = bankId++;
          el.setAttribute( 'data-sr-style-id', id );
        }
        /**
         * confirm entry in style bank
         */
        if ( !self.bank[ id ] ) {
          self.bank[ id ] = { style: el.getAttribute( 'style' ), reset: self.config.reset };
        }
      });
    },

    _getBankId: function( el ) {
      return el.getAttribute( 'data-sr-style-id' );
    },

    /**
     * _updatePage() is the primary event callback, and is a wrapper
     * for the _update() method, which handles most of the heavy lifting.
     */
    _updatePage: function() {

        self.elems.forEach(function( el, i ) {
          self._update( el );
        });
        self.eventBlocked = false;
    },

    _filter: function( words ) {

      var filtered  = [],
          blacklist = [];

      blacklist = [
        "from",
        "the",
        "and",
        "then",
        "but",
        "with"
      ];

      /**
       * check each word in the array
       * if the value is found in the blacklist, skip it
       * otherwise, add the word to a new array to be returned
       */
      words.forEach(function( word, i ) {
        if ( blacklist.indexOf( word ) > -1 ) { return; }
        filtered.push( word );
      });

      return filtered;
    },

    _parse: function( el ) {

      var words  = el.getAttribute('data-scroll-reveal').split(/[, ]+/),
          parsed = {};

      words = self._filter( words );

      words.forEach(function( word, i ) {

        switch ( word ) {
          case "enter":
            parsed.enter = words[ i + 1 ];
            return;

          case "after":
            parsed.after = words[ i + 1 ];
            return;

          case "wait":
            parsed.after = words[i + 1];
            return;

          case "move":
            parsed.move = words[i + 1];
            return;

          case "ease":
            parsed.move = words[i + 1];
            parsed.ease = "ease";
            return;

          case "ease-in":
            parsed.move = words[i + 1];
            parsed.easing = "ease-in";
            return;

          case "ease-in-out":
            parsed.move = words[i + 1];
            parsed.easing = "ease-in-out";
            return;

          case "ease-out":
            parsed.move = words[i + 1];
            parsed.easing = "ease-out";
            return;

          case "over":
            parsed.over = words[i + 1];
            return;

          case "reset":
            self.bank[ self._getBankId( el ) ].reset = true;
            return;

          default:
            return;
        }
      });

      return parsed;
    },

    _update: function( el ) {

      var css,
          bank;

      /**
       * retrive styles from style bank, or set to empty string
       */
      bank = self.bank[ el.getAttribute( 'data-sr-style-id' ) ];
      if ( bank.style != null ) bank.style += ';'; else bank.style = '';

      css = self._genCSS( el ); /* build the animation styles */

      if ( !el.getAttribute( 'data-sr-initialized' ) ) {
        el.setAttribute( 'style', bank.style + css.initial );
        el.setAttribute( 'data-sr-initialized', true );
      }

      if ( !self.isElementInViewport( el, self.config.viewportFactor ) ) {
        if ( self.config.reset || bank.reset ) {
          el.setAttribute( 'style', bank.style + css.initial + css.reset );
        }
        return;
      }

      if ( self.isElementInViewport( el, self.config.viewportFactor ) ) {
        el.setAttribute( 'style', bank.style + css.target + css.transition );
    //  Without reset enabled, we can safely remove the style tag
    //  to prevent CSS specificy wars with authored CSS.
        if ( !self.config.reset || !bank.reset ) {
          setTimeout(function () {
            if ( bank.style != '' ) {
              el.setAttribute( 'style', bank.style );
            } else {
              el.removeAttribute( 'style' );
            }
          }, css.totalDuration );
        }
      return;
      }
    },

    _genCSS: function( el ) {

      var parsed,
          enter,
          axis,
          dist,
          dur,
          delay,
          easing,
          opacity,

          transition,
          reset,
          initial,
          target;

      parsed = self._parse( el );

      /**
       * convert the vector origin to a CSS-friendly axis
       */
      if ( parsed.enter ) {

        if ( parsed.enter == 'top' || parsed.enter == 'bottom' ) {
          enter = parsed.enter;
          axis = 'y';
        }

        if ( parsed.enter == 'left' || parsed.enter == 'right' ) {
          enter = parsed.enter;
          axis = 'x';
        }

      } else {

        if ( self.config.enter == 'top' || self.config.enter == 'bottom' ) {
          enter = self.config.enter
          axis = 'y';
        }

        if ( self.config.enter == 'left' || self.config.enter == 'right' ) {
          enter = self.config.enter
          axis = 'x';
        }
      }

      /**
       * after all values are parsed, let’s make sure our our
       * pixel distance is negative for top and left entrances.
       *
       * ie. "move 25px from top" starts at 'top: -25px' in CSS.
       */
      if (enter == "top" || enter == "left") {
        if (parsed.move) {
          parsed.move = "-" + parsed.move;
        }
        else {
          parsed.move = "-" + self.config.move;
        }
      }


      /**
       * assign values to CSS variables
       */
      dist    = parsed.move     || self.config.move;
      dur     = parsed.over     || self.config.over;
      delay   = parsed.after    || self.config.after;
      easing  = parsed.easing   || self.config.easing;
      opacity = parsed.opacity  || self.config.opacity;

      /**
       * Want to disable delay on mobile devices? It might provide a better
       * UX considering the animations are paused during scroll…
       */
      //if ( self.isMobile && self.config.mobile ) { delay = 0; }

      transition = '-webkit-transition: -webkit-transform ' + dur + ' ' + easing + ' ' + delay + ',  opacity ' + dur + ' ' + easing + ' ' + delay + ';' +
                               'transition: transform ' + dur + ' ' + easing + ' ' + delay + ', opacity ' + dur + ' ' + easing + ' ' + delay + ';' +
                      '-webkit-perspective: 1000;' +
              '-webkit-backface-visibility: hidden;';
      /**
       * The same as `transition` above, but with the delay removed for reset animations
       */
      reset = '-webkit-transition: -webkit-transform ' + dur + ' ' + easing + ' 0s,  opacity ' + dur + ' ' + easing + ' ' + delay + ';' +
                          'transition: transform ' + dur + ' ' + easing + ' 0s,  opacity ' + dur + ' ' + easing + ' ' + delay + ';' +
                 '-webkit-perspective: 1000;' +
         '-webkit-backface-visibility: hidden;';


      initial = '-webkit-transform: translate' + axis + '(' + dist + ');' +
                          'transform: translate' + axis + '(' + dist + ');' +
                            'opacity: ' + opacity + ';';

      target = '-webkit-transform: translate' + axis + '(0);' +
                         'transform: translate' + axis + '(0);' +
                           'opacity: 1;';
      return {
        transition: transition,
        initial: initial,
        target: target,
        reset: reset,
        totalDuration: ((parseFloat(dur) + parseFloat(delay)) * 1000)
      };
    },

    getViewportH: function() {
      var client = self.docElem['clientHeight'],
        inner = window['innerHeight'];

      return (client < inner) ? inner : client;
    },

    getOffset: function( el ) {

      var offsetTop = 0,
          offsetLeft = 0;

      do {
        if ( !isNaN( el.offsetTop ) ) {
          offsetTop += el.offsetTop;
        }
        if ( !isNaN( el.offsetLeft ) ) {
          offsetLeft += el.offsetLeft;
        }
      } while ( el = el.offsetParent )

      return {
        top: offsetTop,
        left: offsetLeft
      }
    },

    isElementInViewport: function( el, h ) {
      var scrolled = window.pageYOffset,
          viewed = scrolled + self.getViewportH(),
          elH = el.offsetHeight,
          elTop = self.getOffset( el ).top,
          elBottom = elTop + elH,
          h = h || 0;

      return ( elTop + elH * h ) <= viewed
          && ( elBottom ) >= scrolled
          || ( el.currentStyle? el.currentStyle : window.getComputedStyle( el, null ) ).position == 'fixed';
    },

    _extend: function( a, b ){
      for ( var key in b ) {
        if ( b.hasOwnProperty( key ) ) {
          a[ key ] = b[ key ];
        }
      }
      return a;
    },

    checkMobile: function() {

      var result = false;

      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))result = true})(navigator.userAgent||navigator.vendor||window.opera);

      return result;
    },
  }; // end scrollReveal.prototype

  return scrollReveal;
})( window );
