const router = require('express').Router();
const path =require('path')

/**
 * app.get('/products', function (req, res) {
    res.sendFile(path.join(__dirname, '/front/build', 'index.html'));
  });

 */

  router.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
  });
 

  module.exports=router;