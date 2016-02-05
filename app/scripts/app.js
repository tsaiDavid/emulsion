(() => {
  'use strict';

  function loadImage() {
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=437db95c9e8c0340302759555b1f684f&tags=portra%2C+film&sort=relevance&per_page=20&page=1&format=json&nojsoncallback=1')
    .then((response) => {
      return response.json();
    }).then((data) => {
      console.log($reduceImgResponse(data.photos.photo));
    });
  }

  $on(window, 'load', loadImage);

})();



//
// 'use strict';
//
// document.addEventListener('DOMContentLoaded', () => {
//
//   const main = document.querySelector('.container');
//
//   const obj = Slack.element('div', `
//     <hr />
//     <h3> This is a sample header</h3>
//     <br>
//     <button>
//       Click Me
//     </button>
//     <hr />
//   `);
//
//   for (var i = 0; i < 10; i++) {
//     main.appendChild(obj);
//   }
//
//
//
// });
