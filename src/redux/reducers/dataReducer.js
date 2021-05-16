import {
  SET_SCREAMS,
  SET_SCREAM,
  POST_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SUBMIT_COMMENT,
  LOADING_COMMENT,
  SET_ERRORS,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  profile: {},
  loading: false,
};

export default function (state = initialState, action) {
  let index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        profile: action.payload.user ? action.payload.user : {},
        screams: action.payload.screams,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: { ...action.payload, loading: false },
      };
    case LIKE_SCREAM:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams[index].likeCount++;
      return {
        ...state,
      };
    case UNLIKE_SCREAM:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams[index].likeCount--;
      return {
        ...state,
      };
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(
          (scream) => scream.screamId !== action.payload
        ),
      };
    case POST_SCREAM:
      state.screams.unshift(action.payload);
      return {
        ...state,
        screams: state.screams,
        loading: false,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          loading: false,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    case LOADING_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          loading: true,
        },
      };
    case SET_ERRORS:
      return {
        ...state,
        scream: {
          ...state.scream,
          loading: false,
        },
      };
    default:
      return state;
  }
}
