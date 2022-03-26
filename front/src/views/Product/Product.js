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
  const [sfid,setSfid]=useState(window.location.pathname.substring(window.location.pathname.lastIndexOf('/'),window.location.pathname.length))
  const [similar,setSimilar]=useState([])
  const [fam,setFam]=useState(localStorage.getItem("family"))
  useEffect(()=>{
    console.log('wake up')
    axios.get(process.env.REACT_APP_DOMAIN+'productss/product'+sfid)
    .then(response => {
      setInfo(response.data[0])
    })
    .catch((error) => {
      console.log(error);
    })

  },[])
  useEffect(()=>{
  
    axios.get(process.env.REACT_APP_DOMAIN+'smilarproduct/'+fam+sfid)
    .then(response => {
      setSimilar(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
  },[])
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
            <Content info={info} data={content} />
          </Grid>
        </Grid>
      </Section>
      <SectionAlternate>
        <SimilarStories family={fam} similar={similar} data={similarStories} />
      </SectionAlternate>
    
    </div>
  );
};

export default Product;
