import React, { useContext, useEffect } from "react";
import { TodoWrapper } from "../compenents/Wrapper/TodoWrapper";
import Sidebar from "../compenents/sidebar/SideBar";
import AuthContext from "../appContext";
import { Login } from "../compenents/LoginSignup/Login";
export const Home = () => {
  const userData = useContext(AuthContext);

  return (
    <div className="home-container">
      {userData ? (
        <div className="content-container">
          <Sidebar />
          <TodoWrapper />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};
