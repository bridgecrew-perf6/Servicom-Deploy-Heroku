import React ,{ useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Content,
  Hero,
  SimilarStories,
} from './components';
import axios from 'axios';
import { content, similarStories } from './data';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sidebarNewsletter: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  footerNewsletterSection: {
    background: theme.palette.primary.dark,
  },
}));

const Product = () => {
  const [info,setInfo]=useState([])
  const sfid=(window.location.pathname.substring(window.location.pathname.lastIndexOf('/'),window.location.pathname.length))
  const [similar,setSimilar]=useState([])
  const [sfids,setSfids]=useState([])
  const [addedtowishlist,setAddedtowishlist]=useState(true)
  const fam=(localStorage.getItem("family"))
  useEffect(()=>{
    
    axios.get(process.env.REACT_APP_DOMAIN+'/productss/product'+sfid)
    .then(response => {
      setInfo(response.data[0])
    })
    .catch((error) => {
      console.log(error);
    })
    axios.get(process.env.REACT_APP_DOMAIN+'/smilarproduct/'+fam+sfid)
    .then(response => {
      setSimilar(response.data)
    })
    .catch((error) => {
      console.log(error);
    })

  },[])
  useEffect(() => {
    const config = {
      headers:{
        authorization:localStorage.getItem('jwt')
        
      }
    };
    const url =process.env.REACT_APP_DOMAIN+'/wishlists';
    console.log('efrfrf')
    axios.get(url,config)
    .then(reslt=>{
      var wl=[]
      for(let res of reslt.data){
        wl.push(res.description.split(";")[0])
      }
      setSfids(wl)
      
    })
    .catch(err=>{
      console.log("errr",err)
      
    
    })
  
  
  },[addedtowishlist]);
  
  const wishListHandler= (product2id,price,numberOfUsers__c,title,picture_url__c,pbesfid)=>{
    const form={
      opportunityProductExternalId__c:Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random() ,
      Description:pbesfid+";"+picture_url__c,
      Product2Id:product2id,
      UnitPrice:price,
      name:title,
      Quantity:numberOfUsers__c
    }
    const config = {
      headers:{
        authorization:localStorage.getItem('jwt')
        
      }
    };
    const url =process.env.REACT_APP_DOMAIN+'/wishlists';
    axios.post(url,form,config)
    .then(reslt=>{
      setAddedtowishlist(!addedtowishlist)
      console.log('resl result',reslt.data)
      //opportunityexternalid__c
      const url1=process.env.REACT_APP_DOMAIN+'/wishliststolineitem';
      const form1={
        opportunityProductExternalId__c:Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random().toString().substring(0,18) ,
        Description:pbesfid+";"+picture_url__c,
        Product2Id:product2id,
        UnitPrice:price,
        name:title,
        Quantity:numberOfUsers__c,
        opportunityexternalid__c:reslt.data[0].opportunityexternalid__c
      }
      console.log("oppextid",form1.opportunityexternalid__c)
      setTimeout(() => {
        axios.post(url1,form1,config)
        .then(reslt=>
          console.log('then',reslt.data))
        .catch(err=>
          console.log(err))
      }, 3000);
      
    })
    .catch(err=>{
      console.log("errr",err)
      
    
    })

  }
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        info.name &&
        <Hero
        cover={info.picture_url__c}
        title={info.name}
        subtitle={info.subtitle__c}
        author={info.username}
        authorPhoto={info.mediumphotourl}
        dateAdded={info.createddate}
      />
      }
      <Section>
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={10}>
            <Content info={info} data={content} wishListHandler={wishListHandler} sfids={sfids} />
          </Grid>
        </Grid>
      </Section>
      <SectionAlternate>
        <SimilarStories family={fam} similar={similar} data={similarStories} />
      </SectionAlternate>
    
    </div>
  );
};

export default Product
