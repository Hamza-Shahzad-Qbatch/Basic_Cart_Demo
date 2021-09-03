import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import isEmail from 'validator/lib/isEmail';

import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../redux/userHandler';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const { user_register_status, error } = useSelector(state => state.user);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const signUpUser = () => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const con_password = document.getElementById('cpassword');

    if (name.value && email.value && password.value && con_password.value) {
      if (password.value !== con_password.value) {
        alert("Passwords didn't match !!");
      }
      else if (!isEmail(email.value)) {
        alert('Invalid Email');
      }
      else {
        dispatch(registerUser({
          name: name.value, email: email.value, password: password.value
        }));

        // name.value = '';
        // email.value = '';
        // password.value = '';
        // con_password.value = '';
      }
    }
    else {
      alert('Fill all the fields');
    }
  };

  if (user_register_status) {
    history.push('/login');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value="xyz"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value="xyz@gmail.com"
                error={error === 'User Already Exists'}
                helperText={error === 'User Already Exists' ? 'User Already Exists' : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value="12"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="confirm-password"
                value="12"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => signUpUser()}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
