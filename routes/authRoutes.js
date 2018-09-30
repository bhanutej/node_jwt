const authCheck = require('../middlewares/authCheck');
const usersController = require('../controllers/users');
var multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname);
  }
});
var upload = multer({storage: storage});

module.exports = (app) => {
  
  app.get('/api/current_user', authCheck, usersController.currentUser);

  app.get('/api/confirm/:token', usersController.tokenConfirmation);

  app.post('/api/login', usersController.userSignin);

  app.post('/api/signup', upload.single('employeePic'), usersController.userSignup);

  app.get('/api/users', authCheck, usersController.get_users);

  app.get('/api/users/:_id', authCheck, usersController.get_user);

  app.put('/api/update_user/:_id', authCheck, usersController.update_user);

  app.delete('/api/users/:_id', authCheck, usersController.delete_user);

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}
