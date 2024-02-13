import react, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../../atoms/Copyright.atom';
import { useTheme } from '@emotion/react';
import { theme } from '../../theme';
import { signIn } from '../../api/auth.api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getErrorData } from '../../utils/handleError.util';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../redux/slices/loggedinSlice';

export const SignIn = () => {
  const appTheme = useTheme(theme);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError(false)
    setPasswordError(false)
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    try {
      const user = await signIn(data.get('email'), data.get('password'));
      console.log(user);
      localStorage.setItem("user", true)
      localStorage.setItem("email", user.email)
      localStorage.setItem("token", user.token)
      localStorage.setItem("firstName", user.firstName)
      // dispatch(setLoggedIn({ loggedIn: true }))
      window.location.replace('/')
    } catch(err) {
      handleError(getErrorData(err))
    }
  };

  const handleError = (errorData) => {
    if (errorData.field) {
      if (errorData.field === "all") {
        setEmailError(true)
        setPasswordError(true)
      } else if (errorData.field === "email") setEmailError(true)
      else if (errorData.field === "password") setPasswordError(true)
    }
    toast.error(errorData.error)
  }

  return (
    <ThemeProvider theme={appTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button> 
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" underline='hover' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}