export const FETCH_USERS_BEGIN   = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users }
});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: { error }
});

export const fetchUsers = (users) => {
  return dispatch => {
    dispatch(fetchUsersBegin());
    let userPromises = users.map((user) => {
      return fetch(`http://localhost:3001/users/${user}`)
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          return json;
        })
        .catch(error => dispatch(fetchUsersFailure(error)));
    })
    Promise.all(userPromises).then((userObjects) => {
      return dispatch(fetchUsersSuccess(userObjects));
    });
  };
}

// Handle HTTP errors since fetch doesn't
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}