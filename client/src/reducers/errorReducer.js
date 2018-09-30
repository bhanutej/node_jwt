import { ERROR_MSG } from '../actions/types';

export default function(state = null, action){
  switch(action.type){
    case ERROR_MSG:
      return action.error || false;
    default:
      return state;
  }
}
