import axios from 'axios';

import {
  GET_ORG,
  ORG_LOADING,
  CLEAR_CURRENT_ORG,
  GET_ERRORS
} from './types';

// Get current org
export const getCurrentOrg = () => dispatch => {
  dispatch(setOrgLoading());
  axios
    .get('/api/org')
    .then(res =>
      dispatch({
        type: GET_ORG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORG,
        payload: {}
      })
    );
};

// Create Org
export const createOrg = (orgData, history) => dispatch => {
  axios
    .post('/api/org', orgData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Org loading
export const setOrgLoading = () => {
  return {
    type: ORG_LOADING
  };
};

// Clear org
export const clearCurrentOrg = () => {
  return {
    type: CLEAR_CURRENT_ORG
  };
};
