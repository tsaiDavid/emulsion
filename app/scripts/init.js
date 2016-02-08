'use strict';
/**
 * Initialization - attach event listeners, etc here.
 * Unlike the initialization section in our 'app.js', these are not directly
 * tied to application state and are placed here for better separation of concerns.
 */
const init = (() => {
  const app = window.Emulsion;

  window.$on(window.qs('#next-film-arrow'), 'click', app.nextFilmType);

  /**
   * Below, we attach event listeners that will emit custom 'stateEvents'
   */
  const overlay = window.qs('.overlay');

  const closeBtn = window.qs('.modal-close-btn');
  window.$on(closeBtn, 'click', (e) => {
    e.srcElement.dispatchEvent(window.$stateEvent('closeModal'));
    window.$removeClass(overlay, 'is-open');
  });

  const nextBtn = window.qs('.overlay-right');
  window.$on(nextBtn, 'click', (e) => {
    e.srcElement.dispatchEvent(window.$stateEvent('nextImage'));
  });

  const prevBtn = window.qs('.overlay-left');
  window.$on(prevBtn, 'click', (e) => {
    e.srcElement.dispatchEvent(window.$stateEvent('prevImage'));
  });

  window.$stateEvent = (action, callback) => {
    return new CustomEvent(
      'stateChange',
      {
        detail: {
          action,
          callback,
          state: app.getState(),
          time: new Date()
        },
        bubbles: true,
        cancelable: true
      }
    );
  };
})();
