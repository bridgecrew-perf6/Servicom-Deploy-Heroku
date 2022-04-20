import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import axios from 'axios';
import PasswordField from 'material-ui-password-field'
import validate from 'validate.js';
const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  switchTitle: {
    fontWeight: 700,
  },
  titleCta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const schema = {
  currentpassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minmum:8,
      maximum: 300,
    },
  },
  newpassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minmum:8,
      maximum: 120,
    },
  },
  repeatpassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minmum:8,
      maximum: 120,
    },
  },
}
const Security = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const[deleteacc,setDeleteacc]=React.useState("")
  const[pass,setPass]=React.useState(false)
  const[different,setDifferent]=React.useState(false)
  const[invalidpass,setInvalidpass]=React.useState(false)

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);
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
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    console.log('submit')
    console.log(formState.isValid &&formState.values.newpassword===formState.values.repeatpassword)
    setInvalidpass(false)
    if (formState.isValid &&formState.values.newpassword===formState.values.repeatpassword) {
      setDifferent(false)
      const form=formState.values
      const config = {
        headers:{
          authorization:localStorage.getItem('jwt')
          
        }
      };
      const url =process.env.REACT_APP_DOMAIN+'/userPassword';
      console.log('efrfrf')
      axios.put(url,form,config)
      .then(reslt=>{
        console.log(reslt)
          window.location='/account/?pid=infos';
        
      })
      .catch(err=>{
        console.log("errr",err)
        setInvalidpass(true)
      
      })
       
    }
    else{
      setDifferent(true)
    }

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const hasError = field =>
  formState.touched[field] && formState.errors[field] ? true : false;
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const handleDeleteSubmit = event=>{
    event.preventDefault();
    console.log("hds")
    setPass(false)
    if(deleteacc!=="" && deleteacc!==" "){
    
      const url =process.env.REACT_APP_DOMAIN+'/deleteaccount';
      axios.delete(url,{
        headers: {
          Authorization: localStorage.getItem('jwt')
        },
        data: {
          source: deleteacc
        }
      }
        )
      .then(reslt=>{
          console.log(reslt)
          localStorage.removeItem('jwt')
          window.location='/';
        
      })
      .catch(err=>{
        console.log("errr",err)
        setPass(true)
      
      })
    }
    else{
      setPass(true)
    }
  }
  const handleLogOut =()=>{
    localStorage.removeItem('jwt')
    window.location='/'
  }
  const handleDeleteChange = event => {
    event.persist();
    setDeleteacc(event.target.value)
    console.log("first",deleteacc)
  };

  return (
    <div className={className} {...rest}>
    <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
      <Grid container spacing={isMd ? 4 : 2} justifyContent='center'>
        <Grid item xs={12}>
          <div className={classes.titleCta}>
            <Typography variant="h6" color="textPrimary">
              Change Password
            </Typography>
           <Button variant="outlined" color="primary" onClick={handleLogOut} >
              Log out
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Current password
          </Typography>
          <PasswordField
            placeholder="Your current password"
            variant="outlined"
            size="medium"
            name="currentpassword"
            fullWidth
            
            helpertext={
              hasError('currentpassword') ? formState.errors.currentpassword[0] : null
            }
            error={hasError('currentpassword')}
            onChange={handleChange}
            type="currentpassword"
            value={formState.values.currentpassword || ''}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            New password
          </Typography>
          <PasswordField
            placeholder="new password"
            variant="outlined"
            size="medium"
            name="newpassword"
            fullWidth
            helpertext={
              hasError('newpassword') ? formState.errors.newpassword[0] : null
            }
            error={hasError('newpassword')}
            onChange={handleChange}
            type="newpassword"
            value={formState.values.newpassword || ''}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Repeat password
          </Typography>
          <PasswordField
            placeholder="repeat password"
            variant="outlined"
            size="medium"
            name="repeatpassword"
            fullWidth
            helpertext={
              hasError('repeatpassword') ? formState.errors.repeatpassword[0] : null
            }
            error={hasError('repeatpassword')}
            onChange={handleChange}
            type="repeatpassword"
            value={formState.values.repeatpassword || ''}
          />
        </Grid>
       {
         different &&
         <Grid item xs={12}>
         <Typography
           variant="subtitle1"
           style={{color:'red'}}
           className={classes.inputTitle}
         >
           passwords should match
         </Typography>
       </Grid>
       }
       {
         invalidpass &&
         <Grid item xs={12}>
         <Typography
           variant="subtitle1"
           style={{color:'red'}}
           className={classes.inputTitle}
         >
          invalid password
         </Typography>
       </Grid>
       }
        <Grid item container justifyContent="flex-end" xs={12}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
          >
            update
          </Button>
        </Grid>
      </Grid>
    </form>
    <form name="password-reset-form" method="post" onSubmit={handleDeleteSubmit}>
    <Grid container spacing={isMd ? 4 : 2}>
    <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Delete  account
            </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={9}>
        <PasswordField
            placeholder="insert password"
            variant="outlined"
            size="medium"
            name="deletepassword"
            fullWidth
            type="deletepassword"
            onChange={handleDeleteChange}
          />
        </Grid>
        
        <Grid item xs={12} md={3}>
          <div className={classes.titleCta}>
            <Button variant="outlined" type="submit" color="primary">
             delete account 
            </Button>
          </div>
        </Grid>
        {
         pass &&
         <Grid item xs={12}>
         <Typography
           variant="subtitle1"
           style={{color:'red'}}
           className={classes.inputTitle}
         >
          invalid password
         </Typography>
       </Grid>
       }
    </Grid>
    </form>
    </div>
  );
};

Security.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Security;
