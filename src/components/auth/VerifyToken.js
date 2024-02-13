import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import react, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VerifiedUser, VerifiedUserOutlined } from "@mui/icons-material";
import { ThemeProvider, useTheme } from "@emotion/react";
import { theme } from "../../theme";
import { getErrorData } from "../../utils/handleError.util";
import { ToastContainer, toast } from "react-toastify";
import { verifyUser } from "../../api/auth.api";

export const VerifyToken = () => {
  const appTheme = useTheme(theme);
  const navigate = useNavigate()
  const { verificationToken } = useParams();
  const [disableVerification, setDisableVerification] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const onClickVerify = async (event) => {
    event.preventDefault();
    setDisableVerification(true)
    if (isVerified) {
        navigate('/')
        return;
    }
    try {
        await verifyUser(verificationToken)
        setIsVerified(true)
        toast.success("Verified Successfully!")
    } catch(err) {
        const data = getErrorData(err)
        toast.error(data.error)
    } finally {
        setDisableVerification(false)
    }
  }

  return (
    <ThemeProvider theme={appTheme}>
        <ToastContainer />
      <Container component="main" maxWidth="s">
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Avatar sx={{ mt: 10, mb: 3, bgcolor: "secondary.main" }}>
          {isVerified ? <VerifiedUser /> : <VerifiedUserOutlined />}
        </Avatar>
        <Typography component="h1" fontWeight="bolder" variant="h5">
          {isVerified ? 'Hooray! Email address is verified now' : 'Please click to verify your email!'}
        </Typography>
        <Button
          type="button"
          variant="contained"
          color={isVerified ? 'success' : 'primary'}
          sx={{ mt: 3, mb: 2, fontWeight: 'bolder', width: '20%' }}
          onClick={onClickVerify}
          disabled={disableVerification}
        >
          {isVerified ? 'Go to login page' : 'Verify'}
        </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
