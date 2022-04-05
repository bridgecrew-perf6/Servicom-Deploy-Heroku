import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { SectionAlternate } from 'components/organisms';
import { DescriptionCta } from 'components/molecules';
import { Button, Typography, Grid ,Box,useMediaQuery,Divider} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
   conatiner:{
      //margin:theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
       width:'100%'
      },
     
   },
   title: {
    fontWeight: 'bold',
  },
  descriptionCta: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  tag: {
    fontWeight: 700,
    //margin: theme.spacing(0, 0, 1, 0),
    width:'auto'

  },
  }));

export default function Infos() {
    const [info,setInfo]=React.useState([]);
    React.useEffect(()=>{
        const config = {
          headers:{
            authorization:localStorage.getItem('jwt')
            
          }
        };
        const url =process.env.REACT_APP_DOMAIN+'/userInfos';
        
        axios.get(url,config)
        .then(reslt=>{
          console.log("reeeees",reslt)
          setInfo(reslt.data)
        })
      },[])
    const classes =useStyles();
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
      defaultMatches: true,
    });
  return (
   <SectionAlternate className={classes.conatiner}>
         <DescriptionCta
        title="Account informations "
        primaryCta={
         <Link to={'/account/?pid=general'}>
            <Button variant="outlined" color="primary" size={isSm ?"large":"small"}>
            Edit
          </Button>
         </Link>
        }
        align={'left'}
        titleProps={{
          variant: isSm ? "h4":"h6",
          color: 'textPrimary',
          className: classes.title,
        }}
        className={classes.descriptionCta}
        data-aos="fade-up"
      />
      <Grid container justifyContent='flex-start' >
         {
          info.name &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:0,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          name: 
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          {info.name}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
         {
          info.email__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          Email :
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          {info.email__c}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
         {
          info.cin__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          CIN :
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          {info.cin__c}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
         
         {
          info.company__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          Company:
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          { info.company__c}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
         {
          info.role__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          Role:
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          { info.role__c}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
         {
           isSm &&info.profilephoto__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          Photo url :
        </Typography>
        <Typography color='textPrimary'  component="p" variant="body2"  style={{ marginLeft:'10px'}}>
          { info.profilephoto__c}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
          {
          info.bio__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          Bio :
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          { info.bio__c}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
        
      </Grid>
      
   </SectionAlternate>
  )

}
