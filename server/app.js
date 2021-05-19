const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const logger = require("morgan");
const csrf = require("csurf");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./db");
const { User } = require("./db/models");
// create store for sessions to persist in database
const sessionStore = new SequelizeStore({ db });
// csrf
const csrfProtection = csrf({ cookie: true });

const { json, urlencoded } = express;

const app = express();
const SECRET = process.env.SESSION_SECRET || "very_secret_6";

const sessionMiddleware = session({
  secret: SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use(function (req, res, next) {
  const token = req.cookies["x-access-token"];
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return next();
      }
      User.findOne({
        where: { id: decoded.id },
      }).then((user) => {
        req.session.user = user;
        req.user = user;
        return next();
      });
    });
  } else {
    return next();
  }
});

app.all("*", csrfProtection, function (req, res, next) {
  // set csrf token cookie on each request
  res.cookie("x-csrf-token", req.csrfToken());
  next();
});

// require api routes here after I create them
app.use("/auth", csrfProtection, require("./routes/auth"));
app.use("/api", csrfProtection, require("./routes/api"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = { app, sessionStore, sessionMiddleware };
