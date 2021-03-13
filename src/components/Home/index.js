import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../Firebase";
import Logout from "../Logout";
import Loader from "../Loader";
import ChoiseButton from "../ChoiseButton";

const Home = (props) => {
  const firebase = useContext(FirebaseContext);

  const [userSession, setUserSession] = useState(null);
  //const [userData, setUserData] = useState({});

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/");
    });

    /*if (!!userSession) {
            firebase.user(userSession.uid)
            .get()
            .then( doc => {
                if (doc && doc.exists) {
                    const myData = doc.data();
                    setUserData(myData)
                }
            })
            .catch( error => {
                console.log(error);
            })
        }**/

    return () => {
      listener();
    };
  }, [userSession, firebase, props.history]);

  return userSession === null ? (
    <Loader loadingMsg={"Authentification ..."} />
  ) : (
    <div>
      <Logout />
      <div className="p-d-flex-column p-shadow-2 p-p-2">
        <ChoiseButton
          text="Nouvel administrateur"
          validate={() => props.history.push("/admin")}
        />
        <ChoiseButton
          text="Nouvelle annonce"
          validate={() => props.history.push("/usersPage")}
        />
      </div>
    </div>
  );
};

export default Home;
