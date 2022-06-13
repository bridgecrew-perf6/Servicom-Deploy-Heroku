require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
const middleware=require('./middleware.js')
var pg =require('pg');
const cors =require('cors')
const path =require('path');
const bcrypt =require('bcryptjs');
const generateToken=require('./generateToken');
const { cp } = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const secretKey = "sk_test_5xcidfSM2RvPXFD4xLaeC4Eu00YOAYlMo0";
const stripe = require("stripe")(secretKey);



env=process.env.NODE_ENV
console.log(env)
const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
  console.log(path.resolve(__dirname, "./front/build"));
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

var client = new pg.Client(config);
client.connect();
//products page
app.get('/productss/categories', function(req, res) {
  client.query("select distinct(family) from salesforce.product2 ", function(error, data) {
    if(error){
      console.log("eee",error)
    }
    else{
      console.log("HEEEEHi")
      res.json(data.rows)
      console.log(data.rows)
    }
  });
});
app.get('/productss/partners', function(req, res) {
  client.query("select companyLogo__c,name,website from salesforce.account where companyLOgo__c<>'0' and Type='Technology Partner' ;", function(error, data) {
    if(error){
      console.log("eeeeeeee")
      console.log("eee",error)
    }
    else{
      console.log("data")
      console.log(data.rows)
      res.json(data.rows)
      
    }
  });
});
app.get('/partners', function(req, res) {
  client.query("select name from salesforce.account where  Type='Technology Partner' ;", function(error, data) {
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
  
    //const text="select createdbyid,CreatedDate ,unitprice,product2Id,(select name from salesforce.product2 where sfid=product2Id),(select family from salesforce.product2 where  sfid=product2Id),(select description from salesforce.product2 where sfid=product2Id),(select Picture_URL__c from salesforce.product2 where sfid=product2Id), (select name as username from salesforce.user where sfid=createdbyid),(select mediumphotourl from salesforce.user where sfid=createdbyid) from salesforce.pricebookentry where product2Id__r.family=$1 and  pricebook2Id='01s8d000002q4kWAAQ'"
   if(req.params.category==="all"){
    const text="select pbe.sfid as pbesfid,pbe.Pricebook2__pricebookExternalId__c  , pbe.createdbyid,pbe.createddate,pbe.unitprice ,pbe.product2Id ,p.Picture_URL__c, p.name,p.numberOfUsers__c, p.sfid ,p.family,p.description ,u.mediumphotourl , u.name as username from salesforce.pricebookentry as pbe , salesforce.product2  as p,salesforce.user as u where p.sfid=pbe.product2Id and u.sfid=pbe.createdbyid  and pbe.pricebook2Id='01s8d000002q4kWAAQ'"
    //const values=[req.params.category]
    client.query(text,function(error, data) {
      if(error){
        console.log("eee",error)
      }
      else{
        console.log("yey")
        //console.log("if")
        res.json(data.rows)
        //console.log(data.rows)
       
      }
    
    })
   }
   else{
    const text="select pbe.sfid as pbesfid,pbe.Pricebook2__pricebookExternalId__c ,  pbe.createdbyid,pbe.createddate,pbe.unitprice ,pbe.product2Id ,p.Picture_URL__c, p.name , p.sfid ,p.family,p.description ,u.mediumphotourl , u.name as username from salesforce.pricebookentry as pbe , salesforce.product2  as p,salesforce.user as u where p.sfid=pbe.product2Id and u.sfid=pbe.createdbyid and p.family=$1 and pbe.pricebook2Id='01s8d000002q4kWAAQ'"
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
  const text="select pbe.createdbyid ,pbe.sfid as pbesfid ,pbe.createddate,pbe.product2Id,p.Picture_URL__c, p.name,p.subtitle__c,p.sfid,p.tags__c, u.name as username from salesforce.pricebookentry as pbe , salesforce.product2  as p,salesforce.user as u where p.family=$1 and  p.sfid=pbe.product2Id and u.sfid=pbe.createdbyid and pbe.pricebook2Id='01s8d000002q4kWAAQ' and  pbe.sfid!=$2 Limit 3"
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
app.get('/reviews/:sfid',function(req,res){
  const text="select pr.sfid as prSfid,pr.createddate, pr.review__c,pr.dislikes__c,pr.likes__c ,comm.name,comm.profilephoto__c  from salesforce.pricebookentry as pbe, salesforce.product_review__c as pr ,salesforce.commercialexternalInfos__c as comm where  pbe.sfid=$1 and pr.commercialExternalInfo__c=comm.sfid and pr.product__c=pbe.product2Id "
  const values=[req.params.sfid]
  console.log("firstsdfghjk",req.params.sfid)
  client.query(text,values,function(error,data){
    if(error){
      console.log("error",error)
    }
    else{
      res.json(data.rows)
      console.log(data.rowCount)
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
              const text = "INSERT INTO salesforce.OpportunityLineItem (Description,Product2Id,UnitPrice,name,quantity,OpportunityId) VALUES($1,$2,$3,$4,$5,(select sfid from salesforce.opportunity where opportunityExternalId__c=$6 and StageName='Prospecting')) RETURNING *"
              const values=[req.body.Description,req.body.Product2Id,req.body.UnitPrice,req.body.name+" "+req.decodedToken.name,req.body.Quantity,req.decodedToken.cin]
              console.log("CIN HEY");
              console.log(req.decodedToken.cin);
              console.log(values)
              client.query(text,values,function(error,data){
                if(error){
                  console.log("error",error)
                }
                else{
                 res.json({msg:'added to cart'}) 
                }
              })
      
                
              });


app.get('/wishlists', function(req, res) {
        //and op.OpportunityId=(select sfid from salesforce.opportunity where opportunityExternalId__c=$1)
        //const text="select p.name,p.duration__c,op.description,op.quantity,op.UnitPrice from salesforce.OpportunityLineItem as op ,salesforce.product2 as p where p.sfid=op.Product2Id and op.OpportunityId=(select sfid from salesforce.opportunity where opportunityExternalId__c=$1) "
        const text="select description from salesforce.opportunitylineitem where OpportunityId=(select sfid from salesforce.opportunity where opportunityExternalId__c=$1)"
        const values=[req.decodedToken.cin]
        console.log(values)
        client.query(text,values,function(error,data){
          if(error){
            console.log("error",error)
          }
          else{
           
           res.json(data.rows)

          }
        })
        
    
});

app.get('/QuoteLineItems', function(req, res) {
  //and op.OpportunityId=(select sfid from salesforce.opportunity where opportunityExternalId__c=$1)
  //const text="select p.name,p.duration__c,op.description,op.quantity,op.UnitPrice from salesforce.OpportunityLineItem as op ,salesforce.product2 as p where p.sfid=op.Product2Id and op.OpportunityId=(select sfid from salesforce.opportunity where opportunityExternalId__c=$1) "
  const text="select q.quoteexternalid__c, qli.discount,qli.sfid as qliSfid, p.name,productCode ,qli.quantity,qli.unitPrice,p.duration__c,q.name as quoteName,q.sfid as quotesfid from salesforce.quotelineitem as qli  ,salesforce.product2 as p,salesforce.quote as q  where qli.quoteId=q.sfid and q.status = 'Presented' and p.sfid=qli.product2Id and qli.quoteId in (select sfid from salesforce.quote where accountId=(select sfid from salesforce.account where accountExternalId__c=$1))"
  const values=[req.decodedToken.cin]
  console.log(values)
  client.query(text,values,function(error,data){
    if(error){
      console.log("error",error)
    }
    else{
        
      res.json(data.rows)

    }
  })
  

});







// get quote line items 


app.get('/wishlistssingles', function(req, res) {
  //const text="select p.name,p.duration__c,op.description,op.quantity,op.UnitPrice from salesforce.OpportunityLineItem as op ,salesforce.product2 as p where p.sfid=op.Product2Id and op.OpportunityId=(select sfid from salesforce.opportunity where opportunityExternalId__c=$1) "
  const text="select p.name,p.duration__c,op.sfid,op.opportunityId,op.description,op.quantity,op.UnitPrice from salesforce.OpportunityLineItem as op ,salesforce.product2 as p,salesforce.opportunity as o where p.sfid=op.Product2Id  and o.sfid=op.OpportunityId and o.StageName='Prospecting' and o.opportunityExternalId__c =$1"
  const values=[req.decodedToken.cin]
  client.query(text,values,function(error,data){
    if(error){
      console.log("error",error)
    }
    else{
     console.log("wish",data.rows)
      console.log(values)
     res.json(data.rows)

    }
  })
  

});

app.delete('/wishlistitem', function(req, res) {
    const  text="delete from salesforce.opportunityLineItem where sfid=$1 "
    const values=[req.body.sfid]
    //console.log("body",req.body)
  client.query(text,values,function(error,data){
    if(error){
      console.log("error",error)
    }
    else{
      res.json({msg:'service deleted'})

    }
  })
  

});

app.delete('/allwishlistitem', function(req, res) {
  const  text="delete from salesforce.opportunityLineItem where name like $1 "
  const values=["%"+req.decodedToken.name+"%"]
  //console.log("body",req.body)
client.query(text,values,function(error,data){
  if(error){
    console.log("error",error)
  }
  else{
    const text1="delete from salesforce.opportunity where sfid=$1"
    const values1=[req.body.opportunityid]
    client.query(text1,values1,function(error,data){
      if(error){
        console.log("error",error)
      }
      else{
        console.log('service deleted',data.rows)
        res.json({msg:'service deleted'})
      }
    })

  }
})


});





// app.post('/insertopportunity', function(req, res) {
//     const text ="INSERT INTO salesforce.opportunity (opportunityExternalId__c,name,	AccountId,Pricebook2Id,StageName,CloseDate) VALUES($1,$2,(select sfid from salesforce.account where accountEXternalId__c=$3),'01s8d000002q4kWAAQ','Negotiation/Review','2022-12-31') RETURNING *"
//     const values=[(req.decodedToken.cin+";"+req.body.oppExternalId__c).substring(0,18),"opprotunity  for "+req.decodedToken.name+" n°:"+req.body.name,req.decodedToken.cin]
//     client.query(text,values,function(error,data){
//       if(error){
//         console.log("error",error)
//       }
//       else{
//        res.json({msg:(req.decodedToken.cin+";"+req.body.oppExternalId__c).substring(0,18)}) 
//       }
//     })
//     });

    // insert opportunity changed to update opportunity stage 


    app.put('/insertopportunity',function(req,res){
      text="update salesforce.opportunity set  stageName='Proposal/Price Quote'  where opportunityExternalId__c=$1 "
      values=[req.decodedToken.cin]
      console.log("email",values)
      client.query(text,values,function(error,data){
        if (error){
          console.log("error: ",error)
        }
        else{
        console.log("QUOTE GENERATION INC ");
        console.log(values)
        }
      })
      })





  app.get('/wishlistgetquotes', function(req, res) {
    const text="select q.discount,q.grandtotal,q.quoteexternalid__c,q.createddate, qli.discount,qli.sfid as qliSfid, p.name,productCode ,qli.quantity,qli.unitPrice,p.duration__c,q.name as quoteName,q.sfid as quotesfid from salesforce.quotelineitem as qli  ,salesforce.product2 as p,salesforce.quote as q  where qli.quoteId=q.sfid and p.sfid=qli.product2Id and qli.quoteId in (select sfid from salesforce.quote where accountId=(select sfid from salesforce.account where accountExternalId__c=$1))"
    // removed "  and q.status='Draft' "
    const values=[req.decodedToken.cin]
    client.query(text,values,function(error,data){
      //console.log('deed')
      if(error){
        console.log("error",error)
      }
      
      else{
        console.log("quotes",data.rows)
       res.json(data.rows)
  
      }
    })
  });
  

  app.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: "Hello :"+req.decodedToken.name+" The Total price is :",
            },
            unit_amount:req.body.totalPrice,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:  process.env.DOMAIN+"/account/?pid=contracts",
      cancel_url:  process.env.DOMAIN+"/?pid=stripepaymentcancel",
    });
    res.json({ id: session.id });
  });

  app.put('/sendemail',function(req,res){
    text="update  salesforce.quote set sendemail__c=$2 where sfid=$1 "
    values=[req.body.sfid,req.body.emailValue]
    console.log("email",values)
    client.query(text,values,function(error,data){
      if (error){
        console.log("error: ",error)
      }
      else{
      console.log('aliii',data.rows)
      res.json({msg:'mail send'})
      }
    })
    })
    app.delete('/deletequote', function(req, res) {
      const  text="delete from salesforce.quotelineItem where quoteId=(select sfid from salesforce.quote where quoteexternalId__c=$1) "
      const values=[req.body.quoteExternalId]
    client.query(text,values,function(error,data){
      if(error){
        console.log("error",error)
      }
      else{
        //
        const  text="delete from salesforce.quote where sfid=$1 "
        const values=[req.body.sfid]
        client.query(text,values,function(error,data){
          if(error){
            console.log("error",error)
          }
          else{
            res.json({msg:'quote,quoteLi deleted'})


              }
            })

          }
        })
      }
    )
    app.delete('/deleteopp',function(req,res){

      const text="delete from salesforce.opportunityLineItem where opportunityId=(select sfid from salesforce.opportunity where opportunityExternalId__c=$1)"
      const values=[req.body.quoteExternalId]
      console.log("qExId",values)
      client.query(text,values,function(error,data){
        if(error){
          console.log("error",error)
        }
        else{
          console.log("deleteopp",data.rows)
          const text="delete from salesforce.opportunity where opportunityExternalId__c=$1"
          const values=[req.body.quoteExternalId]
          client.query(text,values,function(error,data){
            if(error){
              console.log("error",error)
            }
            else{
              console.log("delete opp",data.rows)
              res.json({msg:'opp,oppli deleted'})
            }
    })
  }
})
 })

 app.post('/insertcontract', function(req, res) {
  const text="update salesforce.opportunity set  stageName='Closed Won' where opportunityExternalId__c=$1"
  const values=[req.decodedToken.cin]
 client.query(text,values,function(error,data){
   if(error){
     console.log("error",error)
   }
  
       else{
         console.log("contract",data.rows)
         res.json({msg:'contract added'})
       }
 })


  // const text ="INSERT INTO salesforce.contract (accountId,status,StartDate,ContractTerm,contractExternalId__c,sendEmail__c) VALUES((select sfid from salesforce.account where accountEXternalId__c=$1),'Draft','2022-12-31',12,$2,'0') RETURNING *"
  // const values=[req.decodedToken.cin,req.body.contExternalId__c]
  // client.query(text,values,function(error,data){
  //   if(error){
  //     console.log("error",error)
  //   }
  //   else{
    //kenet lenna 
  //   }
  // })
  });

app.get('/draftcontracts',function(req,res){
  //select c.sfid as contractsfid,c.status, c.ContractTerm,c.StartDate,c.EndDate,q.sfid as quotesfid, q.grandTotal, p.name,p.duration__c from salesforce.contract as c,salesforce.quote as q  ,salesforce.quotelineitem as qli ,salesforce.product2 as p where c.status='Draft' and qli.quoteId=q.sfid and  p.sfid=qli.product2Id and q.contractId=c.sfid and c.accountId=(select sfid from salesforce.account where accountexternalId__c=$1)
  const text="select sfid, status from salesforce.contract where status='Draft' and accountId=(select sfid from salesforce.account where accountexternalId__c=$1)"
  // select sfid, status from salesforce.contract where accountId=(select sfid from salesforce.account where accountexternalId__c='00000009')
  const values=[req.decodedToken.cin]
  client.query(text,values,function(error,data){
 
    if (error){
      console.log(error)
      console.log("chnou ? ghadi ? ")
    }
    else{
      console.log(values)
      console.log(data.rows)
      res.json(data.rows)
    }
  })
  
})

app.get('/activatedcontracts',function(req,res){
  
  const text="select sfid, status from salesforce.contract where status='Activated' and accountId=(select sfid from salesforce.account where accountexternalId__c=$1)"
  const values=[req.decodedToken.cin]
  client.query(text,values,function(error,data){
 
    if (error){
      console.log(error)
      console.log("chnou ? hné ? ")
    }
    else{
      //console.log(data.rows)
      res.json(data.rows)
    }
  })
  
})

app.put('/sendemailContract',function(req,res){
  text="update salesforce.contract set sendemail__c=$1 where sfid=$2 "
  values=[req.body.emailValue,req.body.sfid]
  console.log("email",values)
  client.query(text,values,function(error,data){
    if (error){
      console.log("error: ",error)
    }
    else{
    console.log('aliii',data.rows)
    res.json({msg:'mail send'})
    }
  })
  })
app.put('/activateContract',function(req,res){
    const text="update salesforce.contract set status='Activated',StartDate=$2,contractterm=$3 where accountId=(select sfid from salesforce.account where accountexternalId__c=$1)"
    const values=[req.decodedToken.cin,req.body.startdate,req.body.contractterm]
    console.log("email",values)
    client.query(text,values,function(error,data){
      if (error){
        console.log("error: ",error)
      }
      else{
      //console.log('aliii',data.rows)
      res.json({msg:'mail send'})
      }
    })
    })


app.post('/insertreview',function(req,res){
  const text='insert into salesforce.product_review__c (reviewExternalId__c,review__c,commercialExternalInfo__c,Product__c,dislikes__c,likes__c) values ($1,$2,(select sfid from salesforce.commercialExternalInfos__c where cin__c=$4),(select product2Id from salesforce.pricebookentry where sfid=$3),0,0) RETURNING *'
  const values=[req.body.reviewExternalId__c,req.body.review,req.body.pbesfid,req.decodedToken.cin]
  console.log('sfiidddd',req.body.pbesfid)
  client.query(text,values,function(error,data){if (error){
    console.log("error: ",error)
  }
  else{
  console.log('aliii',data.rows)
  res.json({msg:'mail send'})
  }

  })
})
if (env==='production'){
  app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./front/build", "index.html"));
});
 
}
