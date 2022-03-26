import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid } from '@material-ui/core';
import { Image } from 'components/atoms';
import { DescriptionCta } from 'components/molecules';
import { CardProduct } from 'components/organisms';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  cardProduct: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(1),
    '& .card-product__content': {
      padding: theme.spacing(2),
    },
    '& .card-product__media': {
      minHeight: 300,
    },
  },
  image: {
    objectFit: 'cover',
  },
  blogTitle: {
    fontWeight: 700,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    fontWeight: 700,
    margin: theme.spacing(0, 1, 1, 0),
  },
  author: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(2),
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
}));

const SimilarStories = (props) => {
  const {data,family,similar,className, ...rest } = props;
 

  const classes = useStyles();

  const BlogMediaContent = props => (
    <Image
      src={props.src}
      alt={"image"}
      className={classes.image}
      lazyProps={{ width: '100%', height: '100%' }}
    />
  );

  const BlogContent = props =>{
    const months=['Jun','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
  const date=months[(new Date(props.dateAdded)).getMonth()]+"  " + (new Date(props.dateAdded)).getDate()+","+(new Date(props.dateAdded)).getFullYear()
  return(
    <Grid container justifyContent={'center'}>
      <div className={classes.tags}>
        {props.tags.split(';').map((item, index) => (
          <Typography
            variant="overline"
            color="primary"
            className={classes.tag}
            key={index}
          >
            {item}
          </Typography>
        ))}
      </div>
      <Typography
        variant="h6"
        color="textPrimary"
        className={classes.blogTitle}
        align="center"
      >
        {props.title}
      </Typography>
      <Typography
        variant="body2"
        color="textPrimary"
        className={classes.author}
        align="center"
      >
        <i>
          {props.author} - {date}
        </i>
      </Typography>
    </Grid>
  )};

  return (
    <div className={className} {...rest}>
      <DescriptionCta
        title="Similar products"
        primaryCta={
          <Link to={"/products/"+family}>
            <Button variant="outlined" color="primary" size="large">
            View all
          </Button>
          </Link>
        }
        align={'left'}
        titleProps={{
          variant: 'h4',
          color: 'textPrimary',
          className: classes.title,
        }}
        className={classes.descriptionCta}
        data-aos="fade-up"
      />
      <Grid container spacing={2} justifyContent='center'>
        {similar.map((item, index) => (
          <Grid item xs={12} sm={12} md={4} key={index} data-aos="fade-up">
           <CardProduct
              withShadow
              liftUp
              className={classes.cardProduct}
              mediaContent={
                <BlogMediaContent src={item.picture_url__c} />
              }
              cardContent={
                <BlogContent
                  title={item.name}
                  subtitle={item.subtitle__c}
                  author={item.username}
                  dateAdded={item.createddate}
                  tags={item.tags__c}
                />
              }
            />
           
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

SimilarStories.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default SimilarStories;
