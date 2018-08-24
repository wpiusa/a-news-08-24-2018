import {
    GET_ORG,
    ORG_LOADING,
    CLEAR_CURRENT_ORG
  } from '../actions/types';
  
  const initialState = {
    org: null,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ORG_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_ORG:
        return {
          ...state,
          org: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_ORG:
        return {
          ...state,
          org: null
        };
      default:
        return state;
    }
  }
  