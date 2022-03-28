require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var pg =require('pg');
const cors =require('cors')
const path =require('path');
const app = express();
const bcrypt =require('bcryptjs');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



env=process.env.NODE_ENV
console.log(env)
const PORT = process.env.PORT ||8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

if (env==='production'){
  app.use(express.static(path.resolve(__dirname, "./front/build")));
// Step 2:

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
//products page
app.get('/productss/categories', function(req, res) {
  client.query("select distinct(family) from salesforce.product2 ", function(error, data) {
    if(error){
      console.log("eee",error)
    }
    else{
      res.json(data.rows)
      //console.log(data.rows)
    }
  });
});
app.get('/productss/partners', function(req, res) {
  client.query("select companyLogo__c,name,website from salesforce.account where companyLOgo__c<>'0' ;", function(error, data) {
    if(error){
      console.log("eee",error)
    }
    else{
      res.json(data.rows)
      //console.log(data.rows)
    }
  });
});
app.get('/productss/:category', function(req, res) {
  console.log("category",req.params.category)
  
    //const text="select createdbyid,CreatedDate ,unitprice,product2Id,(select name from salesforce.product2 where sfid=product2Id),(select family from salesforce.product2 where  sfid=product2Id),(select description from salesforce.product2 where sfid=product2Id),(select Picture_URL__c from salesforce.product2 where sfid=product2Id), (select name as username from salesforce.user where sfid=createdbyid),(select mediumphotourl from salesforce.user where sfid=createdbyid) from salesforce.pricebookentry where product2Id__r.family=$1 and  pricebook2Id='01s8d000003IM8RAAW'"
   if(req.params.category==="all"){
    const text="select pbe.sfid as pbesfid, pbe.createdbyid,pbe.createddate,pbe.unitprice ,pbe.product2Id ,p.Picture_URL__c, p.name , p.sfid ,p.family,p.description ,u.mediumphotourl , u.name as username from salesforce.pricebookentry as pbe , salesforce.product2  as p,salesforce.user as u where p.sfid=pbe.product2Id and u.sfid=pbe.createdbyid  and pbe.pricebook2Id='01s8d000003IM8RAAW'"
    //const values=[req.params.category]
    client.query(text,function(error, data) {
      if(error){
        console.log("eee",error)
      }
      else{
        console.log("if")
        res.json(data.rows)
        //console.log(data.rows)
       
      }
    
    })
   }
   else{
    const text="select pbe.sfid as pbesfid, pbe.createdbyid,pbe.createddate,pbe.unitprice ,pbe.product2Id ,p.Picture_URL__c, p.name , p.sfid ,p.family,p.description ,u.mediumphotourl , u.name as username from salesforce.pricebookentry as pbe , salesforce.product2  as p,salesforce.user as u where p.sfid=pbe.product2Id and u.sfid=pbe.createdbyid and p.family=$1 and pbe.pricebook2Id='01s8d000003IM8RAAW'"
    const values=[req.params.category]
    client.query(text,values, function(error, data) {
      if(error){
        console.log("eee",error)
      }
      else{
        console.log("if")
        res.json(data.rows)
        //console.log(data.rows)
       
      }
    });
   }
});

//single product page 
app.get('/productss/product/:sfid',function(req,res){
  const text="select pbe.sfid as pbesfid, pbe.createdbyid,pbe.createddate,pbe.unitprice ,pbe.product2Id ,p.numberOfSubcribers__c,p.family,p.Picture_URL__c, p.name,p.marketingQuote__c,p.otherimageslinks__c,p.subtitle__c,p.sfid,p.duration__c,p.numberOfUsers__c,p.sales_figure__c,p.provider__c,p.siteurl__c,p.tags__c,p.description ,u.mediumphotourl , u.name as username from salesforce.pricebookentry as pbe , salesforce.product2  as p,salesforce.user as u where pbe.sfid=$1 and  p.sfid=pbe.product2Id and u.sfid=pbe.createdbyid"
  const values=[req.params.sfid]
  //console.log("first",req.params.sfid)
  client.query(text,values,function(error,data){
    if(error){
      console.log("error",error)
    }
    else{
      res.json(data.rows)
      console.log(data.rows)
    }
  })
})

app.get('/smilarproduct/:fam/:sfid',function(req,res){
  const text="select pbe.createdbyid ,pbe.sfid as pbesfid ,pbe.createddate,pbe.product2Id,p.Picture_URL__c, p.name,p.subtitle__c,p.sfid,p.tags__c, u.name as username from salesforce.pricebookentry as pbe , salesforce.product2  as p,salesforce.user as u where p.family=$1 and  p.sfid=pbe.product2Id and u.sfid=pbe.createdbyid and pbe.pricebook2Id='01s8d000003IM8RAAW' and  pbe.sfid!=$2 Limit 3"
  const values=[req.params.fam,req.params.sfid]
  console.log("firssssst",req.params.fam ,req.params.sfid)
  client.query(text,values,function(error,data){
    if(error){
      console.log("error",error)
    }
    else{
      res.json(data.rows)
      console.log("else",data.rows)
    }
  })
})
app.post('/signups', function(req, res) {
  text='select name from salesforce.commercialExternalInfos__c where cin__c=$1 or email__c=$2'
  values=[req.body.cin,req.body.email]
  client.query(text,values,function(error,data){
    if(error){
      console.log("error",error)
    }
    else{
      console.log("data.rows",data.rowCount)
      if (data.rowCount===0){
        const text = 'INSERT INTO salesforce.commercialExternalInfos__c (name,email__c,password__c,company__c,role__c,cin__c) VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
        const values=[req.body.firstName +" "+req.body.lastName,req.body.email,bcrypt.hashSync(req.body.password,12),req.body.company,req.body.role,req.body.cin]
        client.query(text,values,function(error,data){
          if(error){
            console.log("error",error)
          }
          else{
            console.log("user added")
            res.json({msg:'user added'})
          }
        })
      }
      else{
        console.log('user exist')
        res.json({msg:'user exist'})
      }
    }
  })

});

app.post('/signins',function(req,res){
text="select name , email__c,password__c from  salesforce.commercialExternalInfos__c where email__c=$1"
values=[req.body.email]
client.query(text,values,function(error,data){

if(error){
  console.log("error",error)
}
else{
  
  if(data.rowCount===1 && bcrypt.compareSync(req.body.password,data.rows[0].password__c)){
    res.json({msg:`welcome back ${data.rows.name}`})
  }
  else{
    res.json({msg:'please verify your credentials '})
  }
}
})
})








if (env==='production'){
  app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./front/build", "index.html"));
});
 
}