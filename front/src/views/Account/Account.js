import React from 'react';
import clsx from 'clsx';
import { parse } from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Grid, Typography } from '@material-ui/core';
import { SectionAlternate, CardBase } from 'components/organisms';
import { Hero, General, Security, Wishlist, ShoppingCart, Contracts,Infos } from './components';
import { Link } from 'react-router-dom';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sectionnn: {
    '& .section-alternate__content': {
      paddingTop: 0,
      marginTop: theme.spacing(-5),
      position: 'relative',
      zIndex: 1,
    },
    '& .card-base__content': {
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },
    },
  },
  menu: {
    height: 'auto',
  },
  list: {
    display: 'inline-flex',
    overflow: 'auto',
    flexWrap: 'nowrap',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(-3),
      marginLeft: theme.spacing(-3),
    },
  },
  listItem: {
    marginRight: theme.spacing(2),
    flex: 0,
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      borderLeft: '2px solid transparent',
    },
  },
  listItemActive: {
    [theme.breakpoints.up('md')]: {
      borderLeft: `2px solid ${theme.palette.primary.dark}`,
    },
    '& .menu__item': {
      color: theme.palette.text.primary,
    },
  },
}));

const subPages = [
  {
    id: 'infos',
    href: '/account/?pid=infos',
    title: 'Infos',
  },
  {
    id: 'general',
    href: '/account/?pid=general',
    title: 'General',
  },
  {
    id: 'security',
    href: '/account/?pid=security',
    title: 'Security',
  },
  {
    id: 'wishlist',
    href: '/account/?pid=wishlist',
    title: 'Wish List',
  },
  {
    id: 'shoppingcart',
    href: '/account/?pid=shoppingcart',
    title: 'Shopping Cart',
  },
  {
    id: 'contracts',
    href: '/account/?pid=contracts',
    title: 'contracts',
  },
];

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Box component="div" hidden={value !== index} {...other}>
      {value === index && children}
    </Box>
  );
};

const Account = () => {
  const classes = useStyles();
  let pageId = parse(window.location.search).pid || 'general';

  return (
    <div className={classes.root}>
      <Hero />
      <SectionAlternate className={classes.section}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <CardBase withShadow align="left" className={classes.menu}>
              <List disablePadding className={classes.list}>
                {subPages.map((item, index) => (
                  <ListItem
                    key={index}
                    className={clsx(
                      classes.listItem,
                      pageId === item.id ? classes.listItemActive : {},
                    )}
                    disableGutters
                  >
                    <Link to ={item.href}>
                    <Typography
                      variant="subtitle1"
                      noWrap
                      color="textSecondary"
                      className="menu__item"
                    >
                      {item.title}
                    </Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </CardBase>
          </Grid>
          <Grid item xs={12} md={9}>
            <CardBase withShadow align="left">
            <TabPanel value={pageId} index={'infos'}>
                <Infos/>
              </TabPanel>
              <TabPanel value={pageId} index={'general'}>
                <General />
              </TabPanel>
              <TabPanel value={pageId} index={'security'}>
                <Security />
              </TabPanel>
              <TabPanel value={pageId} index={'wishlist'}>
                <Wishlist/>
              </TabPanel>
              <TabPanel value={pageId} index={'shoppingcart'}>
                <ShoppingCart />
              </TabPanel>
              <TabPanel value={pageId} index={'contracts'}>
                <Contracts />
              </TabPanel>
            </CardBase>
          </Grid>
        </Grid>
      </SectionAlternate>
    </div>
  );
};

export default Account;
