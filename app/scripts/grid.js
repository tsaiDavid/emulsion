'use strict';

const Grid = () => {
  const $EH = window.$EmulsionHelpers();

  /**
   * Used to fetch images from the Flickr endpoint - leverages ES6's ability to
   * work with the 'fetch API' - and handle async with promises.
   * @param  {[string]}   filmType [used to search Flickr's tags for film type]
   * @param  {Function} callback [pass a callback to be executed on response]
   */
  const fetchImages = (filmType, callback) => {
    const data = $EH.GET(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=851eba61830c7c59ab64308b75eec2f7&tags=${filmType}%2C+film&sort=relevance&per_page=9&page=1&format=json&nojsoncallback=1`, callback);
  };

  /**
   * Provided an array of image objects, returns an array with each image + its source value.
   * @param  {Array} data   - Array of images
   * @return {Array}        - Array of images, includes img src
   */
  const mapImages = (data) => {
    return data.map((image) => {
      image.src = $EH.createImgSource(image);
      return image;
    });
  };

  /**
   * Removes all of a given container's children!
   * @param  {Element} container  - Our target element to remove images from.
   */
  const removeImages = (container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.textContent = '';
  };

  /**
   * Renders all images on the grid - removes old images before adding new ones!
   * @param  {Array} imagesArray - Array of images that exist in the app state.
   */
  const renderImages = (imagesArray, filmType) => {
    const filmText = window.filmText();

    removeImages($EH.qs('main'));

    imagesArray.forEach((image) => {
      /** create a div, 'grid-image-container' **/
      const container = document.createElement('div');
      container.className = 'grid-image-container';

      /** create a div, 'grid-image' - this ends up being the image **/
      const gridImage = document.createElement('div');
      gridImage.className = 'grid-image';
      gridImage.style.backgroundImage = `url(${image.src})`;

      container.appendChild(gridImage);
      container.setAttribute('data-image-id', image.id);

      /** event listener is added for each newly rendered image - triggers modal open **/
      $EH.on(container, 'click', (e) => {
        /** To deal with browser quirks, IE/FF need target others use srcElement **/
        const targ = e.target ? e.target : e.srcElement;
        targ.dispatchEvent($EH.stateEvent('openModal'));
        $EH.addClass($EH.qs('.overlay'), 'is-open');
      });

      /** append our newly built container, with image, to the main app element **/
      $EH.qs('main').appendChild(container);
    });

    /** for each newly rendered grid, we will pull the appropriate text **/
    const textContainer = document.createElement('div');
    textContainer.className = 'grid-film-description';
    textContainer.innerHTML = `<p id="grid-film-description-inner">${filmText[filmType]}</p>`;

    ($EH.qs('main').appendChild(textContainer));
  };

  /** expose methods - revealing module pattern **/
  return {
    fetchImages,
    mapImages,
    removeImages,
    renderImages
  };
};
