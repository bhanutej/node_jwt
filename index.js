const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./models/User');
require('./services/passport');

global.__basedir = __dirname;

mongoose.connect('mongodb://127.0.0.1/nodejwt');
const app = express();

app.use(bodyParser.json());
app.use('/uploads', express.static('public'));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    res.send({Hi: "Helo world!"});
});

app.listen(5001);
