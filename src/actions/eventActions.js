export const FETCH_EVENTS_BEGIN   = 'FETCH_EVENTS_BEGIN';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

export const fetchEventsBegin = () => ({
  type: FETCH_EVENTS_BEGIN
});

export const fetchEventsSuccess = events => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: { events }
});

export const fetchEventsFailure = error => ({
  type: FETCH_EVENTS_FAILURE,
  payload: { error }
});

export const fetchEvents = () => {
  return dispatch => {
    dispatch(fetchEventsBegin());
    return fetch('http://localhost:3001/events')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchEventsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchEventsFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}