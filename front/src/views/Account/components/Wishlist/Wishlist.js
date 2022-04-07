import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider, useMediaQuery } from '@material-ui/core';
import { Grid, Button, Avatar, Typography } from '@material-ui/core';
import { Image, LearnMoreLink } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import axios from 'axios';

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

const Wishlist = props => {
  const { className, ...rest } = props;
  const [addedtowishlist,setAddedtowishlist]=React.useState(true)
  const [data,setData]=React.useState([])

  React.useEffect(() => {
    const config = {
      headers:{
        authorization:localStorage.getItem('jwt')
        
      }
    };
    const url =process.env.REACT_APP_DOMAIN+'/wishlistssingles';
    console.log('efrfrf')
    axios.get(url,config)
    .then(reslt=>{
       console.log('reslttttt',reslt.data)
       setData(reslt.data)
    })
    .catch(err=>{
      console.log("errr",err)
      
    
    })
  
  
  },[]);
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const deleteAll = ()=>{
    
  }
  return (
    <div className={className} {...rest}>
       
      <SectionHeader
        title={
          <span>
            We’re focused on{' '}
            <Typography color="secondary" variant="inherit" component="span">your safety, not ours</Typography>
          </span>
        }
        subtitle2="we provide you with the best deals at the lowest prices to make the world a safer place."
        fadeUp
      /> 
      <Grid container justifyContent="center">
        {data.map((item, index) => (
            
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
              {console.log('item',item)}
            <Grid item container xs={12} sm={12} md={7} alignItems="center">
              <SectionHeader
                label={item.name}
                title={"Pack price : "+ item.unitprice+"$"}
                subtitle1={"Quantity : "+item.quantity+" persons"}
                subtitle2={item.duration__c!==null?"Duration: "+item.duration__c+" months":undefined}
                ctaGroup={[
                  <Button
                    variant="outlined"
                    color="secondary"
                    size={isMd ? 'large' : 'medium'}
                  >
                    Book now
                  </Button>,
                  <Button
                  variant="outlined"
                  color="primary"
                  size={isMd ? 'large' : 'medium'}
                >
                  delete service
                </Button>,
                ]}
                align={isMd ? 'left' : 'center'}
                disableGutter
              />
            </Grid>
            <Grid item container justifyContent="center"  xs={12} sm={12} md={5}>
              <Avatar
                alt={'image'}
                src={item.description.split(';')[1]}
                className={classes.teamAvatar}
              />
            </Grid>
            {
            index <data.length-1 &&
            <Grid item xs={12} m={2}>
              <Divider/>
            </Grid>
            }
          </Grid>
         
        ))}
        </Grid>
        
        
           <Grid item container justifyContent='center' style={{marginTop:30}}  xs={12}>
           <Button
                    variant="outlined"
                    color="secondary"
                    size={isMd ? 'large' : 'medium'}
                    
                    >
                    Book all  now
                  </Button>
        
           <Button
                  variant="outlined"
                  color="primary"
                  size={isMd ? 'large' : 'medium'}
                  style={{marginLeft:10}}
                  onClick={deleteAll}
                >
                  {isMd ? 'delete all services':'delete all '}
                </Button>
        </Grid>

       
    </div>
  );
};

Wishlist.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  
};

export default Wishlist;
/**
 *  
 */