import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  POST_SCREAM,
  STOP_LOADING,
} from '../types';

const initialState = {
  loading: false,
  errors: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case POST_SCREAM:
      return {
        ...state,
        loading: false,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
