import { makeStyles } from "@material-ui/core";
import bgImg from "../images/bg-img.png";

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
  topBar: {
    display: "flex",
    color: "#ccc",
    width: "90%",
    margin: "2rem 0",
    justifyContent: "flex-end",
  },
  topBarText: {
    lineHeight: "2.5",
    marginRight: "4rem",
  },
  formRegister: {
    width: "70%",
    margin: "1rem auto",
  },
  formLogin: {
    width: "70%",
    margin: "4rem auto",
  },
  submitBtn: {
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
  forgotPassLink: {
    width: "100%",
    textAlign: "right",
    marginTop: "-5rem",
    marginLeft: "-0.5rem",
  },
});

export default useStyles;
