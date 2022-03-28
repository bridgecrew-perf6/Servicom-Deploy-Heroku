/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Typography,
  ListItemIcon,
  Divider,
  Button,
  Box,
  IconButton,
} from '@material-ui/core';
import { Link } from "react-router-dom";

import CloseIcon from '@material-ui/icons/Close';
import { Image, } from 'components/atoms';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles(theme => ({
  root: {
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  navLink: {
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  logoContainer: {
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: 120,
      height: 32,
    },
  },
  logoImage: {
    width: '80%',
    height: '70%',
    paddingLeft:50
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  closeIcon: {
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },

  divider: {
    width: '100%',
  },
  socialIcon: {
    padding: 0,
    color:'priamry',
    
    marginRight: theme.spacing(1),
    '&:hover': {
      background: 'transparent',
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  icon: {
    fontSize: 24,
  },
}));

const SidebarNav = props => {
  const { pages, themeMode,onClose, className, ...rest } = props;
  const classes = useStyles();

  const MenuGroup = props => {
    var pagesdict={} ;
    for (let i=0;i<pages.length;i++){
      if (pages[i]==='Home'){
        pagesdict[pages[i]]=''
      }
      else{
        if(pages[i]==='Products'){
          pagesdict[pages[i]]=pages[i].toLowerCase().replace(" ","")+'/all';
        }
        else{
          pagesdict[pages[i]]=pages[i].toLowerCase().replace(" ","");
             }
        }
        
  }
    return (
      <List dense>
      
        {pages.map((page, i) => (
          <div  key={i} >
          <ListItem className={classes.listItem}>
            <Link to={"/"+pagesdict[page]}>
            <Typography
              variant="h5"
              color="textPrimary"
              gutterBottom
              onClick={() => onClose()}
            >
              {page}
            </Typography>           
            </Link>
          </ListItem>
           <ListItem className={classes.listItem}>
              <Divider className={classes.divider} />
           </ListItem>
          </div>
        ))}
      </List>
    );
  };



  
  return (
    <List {...rest} className={clsx(classes.root, className)}>
     
      <ListItem className={classes.closeIcon} onClick={() => onClose()}>
        <ListItemIcon className={classes.listItemIcon}>
          <CloseIcon fontSize="small" />
        </ListItemIcon>
      </ListItem>
      <ListItem className={classes.listItem}>
      <Box>
        <a href="/" title="thefront" >
          <Image
            className={classes.logoImage}
            src={themeMode === 'light' ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg' : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'}
            alt="thefront"
            lazy={false}
          />
        </a>
      </Box>
      </ListItem>
      <MenuGroup pages={pages}/>
      <ListItem  >
               <Box  display={"flex"} justifyContent={'center'}  width={"100%"} >
               <IconButton href='https://www.facebook.com/' >
                  <FacebookIcon className={classes.icon}  color="primary"/>
                </IconButton>
                <IconButton  href='https://www.instagram.com/'>
                  <InstagramIcon className={classes.icon} color="primary" />
                </IconButton>
                <IconButton  href='https://twitter.com/'>
                  <TwitterIcon className={classes.icon} color="primary" />
                </IconButton>
                <IconButton  href='https://www.linkedin.com/'>
                  <LinkedInIcon className={classes.icon} color="primary" />
                </IconButton>
               </Box>
              </ListItem>
              
            
     
      <ListItem className={classes.listItem}>
        <Link to={"/signin"} style={{width:'100%'}}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => onClose()}
        >
          sing in 
        </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
      <Link to={'/signup'} style={{width:'100%'}} > 
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onClose()}
        >
          sign up
        </Button>
        </Link>
      </ListItem>
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  themeMode: PropTypes.string.isRequired,

};

export default SidebarNav;
