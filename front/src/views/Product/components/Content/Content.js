import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Typography,ImageList as GridList,ImageListItem as  GridListTile, IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import { Image } from 'components/atoms';
import {InfoCard} from './InfoCard'

const useStyles = makeStyles(theme => ({
  section: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  image: {
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
  },
  socialIcon: {
    borderRadius: 0,
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    background: theme.palette.alternate.main,
    '&:last-child': {
      marginRight: 0,
    },
  },
  sectionSocialMedia:{
    marginBottom:theme.spacing(5),
    justifyContent:'flex-start',
    [theme.breakpoints.up('md')]: {
      justifyContent:'center',
    },
    
  }
}));

const Content = props => {
  const {info,data, className, ...rest } = props;
  

  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  return (
    <div className={className} {...rest}>
      <div className={classes.section}>
        {
          info.description &&
          <Typography component="p" variant="h6" color="textPrimary">
          {info.description.substring(0,info.description.length/2)}...
        </Typography>
        }
      </div>
      <div className={classes.section}>
        <Image
          src={info.picture_url__c}
          className={classes.image}
          lazyProps={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className={classes.section}>
        <Typography component="p" variant="h4" color="primary" align="center">
          "{info.marketingquote__c}"
        </Typography>
      </div>
      <div className={classes.section}>
        {
          info.description  &&
            <Typography component="p" variant="h6" color="textPrimary">
            ...{info.description.substring(info.description.length/2,info.description.length)}
          </Typography>
        }
       
      </div>
      <div className={classes.sectionSocialMedia}>
        <IconButton className={classes.socialIcon}>
          <FacebookIcon />
        </IconButton>
        <IconButton className={classes.socialIcon}>
          <InstagramIcon />
        </IconButton>
        <IconButton className={classes.socialIcon}>
          <TwitterIcon />
        </IconButton>
        <IconButton className={classes.socialIcon}>
          <PinterestIcon />
        </IconButton>
      </div>
      <InfoCard info={info}/>
      <div className={classes.section}>
       {
          info.otherimageslinks__c &&
          <GridList
          rowHeight={isMd ? 360 : 260}
          cols={2}
          gap={isMd ? 24 : 8}
          >
          {info.otherimageslinks__c.split(';').map((item, index) => (
            <GridListTile key={index} cols={index<1 ? 2 : 1}>
              <Image
                alt='alt'
                src={item}
                className={classes.image}
                lazyProps={{ width: '100%', height: '100%' }}
              />
            </GridListTile>
          ))}
          </GridList>
       }
      </div>
     
    </div>
  );
};

Content.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.object.isRequired,
};

export default Content;
