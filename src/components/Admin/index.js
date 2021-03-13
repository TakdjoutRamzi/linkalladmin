import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import { RadioButton } from "primereact/radiobutton";
import Logout from "../Logout";
import Loader from "../Loader";

const Admin = (props) => {
  const firebase = useContext(FirebaseContext);

  const data = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "0", //client=0,advertiser=1,admin=2
  };

  const userCategorie = [
    { name: "Client", key: "0" },
    { name: "Annonceur", key: "1" },
    { name: "Administrateur", key: "2" },
  ];

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");
  const [adminSession, setadminSession] = useState(null);
  const [adminData, setAdminData] = useState(0); 

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setadminSession(user) : props.history.push("/");
    });

    if (!!adminSession) {
      firebase
        .user(adminSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data().userType;
            setAdminData(myData);
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
    return () => {
      listener();
    };
  }, [adminSession, firebase, props.history,setAdminData]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, username } = loginData;
    firebase
      .signupUser(email, password)
      .then((authUser) => {
        return firebase.user(authUser.user.uid).set({
          username,
          email,
          userType,
        });
      })
      .then(() => {
        setLoginData({ ...data });
        props.history.push("/ads");
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  const {
    username,
    email,
    password,
    confirmPassword,
    userType,
  } = loginData;

  const btn =
    username === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  // gestion erreurs
  const errorMsg = error !== "" && <span>{error.message}</span>;

  return adminSession === null ? (
    <Loader loadingMsg={"Authentification ..."} />
  ) : (
    <div>
      <Logout className="logoutContainer" />
      <div className="signUpLoginBox">
        <div className="slContainer">
          <div className="formBoxLeftSignup"></div>
          <div className="formBoxRight">
            <div className="formContent">
              {errorMsg}
              <h2>Nouvel utilisateur</h2>
              <form onSubmit={handleSubmit}>
                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    value={username}
                    type="text"
                    id="username"
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="pseudo">Pseudo</label>
                </div>

                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    value={email}
                    type="email"
                    id="email"
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    value={password}
                    type="password"
                    id="password"
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="password">Mot de passe</label>
                </div>

                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    value={confirmPassword}
                    type="password"
                    id="confirmPassword"
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="confirmPassword">
                    Confirmer le mot de passe
                  </label>
                </div>
                <div>
                  {
                  adminData==='2' && userCategorie.map((type) => { 
                    return (
                      <div key={type.key} className="p-field-radiobutton">
                        <RadioButton
                          inputId={type.key}
                          name="type"
                          value={type}
                          onChange={(e) => {
                            setLoginData({
                              ...loginData,
                              userType: e.value.key,
                            });
                          }}
                          checked={userType === type.key}
                          disabled={type.key === "R"}
                        />
                        <label htmlFor={type.key}>{type.name}</label>
                      </div>
                    );
                  })
                  }
                </div>
                {btn}
              </form>
              <div className="linkContainer">
                <Link className="simpleLink" to="/">
                  Déjà inscrit? Connectez-vous.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
