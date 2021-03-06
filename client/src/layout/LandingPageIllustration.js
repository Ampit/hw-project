import React from "react";
import { Hidden, Grid, Typography } from "@material-ui/core";
import bubbleSvg from "../images/bubble.svg";

const LandingPageIllustration = ({ classes }) => {
  return (
    <Hidden smDown>
      <Grid
        className={classes.bg}
        direction="column"
        container
        md={5}
        justify="center"
        alignItems="center"
        item
      >
        <img className={classes.bubble} alt="Message Bubble" src={bubbleSvg} />
        <Typography
          variant="h5"
          component="h2"
          align="center"
          color="textSecondary"
          className={classes.lead}
          style={{ whiteSpace: "pre-line" }}
        >
          Converse with anyone{"\n"} with any language
        </Typography>
      </Grid>
    </Hidden>
  );
};

export default LandingPageIllustration;
