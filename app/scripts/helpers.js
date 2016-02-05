((window) => {
  'use strict';

  window

  window.$on = (target, type, callback, useCapture) => {
      target.addEventListener(type, callback, !!useCapture);
  }

  window.$parent = () => {
    if (!element.parentNode) {
      return;
    }

    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }

    return window.$parent(element.parentNode, tagName);
  };


})(window);
