/**
 * Global application, $on (helper function)
 */

(() => {
  'use strict';



  /**
   * For the time being, here's how we will "import" our utility/helper functions.
   */
  const $reduceImgResponse = window.$reduceImgResponse;
  const $on = window.$on;
  const qs = window.qs;
  const $each = window.$each;

  // Variable ref. to our query-selected "main" element, which houses our image grid.
  const mainContainer = qs('main');

  /**
   * This function allows us to iterate through our data object - which contains
   * all the necessary information regarding our image. The '$each' function that
   * I implemented allows us to iterate over the object with ease.
   */
  function renderImages() {
    $each(window.data, (image) => {
      const container = document.createElement('div');
      container.className = 'grid-image-container';

      const gridImage = document.createElement('div');
      gridImage.className = 'grid-image';
      gridImage.style.backgroundImage = `url(${image.src})`;

      container.appendChild(gridImage);
      mainContainer.appendChild(container);
    });
  }

  /**
   * Here, we get images from Flickr! Thanks to ES6's friendly string interpolation,
   * we're able to easily swap out variables - in this case, replacing the search tag
   * for film type by drawing that information from our selector. The response is
   * converted to JSON then converted to a more digestible format with a helper function.
   */
  function loadImage(filmType) {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=851eba61830c7c59ab64308b75eec2f7&tags=${filmType}%2C+film&sort=relevance&per_page=10&page=1&format=json&nojsoncallback=1`)
    .then((response) => {
      return response.json();
    }).then((data) => {
      window.data = $reduceImgResponse(data.photos.photo);
    }).then(() => {
      renderImages();
    });
  }

  /**
   * Function will remove all of grid element's children.
   * Called whenever we make a change on the type of film we're viewing.
   */
  function clearImages() {
    while (mainContainer.firstChild) {
      mainContainer.removeChild(mainContainer.firstChild);
    }
    mainContainer.textContent = '';
  }

  /**
   * When the window is loaded, we'll default the loaded images
   * to the "Kodak Ektar" set.
   */
  $on(window, 'load', () => {
    loadImage('ektar');
  });

  /**
   * Here, we add an event - when a user selects a new film type,
   * we'll go ahead and clear the main element's children and load
   * the new ones, requesting the "value" of the film type from Flickr.
   *
   * @param  {[type]} qs('.film-selector' [description]
   * @return {[type]}                     [description]
   */
  $on(qs('.film-selector'), 'change', () => {
    clearImages();
    loadImage(qs('.film-selector').value);
  });
})(window.Emulsion = {});
