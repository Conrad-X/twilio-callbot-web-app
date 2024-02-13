import { Typography, Link } from "@mui/material";

export const Copyright = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" underline="hover" href="https://conradlabs.com">
          ConradX
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}