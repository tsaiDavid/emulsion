'use strict';
(() => {
  window.qs = (selector, scope) => {
    return (scope || document).querySelector(selector);
  };

  window.$on = (target, type, callback, useCapture) => {
    target.addEventListener(type, callback, !!useCapture);
  };

  window.$parent = (element, tagName) => {
    if (!element.parentNode) {
      return;
    }
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    return window.$parent(element.parentNode, tagName);
  };

  // Takes in an 'image' object and produces the correct source.
  window.$createImgSource = (image) => {
    return (
      `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
    );
  };

  window.$addClass = (element, className) => {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ${className}';
    }
  };

  window.$removeClass = (element, className) => {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '
      );
    }
  };

  window.$renderOverlay = (imageSource) => {
    const img = window.qs('.lightbox-image');
    img.setAttribute('src', imageSource);
  };

  window.$debounce = (fn, timeout) => {
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

  window.$GET = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const data = JSON.parse(request.responseText);
        callback(data);
      } else {
        // We reached our target server, but it returned an error
      }
    };
    request.onerror = (err) => {
      console.err(err);
    };
    request.send();
  };

})(window);
