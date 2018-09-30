import { FETCH_USER } from '../actions/types';

export default function(state = [], action){
  switch(action.type){
    case FETCH_USER:
      const index = state.findIndex(user => user._id === action.payload._id);
      if(index > -1){
        return state.map(user => {
          if(user._id === action.payload._id) return action.payload;
          return user;
        })
      }else{
        return [
          ...state,
          action.payload
        ];
      }
    default:
      return state;
  }
}
