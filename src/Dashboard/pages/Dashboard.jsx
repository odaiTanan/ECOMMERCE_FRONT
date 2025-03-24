import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import useUserQuery from "../../tanstckQuery/hooks/useUserQuery";
const Dashboard = () => {
  //sideBar state
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  //get user
  const { data: user = "" } = useUserQuery();

  return (
    <div id="dashboard">
      <Header user={user} />
      <div id="con">
        {/*shadow page next to side bar in mobile screen*/}
        <div
          className="shadow-page"
          style={{ display: open ? "block" : "none" }}
        ></div>
        <SideBar user={user} open={open} setOpen={setOpen} />
        <div
          className="dashContent"
          style={{
            width: open == 1 ? "calc(100% - 250px)" : "calc(100% - 60px)",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
