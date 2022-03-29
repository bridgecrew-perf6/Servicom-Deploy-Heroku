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
      console.log('form',form)
      axios.post(process.env.REACT_APP_DOMAIN+'/signins',form)
      .then(reslt=>{
        setExist(false)
        if(reslt.data.msg.indexOf('back')!==-1){
          console.log(reslt.data)
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
      <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              Forgot your password?{' '}
              <LearnMoreLink
                title="Reset password"
                href="/passwordreset"
              />
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
