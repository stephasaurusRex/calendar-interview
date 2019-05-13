import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from '../actions/userActions';

const initialState = {
  panelUsers: [],
  loading: false,
  error: null
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_USERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        panelUsers: action.payload.users,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        panelUsers: []
      };

    default:
      return state;
  }
}