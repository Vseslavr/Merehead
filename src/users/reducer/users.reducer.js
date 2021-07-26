import actionTypes from '../actions/users.actions.types';

const initialState = {
  usersList: [],
  user: {},
  isFetching: false,
  pageSize: 5,
  totalRecords: 0,
  createUserSuccess: false,
  editUserSuccess: false,
  deleteUserSuccess: false,
};

const userReducer = (state = initialState, action) => {
  const { results } = action;

  switch (action.type) {
    case actionTypes.IS_FETCHING:
      return {
        ...state,
        isFetching: results
      }

    case actionTypes.SET_USER:
      return {
        ...state,
        user: results
      }

    case actionTypes.GET_USERS:
      return {
        ...state,
        usersList: results.usersList,
        totalRecords: results.totalRecords
      }

    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        createUserSuccess: results
      }

    case actionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        editUserSuccess: results
      }

    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUserSuccess: results
      }

    default:
      return state;
  }
};

export default userReducer;