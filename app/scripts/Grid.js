const Grid = (() => {
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

  return {
    fetchImages,
    removeImages,
    reduceImages
  };
});
