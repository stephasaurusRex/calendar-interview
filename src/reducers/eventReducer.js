import {
  FETCH_EVENTS_BEGIN,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE
} from '../actions/eventActions';

const initialState = {
  events: [],
  loading: false,
  error: null
};

export default function eventReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_EVENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload.events
      };

    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        events: []
      };

    default:
      return state;
  }
}