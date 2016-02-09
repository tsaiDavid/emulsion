'use strict';
/**
 * Initialization - attach event listeners, etc here.
 * Unlike the initialization section in our 'app.js', these are not directly
 * tied to application state and are placed here for better separation of concerns.
 */
const init = (() => {
  /** Making the app and helper functions available within our initialization */
  const app = Emulsion;
  const $EH = $EmulsionHelpers();

  $EH.on($EH.qs('#next-film-arrow'), 'click', app.nextFilmType);

  /**
   * Below, we attach event listeners that will emit custom 'stateEvents'
   */
  const overlay = $EH.qs('.overlay');

  const closeBtn = $EH.qs('.modal-close-btn');
  $EH.on(closeBtn, 'click', (e) => {
    const targ = e.target ? e.target : e.srcElement;
    targ.dispatchEvent($EH.stateEvent('closeModal'));
    $EH.removeClass(overlay, 'is-open');
  });

  const nextBtn = $EH.qs('.overlay-right');
  $EH.on(nextBtn, 'click', (e) => {
    const targ = e.target ? e.target : e.srcElement;
    targ.dispatchEvent($EH.stateEvent('nextImage'));
  });

  const prevBtn = $EH.qs('.overlay-left');
  $EH.on(prevBtn, 'click', (e) => {
    const targ = e.target ? e.target : e.srcElement;
    targ.dispatchEvent($EH.stateEvent('prevImage'));
  });
})();
