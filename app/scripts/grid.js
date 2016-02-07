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
   * Reduces Flickr's response data to an object - image ID's are mapped to their
   * associated image object - adding a 'src' property with its source URL.
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  const reduceImages = (data) => {
    return data.reduce((dataObject, image) => {
      dataObject[image.id] = image;
      dataObject[image.id].src = window.$createImgSource(image);
      return dataObject;
    }, {});
  };

  const removeImages = (container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.textContent = '';
  };

  /**
   * Renders images inside the grid - will remove unecessary images from DOM first.
   * @param  {[type]} imagesObject [takes in an images object to operate over]
   * @return {[type]}              [description]
   */
  const renderImages = (imagesObject) => {
    // Notice that we will call removeImages before rendering the grid, to ensure
    // that we are going to clear the landscape before operating again!
    removeImages(window.qs('main'));
    window.$each(imagesObject, (image) => {
      const container = document.createElement('div');
      container.className = 'grid-image-container';

      const gridImage = document.createElement('div');
      gridImage.className = 'grid-image';
      gridImage.style.backgroundImage = `url(${image.src})`;

      container.appendChild(gridImage);
      container.setAttribute('data-image-id', image.id);
      window.$on(container, 'click', () => {
        window.location = `#openModal`;
      });
      window.qs('main').appendChild(container);
    });
  };

  return {
    fetchImages,
    removeImages,
    reduceImages,
    renderImages
  };
};
