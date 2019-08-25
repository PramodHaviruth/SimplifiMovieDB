const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const router = express.Router();

const db = require("../config/db.js");

router.use(cookieParser("SimplifiCommerce"));

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use(
  session({
    secret: "SimplifiCommerce",
    resave: false,
    saveUninitialized: false
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

router.use((req, res, next) => {
  console.log("Log session =====");
  console.log(req.session);

  next();
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    db.validateUserDetails(username, password)
      .then(result => {
        console.log(result);
        if (!result) {
          return done(null, false, {
            message: "Invalid Username or Password"
          });
        }

        return done(null, result);
      })
      .catch(err => {
        console.log(err);
        return done({ Retcode: 1 });
      });
  })
);

function protected(req, res, next) {
  console.log(req.session);
  if (req.user !== 1) {
    return res.send({ Retcode: 1 });
  }
  return next();
}

passport.serializeUser(function(user, done) {
  console.log("this is serialize name = " + user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log("this is deserialize name = " + user);

  done(null, user);
});
router.get("/", (req, res) => {
  db.getMovieDetails
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/cast/:id", (req, res, next) => {
  db.getMovieCastDetails(req.params.id)
    .then(result => {
      console.log("inside cast details0" + result);
      res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/addmovies", (req, res, next) => {
  db.setMovieDetails(req.body)
    .then(result => {
      console.log(result);
      res.send({ Retcode: 0 });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  if (!req.user) {
    return res.send({ Retcode: 1 });
  }
  res.send({ Retcode: 0, UserId: req.user });
});

module.exports = router;
