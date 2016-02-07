/**
 * Initialization - attach event listeners, etc here.
 */

const init = (() => {
  const app = window.Emulsion;

  $on(qs('#next-film-arrow'), 'click', app.advanceFilm);

})();
