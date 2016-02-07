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
    filmType: null,
    filmIndex: null
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
  const getState = () => {
    return state;
  };

  const loadImages = () => {
    grid.fetchImages(state.filmType, (data) => {
      setState('images', grid.reduceImages(data.photos.photo), () => {
        grid.renderImages(state.images);
      });
    });
  };

  // Block is evaluated upon first time loading the app
  if (state.images === null && state.filmType === null) {
    state.images = {};
    // TODO: Consider moving the randomization out as a helper fn
    // let randomIndex = Math.floor(Math.random() * state.availFilmTypes.length);
    const randomIndex = 0;

    state.filmType = state.availFilmTypes[randomIndex];
    state.filmIndex = randomIndex;

    loadImages();
  }

  /**
   * Render function can only be triggered by application.
   * @return {[type]} [description]
   */
  const render = () => {
    window.qs('#current-film').innerHTML = state.filmType;
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

    if (state.availFilmTypes[state.filmIndex + 1] !== undefined) {
      nextVal = state.availFilmTypes[state.filmIndex + 1];
      nextIndex = state.filmIndex + 1;
    } else {
      nextVal = state.availFilmTypes[nextIndex];
    }

    setState('filmType', nextVal);
    setState('filmIndex', nextIndex, () => {
      loadImages();
      grid.renderImages(state.images);
      render();
    });
  };

  render();

  /**
   * Anything returned in the block below will make those properties/methods
   * public!
   */
  return {
    getState,
    advanceFilm
  };
})();
