const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {

  if(!req.user){
    return res.status(401).json({ error: "Unauthorized access" });
  }

  next();
}
