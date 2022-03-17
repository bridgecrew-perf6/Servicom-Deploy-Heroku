
  
require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var pg =require('pg');
const cors =require('cors')
const path =require('path')
const app = express();
app.use(cors());
app.use(bodyParser.json());


//env=process.env.NODE_ENV
//app.set("view engine","ejs");
//app.use(express.logger());

 //app.use(express.static('front/build'));
 app.use(express.static(path.join(__dirname, 'front/build')));

app.get('/products', function (req, res) {
  res.sendFile(path.join(__dirname, '/front/build', 'index.html'));
});
app.get('/aboutus', function (req, res) {
  res.sendFile(path.join(__dirname, '/front/build', 'index.html'));
});
 
/**
 *   app.use(express.static(path.join(__dirname, 'front/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front/public/index.html'));
})
 */

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
