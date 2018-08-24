import axios from 'axios';

import {
  GET_CATEGORY,
  CATEGORY_LOADING,
  CLEAR_CURRENT_CATEGORY,
  GET_ERRORS
} from './types';

// Get current category
export const getCurrentCategory = () => dispatch => {
  dispatch(setCategoryLoading());
  axios
    .get('/api/category')
    .then(res =>
      dispatch({
        type: GET_CATEGORY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORY,
        payload: {}
      })
    );
};

// Create Category
export const createCategoy = (categoryData, history) => dispatch => {
  axios
    .post('/api/category', categoryData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Category loading
export const setCategoryLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};

// Clear category
export const clearCurrentCategory = () => {
  return {
    type: CLEAR_CURRENT_CATEGORY
  };
};
