const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      (email, password, done) => {
        User.findOne({email: email}).then((user) => {
          if(!user){
            return done(null, false, { message: "User not found" });
          }
          if(!user.confirmed){
            return done(null, false, { message: "Please checkout the confirmation mail" });
          }
          bcrypt.compare(password, user.password, (err, result) => {
            if(result){
              return done(null, user, { message: "Email and Password matched."});
            }
            return done(null, false, { message: "Password wrong." });
          });
        });
      }
    )
);