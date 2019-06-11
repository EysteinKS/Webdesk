import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { firebaseConfig } from "../config"

let secondary, secondaryFirestore, secondaryAuth

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();
const auth = firebase.auth();
 
//CREATE SECONDARY APP
export const initializeLocation = (config) => {
  secondary = firebase.initializeApp(config, "location")
  secondaryFirestore = secondary.firestore()
  secondaryAuth = secondary.auth()
}

//SIGN OUT AND DELETE SECONDARY APP
export const doSignOut = () => {
  firebase.auth().signOut()
  //https://firebase.google.com/docs/reference/js/firebase.app.App.html
  secondary.delete().then(() => {
    secondary = null
    secondaryFirestore = null
    secondaryAuth = null
  })
}

export {
  firestore,
  auth,
  secondaryFirestore,
  secondaryAuth
}