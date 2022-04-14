import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider, useMediaQuery } from '@material-ui/core';
import { Grid, Button, Typography } from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import axios from 'axios';
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
  const [data,setData]=React.useState([])
  const[quotes,setQuotes]=React.useState([])
  const [quotelineitems,setQuotelineitems]=React.useState([])
  const [refresh,setRefresh]=React.useState(true)
  const months=['Jun','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
  
  React.useEffect(() => {
    const config = {
      headers:{
        authorization:localStorage.getItem('jwt')
        
      }
    };
    const url =process.env.REACT_APP_DOMAIN+'/wishlistgetquotes';
    
    axios.get(url,config)
    .then(reslt=>{
      setQuotelineitems(reslt.data)
       let quotesInter=[
       
       ]
       let Ids=[]
       for (let i=0;i<reslt.data.length;i++){
         if(Ids.indexOf(reslt.data[i].quotesfid)===-1){
          const dateAdded=reslt.data[i].createddate
          const date=months[(new Date(dateAdded)).getMonth()]+"  " + (new Date(dateAdded)).getDate()+","+(new Date(dateAdded)).getFullYear()
          quotesInter.push({
             sfid:reslt.data[i].quotesfid,
             name:reslt.data[i].quotename,
             createddate:date,
             quoteExternalId:reslt.data[i].quoteexternalid__c,
             qli:[],
             discount:reslt.data[i].discount
            })
            Ids.push(reslt.data[i].quotesfid)
         }
       }
       for (let i=0;i<reslt.data.length;i++){
         for(let j=0;j<Ids.length;j++){
          if(reslt.data[i].quotesfid===quotesInter[j].sfid){
            quotesInter[j].qli.push(reslt.data[i])
          }
         }
       }
       setQuotes(quotesInter)
    })
    .catch(err=>{
      console.log("errr",err)
     
      
    
    })
  
  
  },[refresh]);
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

  const handleClick = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    const totalprice = 0;
    //const body = { Pname, tp };
    const response = await fetch(
      process.env.REACT_APP_DOMAIN + '/create-checkout-session',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('jwt') },
        //body: JSON.stringify(body),
      },
    );
    //console.log(body);
    const session = await response.json();
    console.log('sessionnnnnn');
    console.log(session);
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log('mamchetchi');
      console.log(result.error.message);
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  const sendEmail =(sfid)=>{
    console.log("sdszdzzddz",sfid)
    const form={
      sfid:sfid
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
      
    })
    .catch(err=>
      console.log("signup err",err))
    
     
  }
  

  return (
    <div className={className} {...rest}>
       {console.log("oiokoikzsoi",quotes)}
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
      <Grid container justifyContent="center">

        {quotes.map((item, index) => (
            
          <Grid
            key={index}
            item
            container
            data-aos={'fade-up'}
            justifyContent={isMd ? 'space-between' : 'center'}
            spacing={isMd ? 4 : 2}
            className={classes.listGrid}
            direction={'row-reverse' }
          >
              
            <Grid item container xs={12} sm={12} md={12} justifyContent="center">
              
              <SectionHeader
                label={"Added: "+item.createddate }
                title={'quote n°'+(index+1)}
                subtitle2={"id :"+item.sfid}
                subtitle1={item.discount?"discount: "+item.discount:"discount: 0%"}
                align={'center'}
                disableGutter
              />
            </Grid>
            <Grid container justifyContent='flex-start' item xs={12}>
            <TableQuote discount={item.discount} rows={item.qli}/>
            </Grid>
            <Grid item container xs={12}  justifyContent={"center"} >
            <Button
                  width={isMd?'auto':'100%'}
                  variant="outlined"
                  color="secondary"
                  size={isMd ? 'large' : 'medium'}
                  onClick={()=>deleteItem(item.sfid,item.quoteExternalId)}
                >
                 <DeleteIcon/>
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size={isMd ? 'large' : 'medium'}
                  onClick={handleClick}
                >
                Buy Now!
                </Button>
                <Button
                  variant="outlined"
                  color='secondary'
                  size={isMd ? 'large' : 'medium'}
                  onClick={()=>sendEmail(item.sfid)}
                >
                 <EmailIcon/>
                </Button>
            </Grid>
           
            {
            index <quotes.length-1 &&
            <Grid item xs={12} m={2}>
              <Divider/>
            </Grid>
            }
          </Grid>
       
        ))}
        </Grid>
        
        
       
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
 