import axios from 'axios';
import { DELETE_USER, FETCH_CURRENT_USER, FETCH_USER, ERROR_MSG, USER_ERROR_MSG, FETCH_USERS, ADD_USER, UPDATE_USER } from './types';
import {bindActionCreators} from 'redux';
import {actions as toastrActions} from 'react-redux-toastr';

export const fetchCurrentUser = () => async (dispatch) => {
  const toastr = bindActionCreators(toastrActions, dispatch);
  try{
    const response = await axios.get('/api/current_user');
    dispatch({type: FETCH_CURRENT_USER, payload: response.data});
  }catch(error){
    toastr.add({type: 'success', title: 'Message', message: '11111111', options: {showCloseButton: true}});
  }
}

export const fetchUser = (userId) => async (dispatch) => {
  const toastr = bindActionCreators(toastrActions, dispatch);
  try{
    const response = await axios.get(`/api/users/${userId}`);
    dispatch({type: FETCH_USER, payload: response.data.user});
  }catch(error){
    toastr.add({type: 'success', title: 'Message', message: '22222', options: {showCloseButton: true}});
  }
}

export const handleLogin = (email, password, history) => async (dispatch) => {
  const payload = { email, password }
  try{
    const response = await axios.post('/api/login', payload);
    if(response.data.role === 'admin'){
      history.push('/admin_page');
    }else{
      history.push('/users_page');
    }
    dispatch({type: FETCH_CURRENT_USER, payload: response.data});
  }catch(error){
    dispatch({type: ERROR_MSG, error: error.response.data.error}); 
  }
}

export const createUserFormSubmit = (userObject, history) => async (dispatch) => {
  try{
    const response = await axios.post('/api/signup', userObject);
    dispatch({type: ADD_USER, payload: response.data.user});
    history.push('/users');
  }catch(error){
    dispatch({type: USER_ERROR_MSG, userErrorObj: error.response.data}); 
  }
}

export const createUserPaymentSubmit = (userObject) => async (dispatch) => {
  try{
    const response = await axios.post('/api/signup', userObject);
    dispatch({type: ADD_USER, payload: response.data.user});
  }catch(error){
    dispatch({type: USER_ERROR_MSG, userErrorObj: error.response.data}); 
  }
}

export const updateUserFormSubmit = (userObject, history, userId) => async (dispatch) => {
  try{
    const response = await axios.put(`/api/update_user/${userId}`, userObject);
    dispatch({type: UPDATE_USER, payload: response.data.user});
    history.push('/users');
  }catch(error){
    dispatch({type: ERROR_MSG, error: error.response.data.error}); 
  }    
}

export const fetchUsers = () => async (dispatch) => {
  const response = await axios.get('/api/users');
  dispatch({type: FETCH_USERS, payload: response.data});
}

export const deleteUser = (userId) => async (dispatch) => {
  const toastr = bindActionCreators(toastrActions, dispatch);
  try{
    const response = await axios.delete(`/api/users/${userId}`);
    if(response.data.id){
      dispatch({type: DELETE_USER, payload: response.data});
    }else{
      toastr.add({type: 'warning', title: 'User Delete', message: `${response.data.message}`, options: {showCloseButton: true}});
    }
  }catch(error){
    dispatch({type: ERROR_MSG, error: error.response.data.error});
  }
}
