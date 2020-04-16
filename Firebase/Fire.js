import * as firebase from 'firebase'

export const config = {
    apiKey: "AIzaSyBjFDet9PN8mZjani67TVYKumPfqouGQyE",
    authDomain: "reactnative-ac7bd.firebaseapp.com",
    databaseURL: "https://reactnative-ac7bd.firebaseio.com",
    projectId: "reactnative-ac7bd",
    storageBucket: "reactnative-ac7bd.appspot.com",
    messagingSenderId: "974259196275",
    appId: "1:974259196275:web:9d1ab877150c3384edb506",
    measurementId: "G-W5MLYZBF4D"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}