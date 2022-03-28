import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import {  SectionAlternate } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  tags: {
    display: 'flex',
    
    justifyContent:'center',
    width:'100%',
   
  },
  tag: {
    padding: theme.spacing(1 / 2, 1),
    color:'white',
    border: `1px solid ${theme.palette.secondary.light}`,
    fontWeight: 600,
    borderRadius: theme.spacing(1),
    background: `${theme.palette.secondary.light}`,
    margin: theme.spacing(0, 1, 1, 0),
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2, 2, 0),
      padding: theme.spacing(1, 2),
    },
    '&:hover': {
      color: `${theme.palette.secondary.main}`,
      background: 'white',
    },
  },
  
}));

const Tags = ({tags,className, ...rest }) => {
  //const [tags, setTags]=useState(null)
  
  const classes = useStyles();

  return (
    <SectionAlternate sx={{width:'inherint'}} className={className} {...rest}>
     
      <Box className={classes.tags}>
        {tags.map((item, index) => (
          <Typography
          variant="body2"
          color="primary"
          className={classes.tag}
          key={index}
        >
          {item.tags__c.split(";")[0]}
        </Typography>
        ))}
      </Box>
     {console.log("eaeae",tags)}
    </SectionAlternate>
  );
};

Tags.propTypes = {
  /**
   * External classes
   */
  tags:PropTypes.array.isRequired,
  className: PropTypes.string,

  /**
   * data to be rendered
   */
};

export default Tags;
