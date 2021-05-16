import * as firebase from 'firebase/app';
import 'firebase/messaging';
const initializedFirebaseApp = firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  apiKey: 'AIzaSyBlK6HXpmaTiAsmmmF_fMwnQBnBGPZOPZk',
  authDomain: 'closebox-8f8bc.firebaseapp.com',
  databaseURL: 'https://closebox-8f8bc.firebaseio.com',
  projectId: 'closebox-8f8bc',
  storageBucket: 'closebox-8f8bc.appspot.com',
  messagingSenderId: '400702238242',
  appId: '1:400702238242:web:376fc42adcf6d788fea47b',
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
  'BIHlXKnQiK8WMlKVOA8Whk2DPKy3RjmISfX6S8Pqut6tpHP0Tu0D1wcXZGkHg96R0EZZpLoUMXhVEg2fCuQHJdk'
);
export { messaging };
