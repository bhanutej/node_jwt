import { USER_ERROR_MSG } from '../actions/types';

export default function(state = null, action){
  switch(action.type){
    case USER_ERROR_MSG:
      const userErrorObj =  {errors: action.userErrorObj.errors, user: action.userErrorObj.user}; 
      return userErrorObj || false;
    default:
      return state;
  }
}
