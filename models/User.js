const mongoose = require('mongoose');
const keys = require('../config/keys');
// const Schema = mongoose.Schema;
const { Schema } = mongoose; //same as above
const Address = require('./Address');

const userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  confirmed: {type: Boolean, required: true, default: false},
  role: {type: String, enum : ['admin','user'], default: 'user'},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  employee_id: {type: String, required: true, minlength: 6},
  blood_group: {type: String},
  employeePic: {type: String},
  contact: {type: String,
    required: [true, 'User phone number required'],
    minlength: 10
  },
  address: Address
},{ timestamps: true });

mongoose.model('users', userSchema);
