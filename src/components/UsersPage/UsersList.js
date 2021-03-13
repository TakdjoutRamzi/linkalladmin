import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./style.css";
import React, { useState } from "react";
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";

const UsersList = (props) => {
  const [selectedUser, setSelectedUser] = useState([]);

  const userTemplate = (option) => {
    return (
      <div className="user-item">
        <img
          alt={option.username}
          src=""
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          className="flag"
        />
        <div>{option.username}</div>
      </div>
    );
  };

  const handleClick = (id) => {
    setSelectedUser(id);
    props.handleClick(id);
  };

  const data = props.users;

  const btn =
    selectedUser.length === 0 ? (
      <Button disabled>Valider</Button>
    ) : (
      <Button onClick={() => handleClick(selectedUser.uid)}>Valider</Button>
    );

  return (
    <div>
      <div className="card">
        <h5>Liste des utilisateurs :</h5>
        <ListBox
          value={selectedUser}
          options={data}
          onChange={(e) => setSelectedUser(e.value)}
          filter
          optionLabel="name"
          itemTemplate={userTemplate}
          style={{ width: "20rem" }}
          listStyle={{ maxHeight: "800px" }}
        />
        <div className="formContent">{btn}</div>
      </div>
    </div>
  );
};

export default UsersList;
