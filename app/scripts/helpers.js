(() => {
  'use strict';

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

  // Reduces our data down to an object, with their image id's mapped to the image object.
  window.$reduceImgResponse = (data) => {
    return data.reduce((dataObject, image) => {
      dataObject[image.id] = image;
      dataObject[image.id].src = window.$createImgSource(image);
      return dataObject;
    }, {});
  };

  // Takes in an 'image' object and produces the correct source.
  window.$createImgSource = (image) => {
    return (
      `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
    );
  };

/**
 * Lodash-like utility functions, written from scratch.
 */
  window.$each = (collection, cb) => {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        cb(collection[i], i, collection);
      }
    } else {
      for (let prop in collection) {
        cb(collection[prop], prop, collection);
      }
    }
  };

  window.$map = (collection, cb) => {
    const result = [];

    window.$each(collection, (el) => {
      result.push(cb(el));
    });

    return result;
  };
})(window);
