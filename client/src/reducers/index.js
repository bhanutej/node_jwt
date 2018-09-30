import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import adminReducer from './adminReducer';
import userReducer from './userReducer';
import { reducer as reduxForm } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import userErrorReducer from './userErrorReducer';

export default combineReducers({
  currentUser: authReducer,
  errorMessage: errorReducer,
  userErrorObj: userErrorReducer,
  users: adminReducer,
  user: userReducer,
  form: reduxForm, // must be form is the state property  
  toastr: toastrReducer
});
