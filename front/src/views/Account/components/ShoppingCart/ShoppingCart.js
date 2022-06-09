import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider, useMediaQuery } from '@material-ui/core';
import { Grid, Button, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { SectionHeader } from 'components/molecules';
import axios from 'axios';

import './ShoppingCart.css'
import TableQuote from './TableQuote';
import { loadStripe } from '@stripe/stripe-js';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
const stripePromise = loadStripe('pk_test_o6V1ZtEs7uwZMEitsGsviEqU00Xup6rmOy');


const useStyles = makeStyles(theme => ({
  teamAvatar: {
    width: 200,
    height: 200,
    border: `${theme.spacing(1)}px solid ${theme.palette.background.paper}`,
    boxShadow: `0 2px 10px 0 ${theme.palette.cardShadow}`,
    marginTop: theme.spacing(1 / 2),
  },
  listGrid: {
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
    '&:last-child': {
      marginBottom: theme.spacing(0),
    },
  },
}));

const ShoppingCart = props => {
  const { className, ...rest } = props;
  const[quotes,setQuotes]=React.useState([])
  const [refresh,setRefresh]=React.useState(false)
  const [waiting ,setWaiting]=React.useState('x')
  const months=['Jun','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
  
  // React.useEffect(() => {
  //   if(localStorage.getItem('reloadShoppingCart')){
  //     setTimeout(()=>{
  //       localStorage.removeItem('reloadShoppingCart')
  //       window.location.reload()

  //     },4000)
  //   }
  //   const config = {
  //     headers:{
  //       authorization:localStorage.getItem('jwt')
        
  //     }
  //   };
  //   const url =process.env.REACT_APP_DOMAIN+'/wishlistgetquotes';
  //       axios.get(url,config)
  //       .then(reslt=>{
          
  //          let quotesInter=[
           
  //          ]
  //          let Ids=[]
  //          for (let i=0;i<reslt.data.length;i++){
  //            if(Ids.indexOf(reslt.data[i].quotesfid)===-1){
  //             const dateAdded=reslt.data[i].createddate
  //             const date=months[(new Date(dateAdded)).getMonth()]+"  " + (new Date(dateAdded)).getDate()+","+(new Date(dateAdded)).getFullYear()
  //             quotesInter.push({
  //                sfid:reslt.data[i].quotesfid,
  //                name:reslt.data[i].quotename,
  //                createddate:date,
  //                grandtotal:reslt.data[i].grandtotal,
  //                quoteExternalId:reslt.data[i].quoteexternalid__c,
  //                qli:[],
  //                discount:reslt.data[i].discount
  //               })
  //               Ids.push(reslt.data[i].quotesfid)
  //            }
  //          }
  //          for (let i=0;i<reslt.data.length;i++){
  //            for(let j=0;j<Ids.length;j++){
  //             if(reslt.data[i].quotesfid===quotesInter[j].sfid){
  //               quotesInter[j].qli.push(reslt.data[i])
  //             }
  //            }
  //          }
  //          setQuotes(quotesInter)
          
           
  //       })
  //       .catch(err=>{
  //         console.log("errr",err)
         
          
        
  //       })
       
   
  
  // },[refresh]);



  // retrieve quote line items
  const [data, setData] = useState([]);
  React.useEffect(() => {
    const config = {
      headers:{
        authorization:localStorage.getItem('jwt')
        
      }
    };
    const url =process.env.REACT_APP_DOMAIN+'/QuoteLineItems';
    
    axios.get(url,config)
    .then(reslt=>{
      
      setQuotes(reslt.data);
      setData(reslt.data);
       console.log("dataaaaaaa");
       console.log(reslt.data);
    })
    .catch(err=>{
      console.log("errr",err)
      
    
    })
  
  
  },[refresh]);


  var tp = 0;
  data.forEach((value, key) => {
    console.log(value.unitprice);
    tp = tp + value.unitprice * value.quantity;
    console.log('meeeeeeep');
    console.log(tp);
  });
 
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  
  
  const deleteItem =(sfid,quoteExternalId)=>{
    
    const url =process.env.REACT_APP_DOMAIN+'/deletequote';
    axios.delete(url,{
      headers: {
        Authorization: localStorage.getItem('jwt')
      },
      data: {
        sfid:sfid,
        quoteExternalId:quoteExternalId
        

      }
    }
      )
    .then(reslt=>{
        
        const url =process.env.REACT_APP_DOMAIN+'/deleteopp';
       axios.delete(url,{
         headers: {
         Authorization: localStorage.getItem('jwt')
      },
      data: {
        quoteExternalId:quoteExternalId
      }
    }
      )
      .then(resl=>{
        setRefresh(!refresh)
        console.log("delete",resl.data)
      })
      
    })
    .catch(err=>{
      console.log("errr",err)
     
    
    })
    
    
  }

  const handleClick = async (totalPrice,quoteSfid) => {
    // Get Stripe.js instance
    localStorage.setItem('quoteSfid',quoteSfid)
    const stripe = await stripePromise;
   
    const body = {totalPrice:tp*100};
    const response = await fetch(
      process.env.REACT_APP_DOMAIN + '/create-checkout-session',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('jwt') },
        body: JSON.stringify(body),
      },
    );
  
    const session = await response.json();
    console.log('sessionnnnnn');
    console.log('tottttt',totalPrice)
    console.log(session);
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error.message);
    
    }
  };

  const sendEmail =(sfid)=>{
    console.log("sdszdzzddz",sfid)
    setWaiting(sfid)
    const form={
      sfid:sfid,
      emailValue:((Math.random()*Math.random()*Math.random())+1).toString(),

    }
    const config = {
      headers:{
        authorization:localStorage.getItem('jwt')
        
      }
    };
    const url =process.env.REACT_APP_DOMAIN+'/sendemail';
    axios.put(url,form,config)
    .then(reslt=>{
      //localStorage.removeItem('jwt')
      //localStorage.setItem('jwt',reslt.data.token)
      console.log("resslt",reslt.data)
      setTimeout(()=>{
        setWaiting('x')
      },2000)
      
    })
    .catch(err=>


      
      console.log("signup err",err))

       
  }
  

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={
          <span>
            One more step  {' '}
            <Typography color="secondary" variant="inherit" component="span">to get your products</Typography>
          </span>
        }
        subtitle2="we provide you with the best deals at the lowest prices to make the world a safer place."
        fadeUp
      /> 
      {console.log('quId',quotes)}

      {/* ahmed */}
      <div >
      <h1 class="listselect">List of selected services</h1>
      <table class="table-box"> 
        <thead> 
          <tr className="flex">
            <th > SERVICE NAME </th>
            <th> UNIT PRICE </th> 
            <th> QUANTITY </th> 
          </tr>
        </thead>
        <tbody>
        {
        quotes.map((item, index) => (
          <tr key={index}>
            <td class="td1">{item.name}</td>
            <td>{item.unitprice}</td>
            <td>{item.quantity}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <div class="tp">TOTAL PRICE : {tp}€</div>
      <button class="button-36 " role="link" onClick={handleClick} >
        
        Proceed to Payment
      </button>
      
    </div>




      {
      //   quotes.length>0 &&
      // <Grid container justifyContent="center">

      //   {quotes.map((item, index) => (
            
      //     <Grid
      //       key={index}
      //       item
      //       container
      //       data-aos={'fade-up'}
      //       justifyContent={isMd ? 'space-between' : 'center'}
      //       spacing={isMd ? 4 : 2}
      //       className={classes.listGrid}
      //       direction={'row-reverse' }
      //     >
              
      //       <Grid item container xs={12} sm={12} md={12} justifyContent="center">
              
      //         <SectionHeader
      //           label={"Added: "+item.createddate }
      //           title={'quote n°'+(index+1)}
      //           subtitle2={"id :"+item.sfid}
      //           subtitle1={item.discount?"discount: "+item.discount:"discount: 0%"}
      //           align={'center'}
      //           disableGutter
      //         />
      //       </Grid>
      //       <Grid container justifyContent='flex-start' item xs={12}>
      //       <TableQuote discount={item.discount} rows={item.qli}/>
      //       </Grid>
      //       <Grid item container xs={12}  justifyContent={"center"} >
      //       <Button
      //             width={isMd?'auto':'100%'}
      //             variant="outlined"
      //             color="secondary"
      //             size={isMd ? 'large' : 'medium'}
      //             onClick={()=>deleteItem(item.sfid,item.quoteExternalId)}
      //           >
      //            <DeleteIcon/>
      //           </Button>
      //           <Button
      //             variant="contained"
      //             color="primary"
      //             size={isMd ? 'large' : 'medium'}
      //             onClick={()=>handleClick(item.grandtotal,item.sfid)}
      //           >
      //           Buy Now!
      //           </Button>
      //           <Button
      //             variant="outlined"
      //             color='secondary'
      //             size={isMd ? 'large' : 'medium'}
      //             onClick={()=>sendEmail(item.sfid)}
      //           >
      //            <EmailIcon/>
      //           </Button>
      //       </Grid>
        
      //       {waiting===item.sfid &&
      //     <Grid item xs={12}>
      //       <Button
      //       size="large"
      //       variant="contained"
      //       type="submit"
      //       style={{backgroundColor:'green',marginTop:'10px',color:'white',fontWeight:900}}
      //       fullWidth
      //     >
      //       sending email ..please check your inbox
      //     </Button>
      //     </Grid>
      //     }
            
      //       {
      //       index <quotes.length-1 &&
      //       <Grid item xs={12} m={2}>
      //         <Divider/>
      //       </Grid>
      //       }
      //     </Grid>
       
      //   ))}
      //   </Grid>
      }
    </div>
    
  );
};

ShoppingCart.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  
};

export default ShoppingCart;
 