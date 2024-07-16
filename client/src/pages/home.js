import React, { useEffect } from "react";
import { TodoWrapper } from "../compenents/TodoWrapper";
import Sidebar from "../compenents/SideBar";
import { useState } from "react";
import axios from "axios";
export const Home = () => {
  const [userData, setUserData] = useState(null);
  const getUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}user`, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log("User data : ", response.data);
        setUserData(response.data);
      })
      .catch(function (error) {
        console.log("Error fetching user data ", error);
      });
  };
  // const CheckUser = () => {
  //   if (!userData) {
  //     window.location.href = "/login";
  //   }
  // };
  useEffect(() => {
    getUser();
  }, []);
  return (
    // <div className="home-container">
    <>
      <Sidebar />
      <TodoWrapper />
    </>
  );
};
