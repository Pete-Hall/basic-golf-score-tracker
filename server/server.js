// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const golf = require('./modules/golf');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use('/golf', golf);

// globals
const port = 5001;

// spin up server
app.listen(port, ()=>{
  console.log('server up on:', port);
});