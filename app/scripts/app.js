'use strict';

/** This is our main module, our Application! */
const Emulsion = (() => {
  /** Exposing Grid module and $EH (helper functions) **/
  const grid = Grid();
  const $EH = $EmulsionHelpers();

  /**
   * This is our initial state object - our one source of truth! It's great
   * because if we wanted to add more film types, we can make those changes here...
   * as simply as adding to the availFilmTypes array!
   */
  const state = {
    modalOpen: false,       // Boolean representing whether or not our overlay is open
    images: null,           // Array containing image objects with their title, url, etc
    lightbox: null,         // Integer representing current index value of loaded image
    currFilmType: 'ektar',  // String value of selected global "film type"
    currFilmIndex: '0',     // Integer, index value of current "film type"
    availFilmTypes: ['ektar', 'portra', 'tri-x', 'superia', 'velvia', 'pro 400h']
  };

  /**
   * Given a key and a new value, update the app state and invoke a callback -
   * only if one is provided.
   * @param  {String}   key      - state key
   * @param  {Anything} value    - value associated with state key
   * @param  {Function} callback - callback to be optionally invoked
   */
  const setState = (key, value, callback) => {
    state[key] = value;
    if (callback) {
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
        grid.renderImages(state.images, getState('currFilmType'));
      });
    });
  };

  /**
   * Render function can only be triggered by this app
   */
  const render = () => {
    $EH.qs('#current-film').innerHTML = state.currFilmType;
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
      grid.renderImages(state.images, getState('currFilmType'));
      render();
    });
  };

  /**
   * Carries out state changes on the 'lightbox' property in our app state.
   * This dictates which image is loaded up in our overlay/lightbox - evaluated
   * by action types. This method is called by our app's custom event listener.
   *
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

    /** We use our helper functions to toggle the classes on overlay controls */
    if (getState('lightbox') + 1 === getState('images').length) {
      $EH.disableRight();
      $EH.enableLeft();
    } else if (getState('lightbox') === 0) {
      $EH.disableLeft();
      $EH.enableRight();
    } else {
      $EH.enableRight();
      $EH.enableLeft();
    }
  };

  /**
   * Initialization block
   */
  render();
  loadImages();

  const app = $EH.qs('.app-container');

  /**
   * This block is important! We initialize our app to have a global event
   * system - driven by 'stateChange'. Based on an action type / keyword,
   * we'll perform some sort of UI update here, and update state as needed.
   * Mainly, we're reusing functions to select our title and source from state!
   */
  $EH.on(app, 'stateChange', (e) => {
    switch (e.detail.action) {
      case 'nextImage':
        setLightbox(null, 'nextImage');
        $EH.renderOverlay(getState('images')[getState('lightbox')].src,
          getState('images')[getState('lightbox')].title);
        break;
      case 'prevImage':
        setLightbox(null, 'prevImage');
        $EH.renderOverlay(getState('images')[getState('lightbox')].src,
          getState('images')[getState('lightbox')].title);
        break;
      case 'closeModal':
        setState('modalOpen', false);
        setState('lightbox', null);
        break;
      case 'openModal':
        /** Compat. across browsers, IE & FF use e.target */
        const targ = e.target ? e.target : e.srcElement;
        const imageId = (targ.parentElement.attributes['data-image-id'].value);
        setState('modalOpen', true);
        setLightbox(imageId, 'openModal');

        /** This simply renders the overlay initially and sets the correct title */
        $EH.renderOverlay(getState('images').find((el) => {
          return (el.id === imageId);
        }).src, getState('images').find((el) => {
          return (el.id === imageId);
        }).title);
        break;
      default:
        break;
    }
    /**
     * During development, uncomment the two lines below to see your app state change,
     * based on the actions that are occuring. Pop open the console and check it out!
     */
    // console.log(`Action Type: ${e.detail.action}`);
    // console.log(getState());
  });

  /** expose methods - revealing module pattern **/
  return {
    getState,
    nextFilmType
  };
})();
