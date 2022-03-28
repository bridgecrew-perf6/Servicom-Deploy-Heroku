import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Hidden,
  List,
  ListItem,
  Typography,
  IconButton,
  Button,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Image, DarkModeToggler } from 'components/atoms';

const useStyles = makeStyles(theme => ({
  flexGrow: {
    flexGrow: 1,
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    zIndex: 999,
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 8),
    },
  },
  navLink: {
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItem: {
    cursor: 'pointer',
    '&:hover > .menu-item, &:hover svg': {
      color: theme.palette.primary.dark,
    },
    '&.menu-item--no-dropdown': {
      paddingRight: 0,
    },
  },
  listItemActive: {
    '&> .menu-item': {
      color: theme.palette.primary.dark,
    },
  },
  listItemText: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
  },
  listItemButton: {
    whiteSpace: 'nowrap',
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  popover: {
    padding: theme.spacing(4),
    border: theme.spacing(2),
    boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
    minWidth: 350,
    marginTop: theme.spacing(2),
  },
  iconButton: {
    marginRight: theme.spacing(1),
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    color: theme.palette.primary.dark,
  },
  logoContainer: {
    width: "100%",
    height: 28,
    
    [theme.breakpoints.up('md')]: {
      width: 120,
      height: 32,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft:50
    },
    
  },
  logoImage: {
    width: '100%',
    height: '100%',
  
    
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItem: {
    marginRight: theme.spacing(5),
    '&:last-child': {
      marginRight: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
  },
}));

const Topbar = ({ themeMode, themeToggler, onSidebarOpen, pages, className, ...rest }) => {
  const classes = useStyles();
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const handleClick = (event, popoverId) => {

    setOpenedPopoverId(popoverId);
  };


  
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
    <Toolbar disableGutters className={classes.toolbar} {...rest}>
      <Hidden mdUp>
        <IconButton
          className={classes.iconButton}
          onClick={onSidebarOpen}
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
      <div className={classes.logoContainer}>
        <Link to={'/'} >
          <Image
            className={classes.logoImage}
            src={themeMode === 'light' ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg' : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'}
            alt="thefront"
            lazy={false}
          />
        </Link>
      </div>
      <div className={classes.flexGrow} />
      <Hidden smDown>
        <List disablePadding className={classes.navigationContainer}>
          {pages.map((page, i) => (
            <div key={page}>
              <ListItem
                aria-describedby={page.id}
                onClick={e => handleClick(e, page)}
                className={clsx(
                  classes.listItem,
                  openedPopoverId === page ? classes.listItemActive : '',
                )}
              >
                
                <Link to={"/"+pagesdict[page]}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    className={clsx(classes.listItemText, 'menu-item')}
                  >{page}
                  </Typography>
                  </Link>
              </ListItem>
              
            </div>
          ))}
          <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
            <DarkModeToggler themeMode={themeMode} onClick={() => themeToggler()} />
          </ListItem>
          <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
          
            <Link to="/signin">
            <Button
              variant="outlined"
              className={classes.listItemButton}
            >
                Sign in
            </Button>
            </Link>
            
          </ListItem>
          <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
            
              <Link to='/signup'>
              <Button
              variant="contained"
              color="primary"
              target="blank"
              className={classes.listItemButton}
            >
                sign up 
                </Button>
              </Link>
        
          </ListItem>
        </List>
      </Hidden>
      <Hidden mdUp>
        <DarkModeToggler themeMode={themeMode} onClick={() => themeToggler()} />
        <Avatar alt={'th'} style={{marginRight:0,marginLeft:20,width:30,height:30}}/>
      </Hidden>
    </Toolbar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.array.isRequired,
  themeToggler: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
};

/**
 * 
 */
export default Topbar;
