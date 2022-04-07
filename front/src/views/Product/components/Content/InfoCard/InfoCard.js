import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { SectionAlternate } from 'components/organisms';
import { DescriptionCta } from 'components/molecules';
import { Button, Typography, Grid ,Box,useMediaQuery,Divider} from '@material-ui/core';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const useStyles = makeStyles(theme => ({
   conatiner:{
      marginBottom:'20px',
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
    width:'auto%'

  },
  }));
  
export default function InfoCard({info,sfids,wishListHandler}) {
    const classes =useStyles();
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
      defaultMatches: true,
    });
  return (
   <SectionAlternate className={classes.conatiner}>
        <DescriptionCta
        title="Service informations "
        primaryCta={
          <>
           {
             sfids.indexOf(info.pbesfid)!==-1?
             (
              <Button color={'primary'}>
                         <FavoriteIcon/>
                       </Button>
          )
             :
             (
             <Button color="primary" onClick={()=>wishListHandler(info.product2id,info.unitprice,info.numberofusers__c,info.name,info.picture_url__c,info.pbesfid)}>
              <FavoriteBorderIcon fontSize={'large'}/>
              {console.log('sfidddssss',sfids)}
            </Button>
             )
           }
          <Button variant="outlined" color="primary" size={isSm ?"large":"small"}>
            Add to card 
          </Button>
          </>
          
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
      <Grid container  justifyContent='flex-start'>
         {
          info.name &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          title: 
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          {info.name}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
         {
          info.provider__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          Provider :
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          {info.provider__c}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
         {
          info.unitprice &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          Price :
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          {info.unitprice}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
         {
          info.duration__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          duration :
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          {info.duration__c /12} years
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
         {
          info.numberofusers__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          subscription valid for:
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          { info.numberofusers__c}  person 
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
             {
          info.sales_figure__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          sales figure :
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          { info.sales_figure__c}$
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
         {
          info.numberofsubcribers__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          number of subcribers :
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          { info.numberofsubcribers__c}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
          {
          info.siteurl__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          website :
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          { info.siteurl__c}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
        {
          info.tags__c &&
          <Grid item  xs={12}>
          <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
          <Typography
          color="primary"
           variant="h6"
          className={classes.tag}
          
        >
          key words :
        </Typography>
        <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
          { info.tags__c.replaceAll(';','  ')}
        </Typography>
          </Box>
          <Divider/>
        </Grid>
         }
      </Grid>
      
   </SectionAlternate>
  )
}
