import {
    GET_CATEGORY,
    CATEGORY_LOADING,
    CLEAR_CURRENT_CATEGORY
  } from '../actions/types';
  
  const initialState = {
    category: null,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case CATEGORY_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_CATEGORY:
        return {
          ...state,
          category: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_CATEGORY:
        return {
          ...state,
          category: null
        };
      default:
        return state;
    }
  }
  