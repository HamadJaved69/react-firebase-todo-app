import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB6_SXGIduZHK12FnTuhZj8BCEU9GFn9tA",
    authDomain: "todo-app-cp-db892.firebaseapp.com",
    projectId: "todo-app-cp-db892",
    storageBucket: "todo-app-cp-db892.appspot.com",
    messagingSenderId: "520091517018",
    appId: "1:520091517018:web:5ff3d5ed178a391a745863",
    measurementId: "G-QQGJGNHLFC"
});

const db = firebaseApp.firestore();

export default db;