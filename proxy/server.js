const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const staticFilesRouter = require('./routers/staticFiles.js');
const dataRouter = require('./routers/data.js');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

if (!global.window) {
  global.window = new Object();
 }

app.options((req, res) => {
  res.send('OK');
});

const defaultRestaurantId = Math.floor(Math.random() * 9999999);

app.get('/', (req, res) => {
  res.redirect('/restaurants/' + defaultRestaurantId);
});

app.use('/services', express.static(__dirname + '/public/services'));
app.get('/bundle-server.js', (req, res) => {
  res.sendFile(path.resolve('proxy/public/lib/react-dom.development.js'));
});
app.get('/lib/react.development.js', (req, res) => {
  res.sendFile(path.resolve('proxy/public/lib/react.development.js'));
});
app.get('/lib/react-dom.development.js', (req, res) => {
  res.sendFile(path.resolve('proxy/public/lib/react-dom.development.js'));
});

app.use('/restaurants', staticFilesRouter);
app.use('/api/restaurants', dataRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on http://localhost:' + port));
