import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import isEmail from 'validator/lib/isEmail';
import { CircularProgress, LinearProgress } from '@material-ui/core';

import { setCookie, getCookie } from '../CookieHandler';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/userHandler';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, loading, error, user_login_status } = useSelector(state => state.user);

  const signInUser = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (email.value && password.value) {
      if (!isEmail(email.value)) {
        alert('Invalid Email');
      }
      else {
        dispatch(loginUser({
          email: email.value, password: password.value, old_token_id: getCookie('Token')
        }));

        // email.value = '';
        // password.value = '';
      }
    }
    else {
      alert('Fill all the fields');
    }
  };

  if (user_login_status) {
    setCookie('Token', token);
    history.push('/products');
  }

  if (loading) {
    return (
      <div style={{ marginTop: '100px', textAlign: 'center' }}>
        <CircularProgress color="primary" /> <br /> <br /> <br />
        <LinearProgress color="primary" />
      </div>
    );
  }
  else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value="xyz@gmail.com"
              error={error === 'User Not Exists'}
              helperText={error === 'User Not Exists' ? 'User Not Exists' : null}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value="12"
              error={error === 'Invalid Credentials'}
              helperText={error === 'Invalid Credentials' ? 'Invalid Password' : null}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => signInUser()}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }

}
