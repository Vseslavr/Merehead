import actions from './users.actions.types';
import { apiURLs } from '../../config';
import axios from 'axios';


export const getUsers = () => (dispatch) => {
  dispatch({ type: actions.IS_FETCHING, results: true });

  axios.get(`${apiURLs.test}/users`)
    .then(result => {
      dispatch(setResults(result));
    })
    .catch(reason => {
      console.log(reason);
      dispatch({ type: actions.IS_FETCHING, results: false });
    })
};

export const deleteUser = (id) => (dispatch) => {
  dispatch({ type: actions.IS_FETCHING, results: true });

  axios.delete(`${apiURLs.test}/user/${id}`)
    .then(result => {
      dispatch(seUserActionSuccess(true, actions.DELETE_USER_SUCCESS));
      dispatch(setResults(result));
    })
    .catch(reason => {
      console.log(reason);
      dispatch({ type: actions.IS_FETCHING, results: false });
    })
};

export const createUser = (data, resetForm) => (dispatch) => {
  dispatch({ type: actions.IS_FETCHING, results: true });

  axios.post(`${apiURLs.test}/users`, data)
    .then(result => {
      resetForm();
      dispatch(seUserActionSuccess(true, actions.CREATE_USER_SUCCESS));
      dispatch(setResults(result));
    })
    .catch(reason => {
      console.log(reason);
      dispatch({ type: actions.IS_FETCHING, results: false });
    })
};

export const editUser = (data, resetForm) => (dispatch) => {
  dispatch({ type: actions.IS_FETCHING, results: true });

  axios.put(`${apiURLs.test}/user/${data.id}`, data)
    .then(result => {
      resetForm();
      dispatch(setUser(data));
      dispatch(seUserActionSuccess(true, actions.EDIT_USER_SUCCESS));
      dispatch(setResults(result));
    })
    .catch(reason => {
      console.log(reason);
      dispatch({ type: actions.IS_FETCHING, results: false });
    })
};

const setResults = (result) => (dispatch) => {
  const results = {
    usersList: result.data,
    totalRecords: result.data.length
  };

  dispatch({ type: actions.IS_FETCHING, results: false });
  dispatch({ type: actions.GET_USERS, results });
};

export const seUserActionSuccess = (params, action) => (dispatch) => {
  dispatch({ type: action, results: params });
};

export const setUser = (userData) => {
  return ({
    type: actions.SET_USER,
    results: userData
  })
};