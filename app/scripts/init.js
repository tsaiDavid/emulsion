/**
 * Initialization - attach event listeners, etc here.
 */

const init = (() => {
  const app = window.Emulsion;

  window.$on(window.qs('#next-film-arrow'), 'click', app.advanceFilm);
})();
