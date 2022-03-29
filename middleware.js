//const { json } = require('body-parser');
const jwt =require('jsonwebtoken')
module.exports =(req,res,next)=>{
    const token =req.headers.authorization
    const secret= process.env.SECRET
    if (token){
       jwt.verify(token,secret,(err,decodedToken)=>{
          if (err){
             res.status(401).json({msg:'invalid token'})
          }
          else{
             //console.log("middleware",decodedToken)
             req.decodedToken=decodedToken;
             next();
          }
       })
    }
    else{
       res.status(404).json({msg:'no token'})
    }
};