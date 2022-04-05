//
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import axios from 'axios';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider ,Button} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  container:{
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.primary ,
   //border:'2px solid black',
    marginRight:theme.spacing(3),
    marginLeft:theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginRight:theme.spacing(-5),
    marginLeft:theme.spacing(0),
    },
    
  },
  avatar:{
    [theme.breakpoints.down('md')]: {
      marginRight:theme.spacing(-5),
    marginLeft:theme.spacing(2),
    },
  },
  collapse:{
    width:360,
    zIndex:9999,
    position:'absolute',
    backgroundColor: theme.palette.primary ,
  },
  item:{
    backgroundColor: theme.palette.primary ,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginRight:theme.spacing(-15),
      

    },
    
  },
  icon :{

    fontSize:40,
    marginLeft:theme.spacing(1)
  },
  link:{
    color:theme.palette.text.primary,
  }
})  
)
export default function Profile({themeMode}) {
  
  const [open, setOpen] = React.useState(false);
  const [data,setData]= React.useState([])
  React.useEffect(()=>{
    if(localStorage.getItem('jwt')){
      const config = {
        headers:{
          authorization:localStorage.getItem('jwt')
          
        }
      };
      const url =process.env.REACT_APP_DOMAIN+'/userPhoto';
      
      axios.get(url,config)
      .then(reslt=>
        setData(reslt.data))
    }
  },[])
  const handleClick = () => {
    setOpen(!open);
  };

  const classes=useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <div  className={classes.container}>
    <List
    component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon  className={classes.avatar}>
          <Avatar src={data.profilephoto__c}/>
        </ListItemIcon>
        {
          matches &&
          <ListItemText primary={"Hello ,"+data.name} />
          
        }
        {
          matches &&
          <>
           {open  ? <ExpandLess /> : <ExpandMore />}
          </>
        }
      </ListItemButton>
      {matches &&
      <Collapse in={open} timeout="auto" unmountOnExit className={classes.collapse}>
       <Paper className={classes.item}>
       <List component="div" disablePadding>
          <ListItemButton >
            <ListItemIcon>
              <PermIdentityIcon className={classes.icon} sx={{color: themeMode==='dark'? 'white':'primary' }} />
            </ListItemIcon>
              <Link to={'/account/?pid=infos'} >
                <ListItemText primary="Your profile" className={classes.link}/>
              </Link>
          </ListItemButton>
          <ListItemButton >
            <ListItemIcon>
              <FavoriteBorderIcon className={classes.icon} sx={{color: themeMode==='dark'? 'white':'primary' }} />
            </ListItemIcon>
            <Link to={"/account/?pid=wishlist"}>
            <ListItemText primary="Your wish list" className={classes.link}/>
            </Link>
          </ListItemButton>
          <ListItemButton >
            <ListItemIcon>
              <ShoppingCartCheckoutIcon className={classes.icon} sx={{color: themeMode==='dark'? 'white':'primary' }} />
            </ListItemIcon>
           <Link to={"/account/?pid=shoppingcart"}>
           <ListItemText primary="Buy now!" className={classes.link} />
           </Link>
          </ListItemButton>
          <ListItemButton >
            <ListItemIcon>
              <DescriptionIcon className={classes.icon} sx={{color: themeMode==='dark'? 'white':'primary' }} />
            </ListItemIcon>
            <Link to={"/account/?pid=contracts"}>
            <ListItemText primary="Your contracts" className={classes.link}/>
            </Link>
          </ListItemButton>
          <Divider/>
          <ListItemButton >
          <Link to='/'>
              <Button
                variant="contained"
                color="primary"
                target="blank"
                style={{width:matches? 320:160,fontWeight:600,marginTop:4}}
                onClick={()=>localStorage.removeItem("jwt")}
               
              >
              log out
              </Button>
            </Link>
          </ListItemButton>
          
          </List>
       </Paper>
      </Collapse>
      }
    </List>
    </div>
  )
}
