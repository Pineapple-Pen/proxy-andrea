const express = require('express');
const router = express.Router();
const React = require('react');
const ReactDom = require('react-dom/server');
//this router deals with /restaurants
const clientBundles = '../public/services';
const serverBundles = '../templates/services';
const serviceConfig = require('../service-config.json');
const services = require('../loader.js')(clientBundles, serverBundles, serviceConfig);

const Layout = require('../templates/layout');
const App = require('../templates/app');
const Scripts = require('../templates/scripts'); 

// see: https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
}

router.use('/:id', function(req, res){
  let components = renderComponents(services, {itemid: req.params.id});
  res.end(
    Layout(
      'WeGot Zagat',
      App(...components),
      Scripts(Object.keys(services))
    )
  );
});

module.exports = router;
