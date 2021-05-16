import {
  SET_SCREAMS,
  SET_SCREAM,
  SET_ERRORS,
  POST_SCREAM,
  LOADING_DATA,
  LOADING_UI,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  CLEAR_ERRORS,
  STOP_LOADING,
  SUBMIT_COMMENT,
  LOADING_COMMENT,
} from '../types';
import axios from 'axios';

//Get all screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/screams')
    .then((res) => {
      if (Array.isArray(res.data)) {
        dispatch({
          type: SET_SCREAMS,
          payload: { screams: res.data },
        });
      } else {
        dispatch({
          type: SET_SCREAMS,
          payload: { screams: [] },
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: { screams: [] },
      });
    });
};

export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data.screamData,
      });
      dispatch({ type: STOP_LOADING });
    })
    .catch((err) => {
      console.log(err);
    });
};
//Like a scream
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: screamId,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: screamId,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//Post a new scream
export const postScream = (scream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('screams', scream)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//Delete scream
export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//Submit new comment on scream
export const submitComment = ({ screamId, commentData }) => (dispatch) => {
  dispatch({ type: LOADING_COMMENT });
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserPublicData = ({ userHandle }) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.userData,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: { screams: [], user: null },
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
