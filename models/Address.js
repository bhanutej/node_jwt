const mongoose = require('mongoose');
const { Schema } = mongoose; 

const addressSchema = new Schema({
  street_one: {type: String, required: true, minlength: 6},
  street_two: {type: String},
  door_no: {type: String, required: true},
  city: {type: String, required: true},
  pincode: {type: String, required: true},
  state: {type: String, required: true},
  country: {type: String, required: true}
});

const Address = mongoose.model('addresses', addressSchema);
module.exports = addressSchema;
