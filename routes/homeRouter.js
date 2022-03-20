const router = require('express').Router();
const path =require('path')
router.route('/aaaa').get((req, res) => {
   console.log('home/aaaaa')
  });
 
module.exports= router;