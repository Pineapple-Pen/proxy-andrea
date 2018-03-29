const express = require('express');
const router = express.Router();
const React = require('react');
const nodePath = require('path');
const ReactDom = require('react-dom/server');

const clientBundles = nodePath.resolve(__dirname, '../public/services');
const serverBundles = nodePath.resolve(__dirname, '../templates/services');
const serviceConfig = require(nodePath.resolve(__dirname, '../service-config.json'));
const services = require('../loader.js')(clientBundles, serverBundles, serviceConfig);

const Layout = require('../templates/layout');
const App = require('../templates/app');
const Scripts = require('../templates/scripts'); 

if (!global.window) {
  global.window = new Object();
}
   
// see: https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
      console.log('components[item] is :',  components[item]);
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
}

router.get('/:id', function(req, res){
  console.log('services at router is: ', services);
  let components = renderComponents(services, {restaurantId: req.params.id});
  console.log('components', components);
  res.end(
    Layout(
      'WeGot Zagat',
      App(...components),
      Scripts(Object.keys(services), req.params.id)
    )
  );
});

module.exports = router;
