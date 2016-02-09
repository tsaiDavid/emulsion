'use strict';

/**
 * Our helper functions are namespaced under "$EmulsionHelpers".
 * When we want to use them in other modules, we simply 'require'
 * them by invoking them! This way, we are not polluting the window
 * object.
 */
const $EmulsionHelpers = () => {
  /** Use this method to select an element, it's a 'query selector' */
  const qs = (selector, scope) => {
    return (scope || document).querySelector(selector);
  };

  /** Use this method to attach event listeners and pass in callbacks */
  const on = (target, type, callback, useCapture) => {
    target.addEventListener(type, callback, !!useCapture);
  };

  /** Given DOM element, return its parent */
  const parent = (element, tagName) => {
    if (!element.parentNode) {
      return;
    }
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    return parent(element.parentNode, tagName);
  };

  /** Given DOM element, add a class name */
  const addClass = (element, className) => {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ${className}';
    }
  };

  /** Given DOM element, remove a class name */
  const removeClass = (element, className) => {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '
      );
    }
  };

  /**
   * Function performs a GET, AJAX request. Due to the async nature,
   * we need to leverage callbacks. Another option would be to use Promises,
   * but this is a classic technique. Browsers like Chrome allow us to use
   * the new, sexy Fetch API... I'll keep dreaming for a brighter day!
   * 
   * @param  {String}   url       - Location where we will make our request - Flickr's API
   * @param  {Function} callback  - Callback to be used once data has been received
   */
  const GET = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
        callback(data);
      } else {
        console.err("Error: Reached target server, but returned error.")
      }
    };
    request.onerror = (err) => {
      console.err(err);
    };
    request.send();
  };

  /**
   * Creates a source from an image object (that we get from state, request, etc).
   * Leverages ES6's magical string interpolation for greater readability!
   * 
   * @param  {Object} image  - Image object with properties needed to meet Flickr's source
   * @return {String}        - Source URL string
   */
  const createImgSource = (image) => {
    return (
      `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
    );
  };

  /**
   * Renders an image within the overlay/lightbox.
   * 
   * @param  {String} imageSource - String is the image source (URL)
   */
  const renderOverlay = (imageSource) => {
    const img = qs('.lightbox-image');
    img.setAttribute('src', imageSource);
  };

  /**
   * Debounce a given function - written in advance for usage with
   * user clicking too many times. It's an alternative, or type of 'throttle'.
   * 
   * @param  {Function} fn       - Function to be debounced
   * @param  {Integer}  timeout  - Time in ms for the function to be debounced
   * @return {Function}          - Returns a debounced function thanks to JS closure
   */
  const debounce = (fn, timeout) => {
    let timer = null;
    return function debounced() {
      const context = this;
      const args = arguments;

      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, timeout);
    };
  };

  /**
   * Creates a new custom event 'stateChange' - used by Emulsion App
   * to handle top-level state management and UI updates.
   * 
   * @param  {String}   action   - Action type described here, used in switch statement
   * @param  {Function} callback - Optional callback that can be utilized at the top level
   * @return {CustomEvent}       - CustomEvent that can be 'heard' by our App
   */
  const stateEvent = (action, callback) => {
    const app = window.Emulsion;

    return new CustomEvent(
      'stateChange',
      {
        detail: {
          action,
          callback,
          state: app.getState(),
          time: new Date()
        },
        bubbles: true,
        cancelable: true
      }
    );
  };

  /** Below functions are used to toggle classes on our overlay */
  const enableLeft = () => {
    removeClass(qs('.overlay-left'), 'is-disabled');
  };

  const disableLeft = () => {
    addClass(qs('.overlay-left'), 'is-disabled');
  };

  const enableRight = () => {
    removeClass(qs('.overlay-right'), 'is-disabled');
  };

  const disableRight = () => {
    addClass(qs('.overlay-right'), 'is-disabled');
  };

  /** 
   * Methods to be exposed when the helpers function is invoked.
   */
  return {
    qs,
    on,
    parent,
    addClass,
    removeClass,
    GET,
    createImgSource,
    renderOverlay,
    debounce,
    stateEvent,
    enableLeft,
    disableLeft,
    enableRight,
    disableRight
  }
};
