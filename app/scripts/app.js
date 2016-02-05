(() => {
  'use strict';

  function yolo() {
    console.log('hey');
  }

  $on(window, 'load', yolo);
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
