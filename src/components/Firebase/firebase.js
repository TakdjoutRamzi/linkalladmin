import firebase from "firebase/app";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyC1D3hRkjtBWRzzeGdnJ8Mp86biCPONHm8",
    authDomain: "linkall-307017.firebaseapp.com",
    projectId: "linkall-307017",
    storageBucket: "linkall-307017.appspot.com",
    messagingSenderId: "129700838875",
    appId: "1:129700838875:web:63ad66702fedf9698c3bfe"
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
