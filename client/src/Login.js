import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  Link,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import useStyles from "./layout/loginRegisterStyles";
import LandingPageIllustration from "./layout/LandingPageIllustration";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container direction="row" className={classes.main}>
      <LandingPageIllustration classes={classes} />

      {/* Top Bar */}
      <Grid md={7} container item alignItems="flex-start" direction="column">
        <Box className={classes.topBar}>
          <Typography variant="button" className={classes.topBarText}>
            Need to register?
          </Typography>
          <Button onClick={() => history.push("/register")} color="primary">
            Register
          </Button>
        </Box>

        {/* Login Form */}
        <form onSubmit={handleLogin} className={classes.formLogin}>
          <Typography variant="h5" component="h1">
            Welcome back!
          </Typography>

          {/* Username Field */}
          <Grid>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                InputLabelProps={{ classes: { root: classes.label } }}
                required
              />
            </FormControl>
          </Grid>

          {/* Password Fields */}
          <Grid>
            <FormControl
              margin="normal"
              className={classes.formControl}
              fullWidth
            >
              <TextField
                label="Password"
                aria-label="password"
                type="password"
                name="password"
                InputLabelProps={{ classes: { root: classes.label } }}
                inputProps={{ minLength: 6 }}
                required
              />
            </FormControl>
            <Link
              component="button"
              variant="body2"
              className={classes.forgotPassLink}
              onClick={(e) => {
                e.preventDefault();
                console.log("Forgot password not implemented yet.");
                // history.push("/forgot")
              }}
            >
              Forgot?
            </Link>
          </Grid>

          {/* Submit/Create Button */}
          <Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className={classes.submitBtn}
            >
              Login
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
