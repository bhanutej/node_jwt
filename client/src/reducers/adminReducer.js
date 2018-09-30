import { FETCH_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from '../actions/types';

export default function(state = [], action){
  switch(action.type){
    case FETCH_USERS:
      return action.payload || false;
    case ADD_USER || UPDATE_USER:
      return [
        ...state,
        action.payload
      ];
    case DELETE_USER:
      const users = state.filter(user => user._id !== action.payload.id);
      return [ ...users ];
    default:
      return null;
  }
}
