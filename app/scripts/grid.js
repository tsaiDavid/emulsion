'use strict';

const Grid = () => {
  /**
   * Used to fetch images from the Flickr endpoint - leverages ES6's ability to
   * work with the 'fetch API' - and handle async with promises.
   * @param  {[string]}   filmType [used to search Flickr's tags for film type]
   * @param  {Function} callback [pass a callback to be executed on response]
   */
  const fetchImages = (filmType, callback) => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=851eba61830c7c59ab64308b75eec2f7&tags=${filmType}%2C+film&sort=relevance&per_page=10&page=1&format=json&nojsoncallback=1`)
    .then((response) => {
      return response.json();
    }).then((data) => {
      callback(data);
    });
  };

  /**
   * Provided an array of image objects, returns an array with each image + its source value.
   * @param  {Array} data   - Array of images
   * @return {Array}        - Array of images, includes img src
   */
  const mapImages = (data) => {
    return data.map((image) => {
      image.src = window.$createImgSource(image);
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
  const renderImages = (imagesArray) => {
    removeImages(window.qs('main'));

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
      window.$on(container, 'click', (e) => {
        e.srcElement.dispatchEvent(window.$stateEvent('openModal'));
        window.$addClass(window.qs('.overlay'), 'is-open');
      });

      /** append our newly built container, with image, to the main app element **/
      window.qs('main').appendChild(container);
    });
  };

  /** expose methods - revealing module pattern **/
  return {
    fetchImages,
    mapImages,
    removeImages,
    renderImages
  };
};
