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
  makeStyles,
  Hidden,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import bubbleSvg from "./images/bubble.svg";
import bgImg from "./images/bg-img.png";

const useStyles = makeStyles({
  bg: {
    backgroundImage: `linear-Gradient(to top, rgba(58, 142, 255, 0.85), rgba(135, 185, 255, 0.85)), url('${bgImg}')`,
    backgroundSize: "cover",
  },
  main: {
    height: "100vh",
  },
  bubble: {
    margin: "-28% 0 10% 0",
  },
  lead: {
    width: "75%",
    color: "white",
    fontSize: "1.5rem",
  },
  signIn: {
    display: "flex",
    color: "#ccc",
    width: "90%",
    margin: "2rem 0",
    justifyContent: "flex-end",
  },
  signInText: {
    lineHeight: "2.5",
    marginRight: "4rem",
  },
  form: {
    width: "70%",
    margin: "1rem auto",
  },
  createBtn: {
    display: "flex",
    margin: "2rem auto",
    width: "10rem",
  },
  formControl: {
    margin: "1rem auto",
  },
  label: {
    color: "#ccc",
  },
});

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
      <Hidden xsDown smDown>
        <Grid
          className={classes.bg}
          direction="column"
          container
          md={5}
          justify="center"
          alignItems="center"
          item
        >
          <img
            className={classes.bubble}
            alt="Message Bubble"
            src={bubbleSvg}
          />
          <Typography
            variant="h5"
            component="h2"
            align="center"
            color="textSecondary"
            className={classes.lead}
          >
            Converse with anyone with any language
          </Typography>
        </Grid>
      </Hidden>

      <Grid md={7} container item alignItems="flex-start" direction="column">
        <Box className={classes.signIn}>
          <Typography variant="button" className={classes.signInText}>
            Need to log in?
          </Typography>
          <Button onClick={() => history.push("/login")} color="primary">
            Login
          </Button>
        </Box>
        <form onSubmit={handleRegister} className={classes.form}>
          <Typography variant="h5" component="h1">
            Create an account.
          </Typography>
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
          <Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className={classes.createBtn}
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
