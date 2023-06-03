import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link>Your Website</Link> {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function Forgotpassword() {
  const dispatch = useDispatch();
  let { token, email } = useParams();
  console.log(email, "token");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let data1 = {
      token: token,
      email: email,
      newpassword: data.get("newpassword"),
      confirmpassword: data.get("confirmpassword"),
    };
    console.log(data1, "daaaaaaaaaash");
    let res = await dispatch.usermodel.resetpassword(data1);
    console.log(res, "daaaaaaaaaa.....");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://png.pngtree.com/png-clipart/20190904/ourlarge/pngtree-blue-bull-head-club-avatar-logo-png-image_1721105.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="newpassword"
                label="New Password"
                name="newpassword"
                autoComplete="newpassword"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="confirmpassword"
                label="Confirm Password"
                name="confirmpassword"
                autoComplete="confirmpassword"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
