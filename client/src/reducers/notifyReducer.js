import {
    GET_NOTIFY,
    NOTIFY_LOADING,
    CLEAR_CURRENT_NOTIFY
  } from '../actions/types';
  
  const initialState = {
    notify: null,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case NOTIFY_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_NOTIFY:
        return {
          ...state,
          notify: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_NOTIFY:
        return {
          ...state,
          notify: null
        };
      default:
        return state;
    }
  }
  