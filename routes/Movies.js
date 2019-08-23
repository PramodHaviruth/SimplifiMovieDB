const express = require("express");
const session = require("express-session");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const router = express.Router();

const db = require("../config/db.js");

router.use(express.urlencoded());
router.use(express.json());

router.use(session({ secret: "SimplifiCommerce" }));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log("this is serialize name = " + user[0].ID);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log("this is deserialize name = " + user[0].ID);

  done(null, user);
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
        return done(err);
      });
  })
);

function protected(req, res, next) {
  if (!req.user) {
    return res.redirect("/");
  }
  return next();
}

router.get("/", (req, res) => {
  res.send("Public Home Page");
});

router.get("/movies", (req, res) => {
  db.getMovieDetails
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/movies/cast/:id", protected, (req, res, next) => {
  db.getMovieCastDetails(req.params.id)
    .then(result => {
      console.log(result);
      res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/movies/addmovies", protected, (req, res, next) => {
  db.setMovieDetails(req.body)
    .then(result => {
      console.log(result);
      res.send("Success");
    })
    .catch(err => {
      console.log(err);
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/movies/login"
  }),
  (req, res) => {
    res.send("login");
  }
);

router.get("/home", (req, res) => {
  res.send("Successful login");
});

module.exports = router;
