import firebase from "firebase/app";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAuOCUL8dP1fhVeNh72CNNdkjrLBBsl7Do",
  authDomain: "labo-144c2.firebaseapp.com",
  projectId: "labo-144c2",
  storageBucket: "labo-144c2.appspot.com",
  messagingSenderId: "597637468828",
  appId: "1:597637468828:web:31f1d29f2aad530e811359",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  // inscription
  signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Connexion
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Déconnexion
  signoutUser = () => this.auth.signOut();

  // Récupérer le mot de passe
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // firestore
  user = (uid) => this.db.doc(`users/${uid}`);

  //insert ads
  ads = (uid) => this.db.doc(`ads/${uid}`);

  storageRef = (filename) => this.storage.ref(`images/${filename}`);

  //fetch from db
  dataCollection = (table) => {
    return this.db.collection(table);
  };

  updateField = (value) => firebase.firestore.FieldValue.arrayUnion(value);

  

  //Get list of users
  /**getUsersName = () => {
    const names = [];
    this.db.doc("users/")
      .then((res) =>
        res.forEach((item) => {
          names.push(item.data().name);
        })
      );
    return names;
  };**/
}

export default Firebase;
