const fs = require('fs');
const fetch = require('node-fetch');
const Promise = require('bluebird');
const exists = Promise.promisify(fs.access);
const nodePath = require('path');

const loadBundle = function(cache, item, filename) {
 // add a small delay to ensure pipe has closed
 setTimeout(() => {
   console.log('loading:', filename);
   cache[item] = require(filename).default;    
   console.log('cache: ', cache[item]);
}, 2000);
};

const fetchBundles = (path, services, suffix = '', require = false) => {
  Object.keys(services).forEach(item => {
    const filename = nodePath.resolve(__dirname, `${path}/${item}${suffix}.js`)
    console.log('filepath', filename);
    exists(filename)
     .then(() => {
       require ? loadBundle(services, item, filename) : null;
      })
      .catch(err => {
        if (err.code === 'ENOENT') {
          const url = `${services[item]}${suffix}.js`;
          console.log(`Fetching: ${url}`);
          // see: https://www.npmjs.com/package/node-fetch
          fetch(url)
            .then(res => {
              const dest = fs.createWriteStream(filename);
              res.body.pipe(dest);
              res.body.on('end', () => {
               require ? loadBundle(services, item, filename) : null;
              });
            });
        } else {
          console.log('WARNING: Unknown fs error');
        }
      });
  });
};

module.exports = (clientPath, serverPath, services) => {
 fetchBundles(clientPath, services);
 fetchBundles(serverPath, services, '-server', true);

 return services;
};







// const fs = require('fs');
// const fetch = require('node-fetch');
// const Promise = require('bluebird');
// fetch.Promise = Promise; 
// const exists = Promise.promisify(fs.stat);
// const fileType = require('file-type');

// const loadBundle = function(cache, item, filename) {
//   // add a small delay to ensure pipe has closed
//   console.log('inside loadbundle');
//   setTimeout(() => {
//     console.log('loading:', filename);
//     cache[item] = require(filename).default;    
//   }, 0);
// };

// const fetchBundles = (path, services, suffix = '', require = false) => {
//   Object.keys(services).forEach(item => {
//     const filename = `${path}/${item}${suffix}.js`;
//     console.log('filename: ', filename);
//     exists(filename)
//       .then(() => {
//         require ? loadBundle(services, item, filename) : null;
//       })
//       .catch(err => {
//         if (err.code === 'ENOENT') {
//           const url = `${services[item]}${suffix}.js`;
//           console.log(`Fetching: ${url}`); // This IS logging for bundle-server.js files
//           // see: https://www.npmjs.com/package/node-fetch
//           fetch(url)
//             .then(res => {
//               console.log('url is: ', url);
//             //   console.log('body: ', res.body);
//             //   let that = undefined;
//             //   res.body.on('data', (chunk) => {
//             //     that = that + chunk;
//             //   })
//             //   console.log('that: ', that);
//               const dest = fs.createWriteStream(filename);
//             //   dest.on('pipe', (src) => {
//             //     console.log('something is piping into the writer');
//             //     console.log('src: ', src, 'res.body: ', res.body);
//             //   });
//               res.body.pipe(dest);
//             //   console.log('dest', dest);
//               console.log('piping');

//               res.body.on('end', () => {
//                 console.log('YOU ARE INSIDE THE END STATE OF ZE WORLD');
//                 console.log(item, 'item');
//                 // loadBundle(services, item, filename);
//                 require ? loadBundle(services, item, filename) : null;
//               })
//             })
//             .catch((error) => console.log(error, 'error'));  
//         } else {
//           console.log('WARNING: Unknown fs error');
//         }
//       });
//   });
// };

// module.exports = (clientPath, serverPath, services) => {
//   fetchBundles(clientPath, services);
//   fetchBundles(serverPath, services, '-server', true);
//   return services;
// };
