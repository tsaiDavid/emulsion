const Emulsion = (() => {
  /**
   * This is the state of our Emulsion application - ideally, app state has a
   * single source of truth!
   * @type {Object}
   */
  const state = {
    modalOpen: false,
    images: null,
    availFilmTypes: ['ektar', 'portra', 'tri-x', 'superia', 'velvia'],
    currFilmType: null,
    currFilmIndex: null,
    lightbox: null
  };

  /**
   * The exposed Grid module is made available to our application.
   */
  const grid = window.Grid();

  /**
   * Given a key and a new value, update the app state and invoke a callback -
   * only if one is provided.
   * @param  {[type]}   key      [state key]
   * @param  {[type]}   value    [value associated with state key]
   * @param  {Function} callback [callback to be optionally invoked]
   * @return {[type]}            [description]
   */
  const setState = (key, value, callback) => {
    state[key] = value;

    if (callback !== undefined) {
      callback(value);
    }
  };

  /**
   * Return the state of the application
   * @return {[type]} [Application state object]
   */
  const getState = (key) => {
    if (key === undefined) {
      return state;
    }
    return state[key];
  };

  const loadImages = () => {
    grid.fetchImages(state.currFilmType, (data) => {
      setState('images', grid.reduceImages(data.photos.photo), () => {
        grid.renderImages(state.images);
      });
    });
  };

  // Block is evaluated upon first time loading the app
  if (state.images === null && state.currFilmType === null) {
    state.images = new Map();
    // TODO: Consider moving the randomization out as a helper fn
    // let randomIndex = Math.floor(Math.random() * state.availFilmTypes.length);
    const randomIndex = 0;

    state.currFilmType = state.availFilmTypes[randomIndex];
    state.currFilmIndex = randomIndex;

    loadImages();
  }

  /**
   * Render function can only be triggered by application.
   * @return {[type]} [description]
   */
  const render = () => {
    window.qs('#current-film').innerHTML = state.currFilmType;
  };

  /**
   * Based on current random film, you advance to the next one in the array,
   * and it will execute a callback with that in mind.
   * @param  {Function} callback [Callback is excuted on whichever film you want!]
   * @return {[type]}            [description]
   */
  const advanceFilm = () => {
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

  };

  render();

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
        const imageId = (e.srcElement.parentElement.attributes['data-image-id'].value);
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


  /**
   * Anything returned in the block below will make those properties/methods
   * public!
   */
  return {
    getState,
    advanceFilm
  };
})();
