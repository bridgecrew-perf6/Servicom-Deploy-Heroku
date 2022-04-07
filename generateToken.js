const jwt = require('jsonwebtoken')

module.exports= user =>{
    console.log("user",user)
    const payload ={
        name:user.name,
        email:user.email__c,
        cin:user.cin__c
    }
    const secret=process.env.SECRET
    const options={
        expiresIn :'1d'
    }
    return jwt.sign(payload,secret,options);
    
};