import axios from 'axios';

import {
  GET_NOTIFY,
  NOTIFY_LOADING,
  CLEAR_CURRENT_NOTIFY,
  GET_ERRORS
} from './types';

// Get current category
export const getCurrentNotify = () => dispatch => {
  dispatch(setNotifyLoading());
  axios
    .get('/api/notify')
    .then(res =>
      dispatch({
        type: GET_Notify,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_Notify,
        payload: {}
      })
    );
};

// Create Category
export const createNotify = (notifyData, history) => dispatch => {
  axios
    .post('/api/notify', notifyData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Notify loading
export const setNotifyLoading = () => {
  return {
    type: Notify_LOADING
  };
};

// Clear notify
export const clearCurrentNotify = () => {
  return {
    type: CLEAR_CURRENT_NOTIFY
  };
};
