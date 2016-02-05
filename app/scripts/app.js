(() => {
  'use strict';

  const $reduceImgResponse = window.$reduceImgResponse;
  const $on = window.$on;
  const qs = window.qs;
  const $each = window.$each;
  const testData = window.testData;

  function stubbedLoadImage(data) {
    window.data = $reduceImgResponse(data);
    console.log(window.data);
  }

  // function loadImage() {
  //   fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=437db95c9e8c0340302759555b1f684f&tags=portra%2C+film&sort=relevance&per_page=20&page=1&format=json&nojsoncallback=1')
  //   .then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //     console.log($reduceImgResponse(data.photos.photo));
  //   });
  // }

  const target = qs('main');

  // String.prototype.toHTML = (string) => {
  //   const container = document.createElement('div');
  //   container.innerHTML = string;
  //   return container;
  // }

  function renderImages() {
    $each(window.data, (image) => {
      let container = document.createElement('div');
      container.className = 'main-grid-image';
      let createdImage = document.createElement('img');
      createdImage.src = image.src;
      container.appendChild(createdImage);
      target.appendChild(container);
    });
  }

  // $on(window, 'load', loadImage);
  $on(window, 'load', stubbedLoadImage(testData.photos.photo));
  $on(window, 'load', renderImages());

})();
