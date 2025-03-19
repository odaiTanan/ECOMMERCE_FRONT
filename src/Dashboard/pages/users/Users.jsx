import React, { useEffect, useState } from "react";
import { DELETE_USER, USER, USERS } from "../../../api/api";
import { Axios } from "../../../api/Axios";
import Table from "../../components/Table";

const Users = () => {
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    try {
      Axios.get(USER).then((res) =>
        setCurrentUser({ id: res.data.id, name: res.data.name })
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="main-dash">
      <Table
        headers={["name", "email", "role", "created_at", "updated_at"]}
        api={USERS}
        searchPage={"user"}
        delete={DELETE_USER}
        isUser={true}
        currentUser={currentUser}
        caption={"USERS"}
      />
    </div>
  );
};

export default Users;
