import React, { useState, useEffect, useContext } from "react";
import UsersList from "./UsersList";
import { FirebaseContext } from "../Firebase";
import Loader from "../Loader";
import Logout from "../Logout";

const UsersPage = (props) => {
  const firebase = useContext(FirebaseContext);
  const [adminSession, setadminSession] = useState(null);
  const [usersName, setUsersName] = useState(null);
  //const [adminData, setAdminData] = useState({});

  const handleClick = (id) => {
    props.history.push({
      pathname: "/ads",
      state: id,
    });
  };

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setadminSession(user) : props.history.push("/");
    });

    return () => {
      listener();
    };
  }, [setadminSession, firebase, props.history]);

  useEffect(() => {
    let users = [];

    const getUsersName = async () => {
      const data = await firebase.dataCollection('users').get();
      data.docs.forEach((item) => {
        users.push({ ...item.data(), "uid": item.id });
      });
      setUsersName(users);
    };
    getUsersName();
  }, [firebase]);

  return adminSession === null ? (
    <Loader loadingMsg={"Authentification ..."} />
  ) : (
    <div>
      <Logout className="logoutContainer" />
      <div className="usersList">
        <UsersList users={usersName} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default UsersPage;
