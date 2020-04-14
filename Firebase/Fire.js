import firebase from 'firebase'
import '@firebase/firestore'

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

// admin
if (!firebase.apps.length) {
    firebase.initializeApp(config)
}
export const db = firebase.firestore()
const Fire = () => {
    // db.collection('characters').doc('mario').set({
    //     employment: 'plumber',
    //     outfitColor: 'red',
    //     specialAttack: 'fireball'
    // })
    
    // db.collection('characters').doc('donkey kong').set({
    //     employment: 'business man',
    //     outfitColor: 'none',
    //     specialAttack: 'big banana'
    // })
}


export default Fire






// class Fire {

//     // useEffect(() => {
//     //     firebase = new Fire((error, user) => {
//     //       if (error) {
//     //         return alert("Uh oh, something went wrong")
//     //       }
//     //     })
//     //   })
      
//     constructor(callback) {
//         this.init(callback)
//     }
//     init() {
//         if (!firebase.apps.length) {
//             firebase.initializeApp(firebaseConfig)
//         }
//         firebase.auth().onAuthStateChanged(user => {
//             if (user) {
//                 callback(null, user)
//             } else { //Configure social sign in here?
//                 firebase
//                     .auth()
//                     .signInWithEmailAndPassword()
//                     .catch(error => {
//                         callback(error)
//                     })
//             }
//         })
//     }
// }


// export default Fire