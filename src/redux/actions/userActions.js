import {
  SET_USER,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  SET_NOTIFICATIONS_TOKEN,
} from '../types';
import axios from 'axios';

import { messaging } from '../../util/initFCM';

//Login user and create session
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
//Logout user Session
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};
//SignUp new user
export const signupUser = (newUser, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUser)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
//Get User Logged
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .get('/user')
    .then((res) => {
      requestNotificationsPermition(res.data.userData.credentials);
      dispatch({
        type: SET_USER,
        payload: res.data.userData,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
//Upload and replace Image Profile
export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};
// edit user profile deatils
export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};
//Mark Notification user as read
export const markNotificationRead = (notifications) => (dispatch) => {
  axios
    .post('/notifications', notifications)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const requestNotificationsPermition = (user) => {
  console.log('start rquest');
  messaging
    .requestPermission()
    .then(async function () {
      const token = await messaging.getToken();
      let save = true;
      if (user.FCMtokens) {
        user.FCMtokens.map((tk) => {
          if (tk === token) {
            save = false;
            console.log(tk);
          }
        });
      }
      if (save) {
        console.log(token);
        addTokenDevice(token);
      }
    })
    .catch(function (err) {
      console.log('Unable to get permission to notify.', err);
    });
  navigator.serviceWorker.addEventListener('message', (message) =>
    console.log(message)
  );
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

const addTokenDevice = (FCMtoken) => {
  axios
    .get(`user/${FCMtoken}/token`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
