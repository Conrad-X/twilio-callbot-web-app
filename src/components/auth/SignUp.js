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
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';
import { useTheme } from '@emotion/react';
import { Copyright } from '../../atoms/Copyright.atom';
import { signUp } from '../../api/auth.api';
import { ToastContainer, toast } from 'react-toastify';
import { getErrorData } from '../../utils/handleError.util';

export const SignUp = () => {
  const appTheme = useTheme(theme);
  const [firstNameError, setFirstNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [disableSignup, setDisableSignup] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFirstNameError(false)
    setEmailError(false)
    setPasswordError(false)
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    try {
        await signUp(data.get('firstName'), data.get('email'), data.get('password'), data.get("lastName"));
        toast.info(`Email sent to ${data.get('email')}. Please verify it to complete sign-up.`)
        setDisableSignup(true)
      } catch(err) {
        handleError(getErrorData(err))
    }
  };

  const handleError = (errorData) => {
    if (errorData.field) {
        if (errorData.field === "all") {
            setFirstNameError(true)
            setEmailError(true)
            setPasswordError(true)
        } else if (errorData.field === "firstName") setFirstNameError(true)
        else if (errorData.field === "email") setEmailError(true)
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={firstNameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name (Optional)"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordError}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disableSignup}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" underline='hover' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}