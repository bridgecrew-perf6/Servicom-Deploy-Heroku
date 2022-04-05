import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
} from '@material-ui/core';
import axios from 'axios';
import validate from 'validate.js';

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));
const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 300,
    },
  },
  fullname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 120,
    },
  },
  
  company: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 120,
    },
  },
  cin: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20,
      minimum:8,
    },
  },
  role: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 120,
    },
  },
  bio: {
    presence: { allowEmpty: false, message: 'is required' },
   
  },
  photo: {
    presence: { allowEmpty: false, message: 'is required' },
   
  },
};
const General = props => {
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  React.useEffect(()=>{
    
    const config = {
      headers:{
        authorization:localStorage.getItem('jwt')
        
      }
    };
    const url =process.env.REACT_APP_DOMAIN+'/userInfos';
    
    axios.get(url,config)
    .then(reslt=>{
      console.log("reeeeesGeneral",reslt.data)
      setFormState(formState=>({
        ...formState,
        values:{
          fullname:reslt.data.name,
          cin:reslt.data.cin__c,
          bio:reslt.data.bio__c,
          company:reslt.data.company__c,
          role:reslt.data.role__c,
          photo:reslt.data.profilephoto__c,
          email:reslt.data.email__c,
          
        }
      })
       
      )
      
      
    })
  },[])

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
    console.log("f west l save")
    if (formState.isValid) {
      console.log("f west l if")
      const form=formState.values
      const config = {
        headers:{
          authorization:localStorage.getItem('jwt')
          
        }
      };
      const url =process.env.REACT_APP_DOMAIN+'/userInfos';
      axios.put(url,form,config)
      .then(reslt=>{
        localStorage.setItem('jwt',reslt.data.token)
          window.location.replace('/account/?pid=infos');
        
      })
      .catch(err=>
        console.log("signup err",err))
      
       
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


  const { className, ...rest } = props;

  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
    <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Basic Information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Full name
          </Typography>
          <TextField
            placeholder="Your full name"
            variant="outlined"
            size="medium"
            name="fullname"
            fullWidth
            helperText={
              hasError('fullname') ? formState.errors.fullname[0] : null
            }
            error={hasError('fullname')}
            onChange={handleChange}
            type="fullname"
            value={formState.values.fullname || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            CIN
          </Typography>
          <TextField
            placeholder="Your cin "
            variant="outlined"
            size="medium"
            name="cin"
            fullWidth
            helperText={
              hasError('cin') ? formState.errors.cin[0] : null
            }
            error={hasError('cin')}
            onChange={handleChange}
            type="cin"
            value={formState.values.cin ||" "}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            E-mail
          </Typography>
          <TextField
            placeholder="Your e-mail address"
            variant="outlined"
            size="medium"
            name="email"
            fullWidth
            type="email"
            helperText={
              hasError('email') ? formState.errors.email[0] : null
            }
            error={hasError('email')}
            onChange={handleChange}
            value={formState.values.email || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Bio
          </Typography>
          <TextField
            placeholder="Your bio"
            variant="outlined"
            name="bio"
            fullWidth
            multiline
            rows={4}
            helperText={
              hasError('bio') ? formState.errors.bio[0] : null
            }
            error={hasError('bio')}
            onChange={handleChange}
            type="bio"
            value={formState.values.bio || ""}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            company
          </Typography>
          <TextField
            placeholder="company"
            variant="outlined"
            size="medium"
            name="company"
            fullWidth
            helperText={
              hasError('company') ? formState.errors.company[0] : null
            }
            error={hasError('company')}
            onChange={handleChange}
            type="company"
            value={formState.values.company || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Role
          </Typography>
          <TextField
            placeholder="role"
            variant="outlined"
            size="medium"
            name="role"
            fullWidth
            helperText={
              hasError('role') ? formState.errors.cin[0] : null
            }
            error={hasError('role')}
            onChange={handleChange}
            type="role"
            value={formState.values.role || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
           Photot url
          </Typography>
          <TextField
            placeholder="Please insert your photo's url"
            variant="outlined"
            size="medium"
            name="photo"
            fullWidth
            type="photo"
            helperText={
              hasError('photo') ? formState.errors.photo[0] : null
            }
            error={hasError('photo')}
            onChange={handleChange}
            value={formState.values.photo ||""}            
          />
        </Grid>
        <Grid item container justifyContent="flex-start" xs={12}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
          >
            save
          </Button>
        </Grid>
      </Grid>
    </form>
    </div>
  );
};

General.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default General;
