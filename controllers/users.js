'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const util = require('util')
const keys = require('../config/keys');
const _ = require('lodash');
const nodemailer = require('nodemailer');
const raisError = require('../RaisErrors/pageNotFound');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId).then((user) => {
    done(null, user);
  });
});

exports.get_users = (req, res) => {
  getUsers(req, res);
}

exports.delete_user = (req, res) => {
  User.findByIdAndRemove(req.params._id, (err, user) => {
    if (err) return res.status(500).send(err);
    if(user){
      const response = {
        message: "User successfully deleted",
        id: user._id
      };
      return res.status(200).send(response);
    }else{
      return res.status(500).send({
        message: "User not found",
        id: null
      });
    }
  });
}

exports.get_user = (req, res) => {
  getUser(req, res);
}

exports.update_user = (req, res) => {
  const { email, role, first_name, last_name, employee_id, blood_group, contact, address } = req.body;
  User.update({_id: req.params._id},
    { $set: { email, role, first_name, last_name, employee_id, blood_group, contact, address }},
    { runValidators: true },
    (err, user) => {
      if (err) {
        
        let validationErrors = {
          address: {}
        };
        function handleErrors(err){
          for (const field in err.errors) {
            if(!field.includes(".") && field !== "address"){
              if(err.errors[field].message){
                validationErrors[`${field}`] = err.errors[field].message;
              }
            }else if (field.includes(".")){
              if(err.errors[field].message){
                validationErrors.address[`${field.split('.')[1]}`] = err.errors[field].message;
              }
            }
          }
        }
        handleErrors(err);
        res.status(422).json({error: validationErrors});
      }else{
        res.json({ user: user });
      }
    }
  );
}

exports.tokenConfirmation = (req, res) => {
  jwt.verify(req.params.token, keys.cookieKey, (error, result) => {
    if(error){
      raisError.pageNotFound(res);
    }else{
      const { user: { id } } = result;
      User.update({_id: id} , {confirmed: true}, (err, raw) => {
        if (err) return handleError(err);
        console.log('The raw response from Mongo was ', raw);
        res.redirect('http://localhost:3000/Login');
      });
    }
  });
}

exports.currentUser = (req, res) => {
  res.send({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role 
  });
}

exports.userSignin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
          error: info.message,
          user: user
      });
    }
    req.login(user, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), keys.cookieKey);
      res.json({user: req.user, token: token});
    });
  })(req, res);
}

exports.userSignup = (req, res, next) => {
  // getUserList(req, res);
  User.findOne({email: req.body.email}).then((user) => {
    if(user){
      res.status(409).json({
        errors: { email: "User already existed!!!" }
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
          return res.status(500).json({
            error: err
          });
        } else {
          const { email, role, first_name, last_name, employee_id, blood_group, contact } = req.body;
          // const { street_one, street_two, door_no, city, pincode, state, country } = req.body.address;
          const user = new User({ email, role, first_name, last_name, employee_id, blood_group, contact });
          user.address = req.body.address; //{ street_one, street_two, door_no, city, pincode, state, country };
          user.password = hash;
          user.employeePic = req.file ? req.file.path : '';
          user.save().then(user => {
            const smtpTransport = transporter();
            const emailToken = jwt.sign(
              {
                user: { id: user.id }
              },
              keys.cookieKey,
              {
                expiresIn: '1d'
              }
            );

            const url = `http://localhost:5001/api/confirm/${emailToken}`;
            try{
              smtpTransport.sendMail({
                from: "bhanutej4u@gmail.com",
                to: user.email,
                subject: 'Comfirm Email!!!',
                html: `Please confirm email: <a href="${url}">Click here.</a>`
              }, (error, response) => {
                if(error){
                  console.log(error);
                }else{
                  console.log("Please check your mail");
                }
              });
            } catch( err ){
              console.log(err);
            }
            // getUserList(req, res);
            res.json({ user: user });
          })
          .catch(err => {
            let validationErrors = {
              address: {}
            };
            function handleErrors(err){
              for (const field in err.errors) {
                if(!field.includes(".") && field !== "address"){
                  if(err.errors[field].message){
                    validationErrors[`${field}`] = err.errors[field].message;
                  }
                }else if (field.includes(".")){
                  if(err.errors[field].message){
                    validationErrors.address[`${field.split('.')[1]}`] = err.errors[field].message;
                  }
                }
              }
            }
            handleErrors(err);
            res.status(422).json({errors: validationErrors, user: req.body});
          });
        }
      });
    }
  }).catch(err => {
    res.status(500).json({errors: err.errors, user: req.body});
  });
}

function getUsers(req, res) {
  User.find({ _id: { $ne: req.user.id } })
    .sort({createdAt: 1}) //1: asc, -1: desc
    .exec((error, result) => {
    if (error) {
      res.send(null);
    }
    else {
      res.send(result);
    }
  });
}

function getUser(req, res) {
  User.findOne({_id: { $eq: req.params._id }}, (error, user) => {
    res.json({ user })
  });
}

function transporter() {
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "bhanutej4u@gmail.com",
      pass: "myfatherisgreate"
    }
  });
  return smtpTransport;
}
