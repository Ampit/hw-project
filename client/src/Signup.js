import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import useStyles from "./layout/loginRegisterStyles";
import LandingPageIllustration from "./layout/LandingPageIllustration";

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
            Need to log in?
          </Typography>
          <Button onClick={() => history.push("/login")} color="primary">
            Login
          </Button>
        </Box>

        {/* Register Form */}
        <form onSubmit={handleRegister} className={classes.formRegister}>
          <Typography variant="h5" component="h1">
            Create an account.
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

          {/* Email Field */}
          <Grid>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                InputLabelProps={{ classes: { root: classes.label } }}
                required
              />
            </FormControl>
          </Grid>

          {/* Password Fields */}
          <Grid>
            <FormControl
              className={classes.formControl}
              error={!!formErrorMessage.confirmPassword}
              fullWidth
            >
              <TextField
                aria-label="password"
                label="Password"
                type="password"
                InputLabelProps={{ classes: { root: classes.label } }}
                inputProps={{ minLength: 6 }}
                name="password"
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid>
            <FormControl
              className={classes.formControl}
              error={!!formErrorMessage.confirmPassword}
              fullWidth
            >
              <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                InputLabelProps={{ classes: { root: classes.label } }}
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
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
              Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
