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
    selectedFilmType: null, // default
  };

  /**
   * The exposed Grid module is made available to our application.
   */
  const grid = Grid();

  if (state.images === null && state.selectedFilmType === null) {
    state.images = {};
    // TODO: Consider moving the randomization out as a helper fn
    state.selectedFilmType = state.availFilmTypes[Math.floor(
      Math.random() * state.availFilmTypes.length
    )];

    grid.fetchImages(state.selectedFilmType, (data) => {
      if (!state.images[data]) {
        state.images = grid.reduceImages(data.photos.photo);
      }
    });
  }

  /**
   * Based on current random film, you advance to the next one in the array,
   * and it will execute a callback with that in mind.
   * @param  {Function} callback [Callback is excuted on whichever film you want!]
   * @return {[type]}            [description]
   */
  const advanceFilm = (callback) => {

  }

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
  }

  /**
   * Return the state of the application
   * @return {[type]} [Application state object]
   */
  const getState = () => {
    return state;
  };

  /**
   * Anything returned in the block below will make those properties/methods
   * public!
   */
  return {
    getState,
    setState
  };
})();
