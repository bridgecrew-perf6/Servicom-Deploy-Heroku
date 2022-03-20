require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var pg =require('pg');
const cors =require('cors')
const path =require('path')
const app = express();
app.use(cors());
app.use(bodyParser.json());




env=process.env.NODE_ENV
console.log(env)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

if(env=='production'){
  //app.use(express.static('front/build'));
    //app.use('front/build', express.static(path.join(__dirname, 'front/build')))
    app.use(express.static('front/build'));

}









var connectionString = process.env.DATABASE_URI
const config = {
  connectionString:connectionString,
  // Beware! The ssl object is overwritten when parsing the connectionString
  ssl: {
    rejectUnauthorized: false
    //ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
  },
}
//console.log(process.env.DATABASE_URI)
if (process.env.DATABASE_URI !== undefined) {
  pg.defaults.ssl = true;
}

var client = new pg.Pool(config);
client.connect();
app.get('/products', function(req, res) {
  client.query('SELECT * FROM  salesforce.product2', function(error, data) {
    //console.log(res.json(data.rows))
    console.log("ghjkl")
  });
});





/**
 * const productsRouter=require('./routes/productsRouter') 
const homeRouter=require('./routes/homeRouter')
const aboutusRouter=require('./routes/aboutusRouter')
const signinRouter =require('./routes/signinRouter')
const signupRouter=require('./routes/signupRouter')
const passwordresetRouter=require('./routes/resetpasswordRouter');

 */
 //app.use(express.static(path.join(__dirname, 'front/build')));

 //app.use('/',homeRouter)

 //app.use('/aboutus',aboutusRouter)
 //app.use('/signin',signinRouter)
 //app.use('/signup',signupRouter)
 //app.use('./passwordreset',passwordresetRouter)