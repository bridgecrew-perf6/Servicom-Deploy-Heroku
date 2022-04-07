require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
const middleware=require('./middleware.js')
var pg =require('pg');
const cors =require('cors')
const path =require('path');
const bcrypt =require('bcryptjs');
const generateToken=require('./generateToken');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
  client.query("select companyLogo__c,name,website from salesforce.account where companyLOgo__c<>'0' and Type='Technology Partner' ;", function(error, data) {
    if(error){
      console.log("eee",error)
    }
    else{
      console.log(data.rows)
      res.json(data.rows)
      
    }
  });
});
app.get('/partners', function(req, res) {
  client.query("select  name from salesforce.account where  Type='Technology Partner' ;", function(error, data) {
    if(error){
      console.log("eee",error)
    }
    else{
      console.log(data.rows)
      res.json(data.rows)
      
    }
  });
});
app.get('/productss/:category', function(req, res) {
  console.log("category",req.params.category)
  
    //const text="select createdbyid,CreatedDate ,unitprice,product2Id,(select name from salesforce.product2 where sfid=product2Id),(select family from salesforce.product2 where  sfid=product2Id),(select description from salesforce.product2 where sfid=product2Id),(select Picture_URL__c from salesforce.product2 where sfid=product2Id), (select name as username from salesforce.user where sfid=createdbyid),(select mediumphotourl from salesforce.user where sfid=createdbyid) from salesforce.pricebookentry where product2Id__r.family=$1 and  pricebook2Id='01s8d000003IM8RAAW'"
   if(req.params.category==="all"){
    const text="select pbe.sfid as pbesfid,pbe.Pricebook2__pricebookExternalId__c  , pbe.createdbyid,pbe.createddate,pbe.unitprice ,pbe.product2Id ,p.Picture_URL__c, p.name,p.numberOfUsers__c, p.sfid ,p.family,p.description ,u.mediumphotourl , u.name as username from salesforce.pricebookentry as pbe , salesforce.product2  as p,salesforce.user as u where p.sfid=pbe.product2Id and u.sfid=pbe.createdbyid  and pbe.pricebook2Id='01s8d000003IM8RAAW'"
    //const values=[req.params.category]
    client.query(text,function(error, data) {
      if(error){
        console.log("eee",error)
      }
      else{
        //console.log("if")
        res.json(data.rows)
        //console.log(data.rows)
       
      }
    
    })
   }
   else{
    const text="select pbe.sfid as pbesfid,pbe.Pricebook2__pricebookExternalId__c ,  pbe.createdbyid,pbe.createddate,pbe.unitprice ,pbe.product2Id ,p.Picture_URL__c, p.name , p.sfid ,p.family,p.description ,u.mediumphotourl , u.name as username from salesforce.pricebookentry as pbe , salesforce.product2  as p,salesforce.user as u where p.sfid=pbe.product2Id and u.sfid=pbe.createdbyid and p.family=$1 and pbe.pricebook2Id='01s8d000003IM8RAAW'"
    const values=[req.params.category]
    client.query(text,values, function(error, data) {
      if(error){
        console.log("eee",error)
      }
      else{
        //console.log("if")
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
  console.log("first",req.params.sfid)
  client.query(text,values,function(error,data){
    if(error){
      console.log("error",error)
    }
    else{
      res.json(data.rows)
      //console.log(data.rows)
    }
  })
})

app.get('/smilarproduct/:fam/:sfid',function(req,res){
  const text="select pbe.createdbyid ,pbe.sfid as pbesfid ,pbe.createddate,pbe.product2Id,p.Picture_URL__c, p.name,p.subtitle__c,p.sfid,p.tags__c, u.name as username from salesforce.pricebookentry as pbe , salesforce.product2  as p,salesforce.user as u where p.family=$1 and  p.sfid=pbe.product2Id and u.sfid=pbe.createdbyid and pbe.pricebook2Id='01s8d000003IM8RAAW' and  pbe.sfid!=$2 Limit 3"
  const values=[req.params.fam,req.params.sfid]
  client.query(text,values,function(error,data){
    if(error){
      console.log("error",error)
    }
    else{
      res.json(data.rows)
      //console.log("else",data.rows)
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
            const token=generateToken(data.rows[0])
           //add code here
           res.json({msg:'user added',token})

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
text="select name , email__c,password__c ,cin__c from  salesforce.commercialExternalInfos__c where email__c=$1"
values=[req.body.email]
client.query(text,values,function(error,data){

if(error){
  console.log("error",error)
}
else{
  
  if(data.rowCount===1 && bcrypt.compareSync(req.body.password,data.rows[0].password__c)){
    const token=generateToken(data.rows[0])
    res.json({msg:`welcome back ${data.rows[0].name}`,token})
  }
  else{
    res.json({msg:'please verify your credentials '})
  }
}
})
})

app.use(middleware)
app.get('/userPhoto',function(req,res){
//console.log("reqToken",req.decodedToken)
text="select name, profilephoto__c from  salesforce.commercialexternalinfos__c  where email__c=$1 "
values=[req.decodedToken.email]
//console.log('photo',values)
client.query(text,values,function(error,data){
  if (error){
    console.log("error: ",error)
  }
  else{
    //console.log('tooof',data.rows[0])
    res.json(data.rows[0])
  }
})
})

app.get('/userInfos',function(req,res){
  //console.log("reqToken",req.decodedToken)
  text="select name, profilephoto__c,email__c,company__c,role__c,cin__c,bio__c from  salesforce.commercialexternalinfos__c  where email__c=$1 "
  values=[req.decodedToken.email]
  client.query(text,values,function(error,data){
    if (error){
      console.log("error: ",error)
    }
    else{
      //console.log('tooof',data.rows[0])
      res.json(data.rows[0])
    }
  })
  })

app.put('/userInfos',function(req,res){
    console.log('put')
    text="update  salesforce.commercialexternalinfos__c set name=$2,bio__c=$6,profilephoto__c=$7,email__c=$8,company__c=$4,role__c=$5,cin__c=$3 where email__c=$1 "
    values=[req.decodedToken.email,req.body.fullname,req.body.cin,req.body.company,req.body.role,req.body.bio,req.body.photo,req.body.email]
    client.query(text,values,function(error,data){
      if (error){
        console.log("error: ",error)
      }
      else{
      
      //const token=generateToken({name:req.body.fullname,email__c:req.body.email,cin:req.body.cin})
      //console.log('tokkkkeeeen',token)
      //res.json({token})
      res.json({msg:'user updated'})
      }
    })
    })
app.put('/userPassword',function(req,res){
    //console.log('putpass')
    console.log(req.body.newpassword)
    text="select password__c from  salesforce.commercialexternalinfos__c  where email__c=$1 "
    values=[req.decodedToken.email]
    client.query(text,values,function(error,data){
      if (error){
        res.json({msg:'invalid password'})
      }
      else{
        if (bcrypt.compareSync(req.body.currentpassword,data.rows[0].password__c)){
          text="update salesforce.commercialexternalinfos__c set password__c=$2 where email__c=$1 "
          values=[req.decodedToken.email,bcrypt.hashSync(req.body.newpassword,12)]
          client.query(text,values,function(error,data){
            if (error){
              console.log("update password error: ",error)
            }
            else{
              res.json({msg:'password updated!!'})
            }
          })
        }
      }
     
    })
    })
    
app.delete('/deleteaccount',function(req,res){
      //console.log('putdellllpass')
      //console.log(req.body)
      text="select password__c from  salesforce.commercialexternalinfos__c  where email__c=$1 "
      values=[req.decodedToken.email]
      client.query(text,values,function(error,data){
        if (error){
          res.json({msg:'invalid password'})
        }
        else{
          if (bcrypt.compareSync(req.body.source,data.rows[0].password__c)){
            text="delete from  salesforce.commercialexternalinfos__c  where email__c=$1 "
            values=[req.decodedToken.email]
            client.query(text,values,function(error,data){
              if (error){
                console.log("delete error: ",error)
              }
              else{
               
                res.json({msg:'account deleted!!'})
              }
            })
          }
        }
       
      })
      })


app.post('/wishlists', function(req, res) {
              const text = 'INSERT INTO salesforce.OpportunityLineItem (opportunityProductExternalId__c,Description,Product2Id,UnitPrice,name,quantity,OpportunityId) VALUES($1,$2,$3,$4,$5,$6,(select sfid from salesforce.opportunity where opportunityExternalId__c=$7)) RETURNING *'
              const values=[req.body.opportunityProductExternalId__c,req.body.Description,req.body.Product2Id,req.body.UnitPrice,req.body.name,req.body.Quantity,req.decodedToken.cin]
              client.query(text,values,function(error,data){
                if(error){
                  console.log("error",error)
                }
                else{
                 //res.json({msg:'added to cart'})
                
                 
                 const text1 = "INSERT INTO salesforce.Opportunity (name,closedate,Pricebook2Id,accountid,StageName,opportunityExternalId__c) VALUES($1,'2022-12-31','01s8d000003IM8RAAW',(select sfid from salesforce.Account where accountExternalId__c=$2),'Prospecting',$3) RETURNING *"
                 const cin=Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()
                 const values1=["Opportunity (single) for "+req.decodedToken.name,req.decodedToken.cin,cin]
                 client.query(text1,values1,function(error,data){
                if(error){
                  console.log("error",error)
                }
                else{

                      console.log(data.rows)
                      res.json(data.rows)
                    }

                  })
                  
                }
              })
      
                
              });

app.post('/wishliststolineitem', function(req, res) {
                const text5 = "INSERT INTO salesforce.OpportunityLineItem (opportunityProductExternalId__c,Description,Product2Id,UnitPrice,name,quantity,OpportunityId) VALUES($1,$2,$3,$4,$5,$6,(select sfid from salesforce.opportunity where name like '%(single)%' order by createddate desc limit 1 )) RETURNING *"
                const values5=[req.body.opportunityProductExternalId__c,req.body.Description,req.body.Product2Id,req.body.UnitPrice,req.body.name,req.body.Quantity]
                console.log('oprpofkrfr',req.body.opportunityexternalid__c)
                client.query(text5,values5,function(error,data){
                  if(error){
                    console.log("error",error)
                  }
                  else{
                    res.json(data.rows)
                    }   
                    })
                    })  ;
app.get('/wishlists', function(req, res) {
        //and op.OpportunityId=(select sfid from salesforce.opportunity where opportunityExternalId__c=$1)
        const text="select p.name,p.duration__c,op.description,op.quantity,op.UnitPrice from salesforce.OpportunityLineItem as op ,salesforce.product2 as p where p.sfid=op.Product2Id and op.OpportunityId=(select sfid from salesforce.opportunity where opportunityExternalId__c=$1) "
        const values=[req.decodedToken.cin]
        console.log('cinnnn',values)
        client.query(text,values,function(error,data){
          if(error){
            console.log("error",error)
          }
          else{
           res.json(data.rows)

          }
        })
        
    
});

app.get('/wishlistssingles', function(req, res) {
  //const text="select p.name,p.duration__c,op.description,op.quantity,op.UnitPrice from salesforce.OpportunityLineItem as op ,salesforce.product2 as p where p.sfid=op.Product2Id and op.OpportunityId=(select sfid from salesforce.opportunity where opportunityExternalId__c=$1) "
  const text="select p.name,p.duration__c,op.sfid,op.description,op.quantity,op.UnitPrice from salesforce.OpportunityLineItem as op ,salesforce.product2 as p,salesforce.opportunity as o where p.sfid=op.Product2Id  and o.sfid=op.OpportunityId and o.name like '%(single)%'"
  //const values=[req.decodedToken.cin]
  client.query(text,function(error,data){
    if(error){
      console.log("error",error)
    }
    else{
     res.json(data.rows)

    }
  })
  

});

if (env==='production'){
  app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./front/build", "index.html"));
});
 
}
/**
 *         const text="select p.name,p.duration__c,op.description,op.quantity,op.UnitPrice from salesforce.OpportunityLineItem as op ,salesforce.product2 as p,salesforce.opportunity as o where p.sfid=op.Product2Id  and o.sfid=op.OpportunityId and o.name like '%(single)%'"

 */