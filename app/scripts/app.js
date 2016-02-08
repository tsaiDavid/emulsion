'use strict';

const Emulsion = (() => {
  const state = {
    modalOpen: false,
    images: null,
    lightbox: null,
    currFilmType: 'ektar',
    currFilmIndex: '0',
    availFilmTypes: ['ektar', 'portra', 'tri-x', 'superia', 'velvia']
  };

  /** Exposing 'Grid' in our application **/
  const grid = window.Grid();

  /**
   * Given a key and a new value, update the app state and invoke a callback -
   * only if one is provided.
   * @param  {String}   key      - state key
   * @param  {Anything} value    - value associated with state key
   * @param  {Function} callback - callback to be optionally invoked
   */
  const setState = (key, value, callback) => {
    state[key] = value;
    if (callback !== undefined) {
      callback(value);
    }
  };

  /**
   * Returns the state object, and optionally - if provided a key, its value.
   * @param  {String} key    - optional key, passed to retrieve specific value.
   * @return {Object} state  - app state object, or specific value.
   */
  const getState = (key) => {
    if (key === undefined) {
      return state;
    }
    return state[key];
  };

  /**
   * Loads and renders the image grid - after fetching data from Flickr.
   */
  const loadImages = () => {
    grid.fetchImages(state.currFilmType, (data) => {
      setState('images', grid.mapImages(data.photos.photo), () => {
        grid.renderImages(state.images);
      });
    });
  };

  /**
   * Render function can only be triggered by application.
   */
  const render = () => {
    window.qs('#current-film').innerHTML = state.currFilmType;
  };

  /**
   * Based on current film type, you advance to the next one in the array,
   * and it will execute a callback with that in mind.
   */
  const nextFilmType = () => {
    let nextVal = null;
    let nextIndex = 0;

    if (state.availFilmTypes[state.currFilmIndex + 1] !== undefined) {
      nextVal = state.availFilmTypes[state.currFilmIndex + 1];
      nextIndex = state.currFilmIndex + 1;
    } else {
      nextVal = state.availFilmTypes[nextIndex];
    }

    setState('currFilmType', nextVal);
    setState('currFilmIndex', nextIndex, () => {
      loadImages();
      grid.renderImages(state.images);
      render();
    });
  };

  /**
   * Carries out state changes on the 'lightbox' property in our app state.
   * This dictates which image is loaded up in our overlay/lightbox - evaluated
   * by action types. This method is called by our app's custom event listener.
   * @param  {String} imageId   - string representing image's id
   * @param  {String} action    - string representing action type
   */
  const setLightbox = (imageId, action) => {
    const index = getState('images').reduce((result, image, i) => {
      if (image.id === imageId) { return i; }
      if (result !== null) { return result; }
    }, null);

    switch (action) {
      case 'prevImage':
        setState('lightbox', (getState('lightbox') - 1));
        break;
      case 'nextImage':
        setState('lightbox', (getState('lightbox') + 1));
        break;
      case 'openModal':
        setState('lightbox', index);
        break;
      case 'closeModal':
        setState('lightbox', null);
        break;
      default:
        break;
    }

    if (getState('lightbox') + 1 === getState('images').length) {
      window.$addClass(window.qs('.overlay-right'), 'is-disabled');
      window.$removeClass(window.qs('.overlay-left'), 'is-disabled');
    } else if (getState('lightbox') === 0) {
      window.$addClass(window.qs('.overlay-left'), 'is-disabled');
      window.$removeClass(window.qs('.overlay-right'), 'is-disabled');
    } else {
      window.$removeClass(window.qs('.overlay-right'), 'is-disabled');
      window.$removeClass(window.qs('.overlay-left'), 'is-disabled');
    }
  };

  render();
  loadImages();

  /**
   * Initialization block.
   */
  const app = window.qs('.app-container');
  window.$on(app, 'stateChange', (e) => {
    switch (e.detail.action) {
      case 'nextImage':
        setLightbox(null, 'nextImage');
        window.$renderOverlay(getState('images')[getState('lightbox')].src);
        break;
      case 'prevImage':
        setLightbox(null, 'prevImage');
        window.$renderOverlay(getState('images')[getState('lightbox')].src);
        break;
      case 'closeModal':
        setState('modalOpen', false);
        setState('lightbox', null);
        break;
      case 'openModal':
        const targ = e.target ? e.target : e.srcElement;
        const imageId = (targ.parentElement.attributes['data-image-id'].value);
        setState('modalOpen', true);
        setLightbox(imageId, 'openModal');
        window.$renderOverlay(getState('images').find((el) => {
          return (el.id === imageId);
        }).src);
        break;
      default:
        break;
    }
    /**
     * During development, uncomment the two lines below to see your app state change,
     * based on the actions that are occuring.
     */
    console.log(`Action Type: ${e.detail.action}`);
    console.log(getState());
  });

  /** expose methods - revealing module pattern **/
  return {
    getState,
    nextFilmType
  };
})();
