import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import axios from 'axios';
import './Result.css';
import {Link} from 'react-router-dom'
import {
  useMediaQuery,
  Button,
  Typography,
  Grid,
  Divider,
  Box,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Image } from 'components/atoms';
import { CardProduct, SectionAlternate } from 'components/organisms';
//import CreditCardIcon from '@material-ui/icons/CreditCard';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
const useStyles = makeStyles(theme => ({
  pagePaddingTop: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  },
  sectionAlternate: {
    '& .section-alternate__content': {
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
      },
    },
  },
  searchInputContainer: {
    background: theme.palette.alternate.main,
    padding: theme.spacing(2),
    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.11)',
    borderRadius: theme.spacing(1),
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '0 !important',
    },
    '& .MuiInputAdornment-positionStart': {
      marginRight: theme.spacing(2),
    },
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: 0,
    },
    '& .MuiOutlinedInput-input': {
      padding: 0,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  searchButton: {
    maxHeight: 45,
    minWidth: 135,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
  cardProduct: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: theme.spacing(1),
    '& .card-product__content': {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  image: {
    objectFit: 'cover',
    borderRadius: theme.spacing(0, 0, 20, 0),
  },
  blogContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  button: {
    minWidth: '100%',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      minWidth: 420,
    },
  },
  fontWeightBold: {
    fontWeight: 'bold',
  },
  answerCount: {
    padding: theme.spacing(1 / 2, 1),
    borderRadius: theme.spacing(1),
    background: theme.palette.secondary.light,
    color: 'white',
    fontWeight: 300,
  },
  priceCta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryIconButton: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
  icon:{
    fontSize:"40px",
    "&:before":{
      content: "\f00d",
    }
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
  tagClicked:{
    color: `${theme.palette.secondary.main}`,
    background: 'white',
    padding: theme.spacing(1 / 2, 1),
    border: `1px solid ${theme.palette.secondary.light}`,
    fontWeight: 600,
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0, 1, 1, 0),
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2, 2, 0),
      padding: theme.spacing(1, 2),
    },
  },
}));

const Result = props => {
  const {tags,className, ...rest } = props;
  const classes = useStyles();
  const [sfids,setSfids]=useState([])
  const [addedtowishlist,setAddedtowishlist]=useState(true)
  const [productsloaded,setProductsLoaded]=useState(6)
  const [tagClicked,setTagClicked]=useState(false)
  const [data,setData]=useState([])
  const [category,setCategory]=useState(window.location.pathname.substring(window.location.pathname.lastIndexOf('/'),window.location.pathname.length).replaceAll('%20',' '))
  useEffect(() => {
    axios.get(process.env.REACT_APP_DOMAIN+'/productss'+category)
    .then(response => {
      console.log(response.data);
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    })

},[tagClicked]);
useEffect(() => {
  const config = {
    headers:{
      authorization:localStorage.getItem('jwt')
      
    }
  };
  const url =process.env.REACT_APP_DOMAIN+'/wishlists';
  axios.get(url,config)
  .then(reslt=>{
    var wl=[]
    for(let res of reslt.data){
      wl.push(res.description.split(";")[0])
    }
    setSfids(wl)
  })
  .catch(err=>{
    console.log("errr",err)
    
  
  })


},[addedtowishlist]);


  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const loadMore =()=>{
    if(productsloaded<data.length){
      setProductsLoaded(productsloaded+6)
    }
  }
  const clickTagHandler=(item)=>{
    
    setCategory(item)
    setTagClicked(!tagClicked)
    window.history.pushState('', '', '/products'+item)

  }
  const BlogMediaContent = props => (
    <Image
      src={props.picture_url__c}
      className={classes.image}
      lazyProps={{ width: '100%', height: '250px' }}
    />
  );
  const cartButtons = document.querySelectorAll('.cart-button');

  cartButtons.forEach(button => {
    button.addEventListener('click', cartClick);
    console.log(button);
    console.log(cartButtons);
    console.log("leeeeeeel");
  });

  function cartClick() {
    console.log("ha chnouuuu");
    let button = this;
    console.log("ha chnouuuu");
    button.classList.add('clicked');
  }

  const wishListHandler= (product2id,price,numberOfUsers__c,title,picture_url__c,pbesfid)=>{
    const form={
      opportunityProductExternalId__c:Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random() ,
      Description:pbesfid+";"+picture_url__c,
      Product2Id:product2id,
      UnitPrice:price,
      name:title,
      Quantity:numberOfUsers__c
    }
    const config = {
      headers:{
        authorization:localStorage.getItem('jwt')
        
      }
    };
    const url =process.env.REACT_APP_DOMAIN+'/wishlists';
    axios.post(url,form,config)
    .then(reslt=>{
      console.log("data", form)
      console.log(reslt);
        console.log("resl",reslt.data)
      setAddedtowishlist(!addedtowishlist)
    })
    .catch(err=>{
      console.log("errrrr",err)
      
    
    })
    /**
     *  
     */

  }
  const BlogContent = props => (
    <div className={classes.blogContent}>
      
      <Typography variant="h6" color="textPrimary" gutterBottom>
        {props.title}
      </Typography>
      <Box overflow="hidden"
        textOverflow="ellipsis"
       >
      <Typography variant="body1" color="textSecondary" >
        {props.subtitle}......
      </Typography>
      </Box>
      <div style={{ flexGrow: 1 }} />
      <div className={classes.priceCta} style={{border:'0px solid black'}}>
                  <Typography
                    color="secondary"
                    variant="h5"
                    className={classes.fontWeightBold}
                  >
                    ${props.price}
                  </Typography>
                  {/*  */}
                  <Box>
                  {
                    //   <button className="cart-button">
                    //   <span className="add-to-cart">Add to cart</span>
                    //   <span className="added">Added</span>
                    //   <i className="fas fa-shopping-cart"></i>
                    //   <i className="fas fa-box"></i>
                    // </button>
                      sfids.indexOf(props.sfid )!==-1 ?
                      (<Button color={'primary'}>
                        <FavoriteIcon/>
                      </Button>)
                      :
                      (
                       <Button color={'primary'} onClick={()=>wishListHandler(props.product2id,props.price,props.numberOfUsers__c,props.title,props.picture_url__c,props.sfid)}>
                       <FavoriteBorderIcon/>
                       </Button>
                      )
                    }
                        
                        <Button onClick={()=>localStorage.setItem("family",props.family)}>
                       <Link to={'/products/product/'+props.sfid}>
                       <ArrowRightAltIcon
                          className={classes.icon}
                          color={'secondary'}  
                        />
                       </Link>
                    
                    </Button>
                  </Box>
                </div>
      
      <Divider className={classes.divider} />
      <div className={classes.list}>
        <div className={classes.avatarContainer}>
          <Avatar  src={props.fullphotourl}  className={classes.avatar} />
          <Typography variant="body2" color="textPrimary">
            {props.author}
          </Typography>
        </div>
        <Typography variant="overline" color="textSecondary">
          {(new Date(props.date)).getDay()+"/"+(new Date(props.date)).getMonth()+"/"+(new Date(props.date)).getFullYear()}
        </Typography>
      </div>
    </div>
  );

  return (
    <div className={className} {...rest}>
      <SectionAlternate className={classes.sectionAlternate}>
      <Grid container spacing={isMd ? 4 : 2}>
        {
          isMd && 
          
          <Grid  item xs={12}  container >
            <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  width:'100%',
                  borderRadius: 1,
                }}
                justifyContent={isMd ?'center':'flex-start'}
              >
          
              {tags.map((item, index) => (
                <Box  m={{xs:0.5,md:1}}  key={index} onClick={()=>clickTagHandler("/"+item.family)} > 
                {
                  item.family !== null &&
                  <Typography
                  variant="body2"
                  color="primary"
                  className={"/"+item.family===category ?classes.tagClicked:classes.tag}
                 
                >
                  {item.family}
                </Typography>
                }
              </Box>
              ))}
             </Box>
          </Grid>
        }
         
          <Grid item xs={12} container>
            <Typography variant="body1" className={classes.answerCount}>
              {data.length} Result Found
            </Typography>
          </Grid>
          {data.map((item, index) => (
              <Grid item xs={12} sm={6} key={index} md={4} data-aos="fade-up">
              {
                 index <productsloaded &&
                 <CardProduct
                withShadow
                liftUp
                className={classes.cardProduct}
                mediaContent={
                  <BlogMediaContent {...item} alt={item.name} />
                }
                cardContent={
                  <BlogContent
                    title={item.name}
                    subtitle={item.description}
             
                    date={item.createddate}
                    fullphotourl={item.mediumphotourl}
                    price={item.unitprice}
                    sfid={item.pbesfid}
                    family={item.family}
                    product2id={item.product2id}
                    numberOfUsers__c={item.numberofusers__c}
                    picture_url__c={item.picture_url__c}
                  />
                }
                
              />
              }
            </Grid>
            
          ))}
          <Grid item xs={12} container justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={()=>loadMore()}
              className={classes.button}
            >
              Load more
            </Button>
          </Grid>
        </Grid>
      </SectionAlternate>
    </div>
  );
};

Result.propTypes = {
 
  /**
   * data to be rendered
   */
  //data1: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,

  
};

export default Result;
