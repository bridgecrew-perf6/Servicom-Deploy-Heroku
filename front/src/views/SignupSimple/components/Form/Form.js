import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, TextField } from '@material-ui/core';
import validate from 'validate.js';
import { LearnMoreLink } from 'components/atoms';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 120,
    },
  },
  lastName: {
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
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
    },
  },
};

const Form = () => {
  const classes = useStyles();

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const [result,setResult]=React.useState("")
  const [added,setAdded]=React.useState(false)
  const [exist,setExist]=React.useState(false)
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

    if (formState.isValid) {
      const form=formState.values
      console.log('form',form.password)
      axios.post(process.env.REACT_APP_DOMAIN+'/signups',form)
      .then(reslt=>{
        setExist(false)
        if(reslt.data.msg.indexOf('added')!==-1){
          localStorage.setItem('jwt',reslt.data.token)
          setAdded(true)
          setResult(reslt.data.msg);
          window.location.replace('/');
        }
        else{
         setExist(true)
          setResult(reslt.data.msg);
        }
        
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

  return (
    <div className={classes.root}>
      {console.log('result',result)}
      <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              placeholder="First name"
              label="First name *"
              variant="outlined"
              size="medium"
              name="firstName"
              fullWidth
              helperText={
                hasError('firstName') ? formState.errors.firstName[0] : null
              }
              error={hasError('firstName')}
              onChange={handleChange}
              type="firstName"
              value={formState.values.firstName || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Last name"
              label="Last name *"
              variant="outlined"
              size="medium"
              name="lastName"
              fullWidth
              helperText={
                hasError('lastName') ? formState.errors.lastName[0] : null
              }
              error={hasError('lastName')}
              onChange={handleChange}
              type="lastName"
              value={formState.values.lastName || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Company"
              label="Company *"
              variant="outlined"
              size="medium"
              name="company"
              fullWidth
              helperText={hasError('company') ? formState.errors.company[0] : null}
              error={hasError('company')}
              onChange={handleChange}
              type="company"
              value={formState.values.company || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Role"
              label="Role *"
              variant="outlined"
              size="medium"
              name="role"
              fullWidth
              helperText={hasError('role') ? formState.errors.role[0] : null}
              error={hasError('role')}
              onChange={handleChange}
              type="role"
              value={formState.values.role || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="CIN"
              label="CIN *"
              variant="outlined"
              size="medium"
              name="cin"
              fullWidth
              helperText={hasError('cin') ? formState.errors.cin[0] : null}
              error={hasError('cin')}
              onChange={handleChange}
              type="cin"
              value={formState.values.cin || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="E-mail"
              label="E-mail *"
              variant="outlined"
              size="medium"
              name="email"
              fullWidth
              helperText={hasError('email') ? formState.errors.email[0] : null}
              error={hasError('email')}
              onChange={handleChange}
              type="email"
              value={formState.values.email || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Password"
              label="Password *"
              variant="outlined"
              size="medium"
              name="password"
              fullWidth
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              error={hasError('password')}
              onChange={handleChange}
              type="password"
              value={formState.values.password || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <i>
              <Typography variant="subtitle2">
                Fields that are marked with * sign are required.
              </Typography>
            </i>
          </Grid>
          
          {added &&
          <Grid item xs={12}>
            <Button
            size="large"
            variant="contained"
            type="submit"
            style={{backgroundColor:'green',color:'white',fontWeight:900}}
            fullWidth
          >
            {result}!
          </Button>
          </Grid>
          }
          {exist &&
          <Grid item xs={12}>
            <Button
            size="large"
            variant="contained"
            type="submit"
            style={{backgroundColor:'red',color:'white',fontWeight:900}}
            fullWidth
          >
            {result}!!
          </Button>
          </Grid>
          }
         
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >
              Send
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              Already have an account?{' '}
              <LearnMoreLink title="Sign in" href="/signin" />
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
