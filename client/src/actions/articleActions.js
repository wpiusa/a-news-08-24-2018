import axios from 'axios';

import {
  GET_ARTICLE,
  ARTICLE_LOADING,
  CLEAR_CURRENT_ARTICLE,
  GET_ERRORS
} from './types';

// Get current article
export const getCurrentArticle = () => dispatch => {
  dispatch(setArticleLoading());
  axios
    .get('/api/article')
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICLE,
        payload: {}
      })
    );
};

// Create Article
export const createArticle = (articleData, history) => dispatch => {
  axios
    .post('/api/aticle', articleData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Article loading
export const setArticleLoading = () => {
  return {
    type: ARTICLE_LOADING
  };
};

// Clear article
export const clearCurrentArticle = () => {
  return {
    type: CLEAR_CURRENT_ARTICLE
  };
};
