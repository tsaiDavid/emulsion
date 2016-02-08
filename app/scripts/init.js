/**
 * Initialization - attach event listeners, etc here.
 */

const init = (() => {
  const app = window.Emulsion;

  window.$on(window.qs('#next-film-arrow'), 'click', app.advanceFilm);

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

})();
