var express = require('express');
var app = express();
var staticFilesRouter = require('./routers/staticFiles.js');
var dataRouter = require('./routers/data.js');

var path = require('path');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.options((req, res) => {
  res.send('OK');
});

var defaultRestaurantId = Math.floor(Math.random() * 9999999);

app.get('/', (req, res) => {
  res.redirect('/restaurants/' + defaultRestaurantId);
});

app.use('/restaurants', staticFilesRouter);
app.use('/api/restaurants', dataRouter);

var port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on http://localhost:' + port));
