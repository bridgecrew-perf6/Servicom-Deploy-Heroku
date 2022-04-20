import React from 'react'
import axios from 'axios'
import { Grid,Paper,Avatar, Typography,useMediaQuery,Box,Button,TextField } from '@material-ui/core';
import { makeStyles,useTheme } from '@material-ui/core/styles';
//import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
///import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import SendIcon from '@mui/icons-material/Send';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
const useStyles = makeStyles(theme => ({
  paper: {
    background:theme.palette.alternate.main,
    marginBottom:theme.spacing(3),
    borderRadius:"30px"
  },
  GRidPaper:{
    background:theme.palette.background.paper,
    //marginBottom:theme.spacing(3),
    borderRadius:"30px"
  },
  GridReview:{
    paddingLeft:theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(1),
    },
  }
})
)
const formatDate=(date="0")=> {
  if(date==='0'){
    var d = new Date()
  }
  else{
   d =new Date(date)
  }
  var month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

if (month.length < 2) 
  month = '0' + month;
if (day.length < 2) 
  day = '0' + day;

return [year, month, day].join('-');
}
const Comment=({review})=>{
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
    
  });


  return (
      <Grid container justifyContent={'center'}  style={{padding:"20px"}}>
          <Grid item container  xs={12}>
            <Grid item container xs={3} sm={2}   md={1} justifyContent='center'>
                {review.profilephoto__c ? 
                  <Avatar  alt={review.name}  src={review.profilephoto__c} style={{marginTop:"3px",width:"60px",height:"60px"}}/>
                  :
                  <Avatar style={{marginTop:"3px",width:"60px",fontSize:'24px',fontWeight:600,color:'whitesmoke',height:"60px",backgroundColor:'orange'}}>
                    {review.name.substring(0,1).toUpperCase()+review.name.substring(review.name.indexOf('')+1,review.name.indexOf('')+2).toUpperCase()}
                  </Avatar>
                }
            </Grid>
              <Grid item xs={9} sm={10} md={11} style={{paddingTop:isMd?"2px":"10px", paddingLeft:"5px"}}>
                <Typography variant="h5" color="textPrimary">
                  {review.name}
                </Typography>
                <Typography variant="body2" color="initial" >
                  {formatDate(review.createddate)}
                </Typography>
              </Grid>
          </Grid>
          <Grid item xs={12} className={classes.GridReview}>
          <Typography variant="h6" color="textPrimary">
              {review.review__c}
          </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display={"flex"} justifyContent={'flex-end'}> 
            <Button  color='secondary' >
                <ThumbUpIcon/>
                <Typography variant="h6">
                {" "+review.likes__c}
                </Typography>
            </Button>
            <Button>
              <ThumbDownAltIcon/>
              <Typography variant="h6">
              {review.dislikes__c}
              </Typography>
            </Button>
            </Box>
          </Grid>
      </Grid>
   
  )
}
const schema = {
  currentpassword: {
    presence: { allowEmpty: false, message: 'is required' },
   
  }
}

const AddComment = ({photo,refresh,setRefresh})=>{
  const [formState, setFormState] = React.useState({
    values: {},
  });
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
    
  });
  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  }
  const handleSubmit = event => {
    event.preventDefault();
    if (formState.values.currentpassword!==''){
      const form={
        review:formState.values.currentpassword,
        reviewExternalId__c:(Math.random()*Math.random()*Math.random()*Math.random()).toString(),
        pbesfid:(window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.length))

      }
      const config = {
        headers:{
          authorization:localStorage.getItem('jwt')
          
        }
      };
      const url =process.env.REACT_APP_DOMAIN+'/insertreview';
      axios.post(url,form,config)
      .then(reslt=>{
        console.log(reslt.data)
        setRefresh(!refresh)

       
      })
      .catch(err=>{
        console.log("errr",err)
        
      
      })
      
    }
   
  };
  return (
    <Grid container justifyContent={'center'}  style={{padding:"20px"}}>
      <Grid item container xs={3} sm={2}  md={1} justifyContent='center'>
          {photo.profilephoto__c ? 
            <Avatar  alt={photo.name}  src={photo.profilephoto__c} style={{width:"60px",height:"60px"}}/>
            :
            <Avatar style={{width:"60px",fontSize:'24px',fontWeight:600,color:'whitesmoke',height:"60px",backgroundColor:'orange'}}>
              {photo.name.substring(0,1).toUpperCase()+photo.name.substring(photo.name.indexOf('')+1,photo.name.indexOf('')+2).toUpperCase()}
            </Avatar>
          }
      </Grid>
    
      <Grid item xs={9} sm={10} md={11} style={{paddingTop:isMd?"2px":"10px", paddingLeft:"5px"}}>
          <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
           <TextField
            placeholder="Add comment here ......"
            variant="standard"
            size="medium"
            name="currentpassword"
            fullWidth
            className={classes.GRidPaper}
            onChange={handleChange}
            style={{ padding:'10px'}}
            type="currentpassword"
            value={formState.values.currentpassword || ''}
          />
            <Box display={"flex"} justifyContent={'flex-end'}> 
          <Button color='primary' style={{paddingTop:'10px'}} size='small' onClick={handleSubmit}>
            <SendIcon/>
          </Button>
          </Box>
          </form>
      </Grid>
    <Grid item xs={12}>
    
    </Grid>
</Grid>
  )
}

export default function Reviews() {
    const sfid=(window.location.pathname.substring(window.location.pathname.lastIndexOf('/'),window.location.pathname.length))
    const [refresh,setRefresh]=React.useState(false)
    const [reviews,setReviews]=React.useState([])
    const [photo,setPhoto]=React.useState({name:"",profilephoto__c:""})
    //const [likecomments,setLikecomments]=React.useState(false)
    //const [dislikeproduct,setDisikecproduct]=React.useState(false)

    React.useEffect(()=>{
        axios.get(process.env.REACT_APP_DOMAIN+'/reviews'+sfid)
    .then(response => {
        setReviews(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
    },[refresh])
    React.useEffect(()=>{
      const config = {
        headers:{
          authorization:localStorage.getItem('jwt')
          
        }
      };
      const url =process.env.REACT_APP_DOMAIN+'/userPhoto';
      axios.get(url,config)
      .then(response => {
      setPhoto(response.data)
      })
  .catch((error) => {
    console.log(error);
  })
  },[])
    
  const classes = useStyles();

  return (
      
    <div>
        {console.log('reviews',reviews)}
        {
          reviews.map((review,index)=>
            <Paper key={index} className={classes.paper}>
              <Comment review={review} like />
              
            </Paper>
          )
        }
        <Paper className={classes.paper}>
        <AddComment photo={photo} refresh={refresh} setRefresh={setRefresh}/>
        </Paper>
        </div>
  )
}
/**
 *    
 */