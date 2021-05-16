// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js'
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyBlK6HXpmaTiAsmmmF_fMwnQBnBGPZOPZk',
  authDomain: 'closebox-8f8bc.firebaseapp.com',
  databaseURL: 'https://closebox-8f8bc.firebaseio.com',
  projectId: 'closebox-8f8bc',
  storageBucket: 'closebox-8f8bc.appspot.com',
  messagingSenderId: '400702238242',
  appId: '1:400702238242:web:376fc42adcf6d788fea47b',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
