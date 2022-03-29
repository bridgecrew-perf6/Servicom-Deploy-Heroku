const jwt = require('jsonwebtoken')

module.exports= user =>{
    const payload ={
        name:user.name,
        email:user.email__c,
    }
    const secret=process.env.SECRET
    const options={
        expiresIn :'1H'
    }
    return jwt.sign(payload,secret,options);
    
};