import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faHouse,
  faClockRotateLeft,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

const Sidebar = () => {
  // const [userData, setUserData] = useState(null);
  // const getUser = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API_URL}user`, {
  //       withCredentials: true,
  //     })
  //     .then(function (response) {
  //       console.log("User data : ", response.data);
  //       setUserData(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log("Error fetching user data ", error);
  //     });
  // };
  const handlLogout = async (e) => {
    e.preventDefault();
    await axios
      .get(`${process.env.REACT_APP_API_URL}user/logout`, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log("user logged out ", response.data);
        Cookies.remove("jwt", { path: "/", expires: 1 });

        window.location.href = "/login";
      })
      .catch(function (error) {
        console.log("error logging out ", error);
      });
  };
  // useEffect(() => {
  //   getUser();
  // }, []);
  return (
    // <div className="sidebar-container">
    <div className="sidebar" id="sidebar">
      <h3>Task Manager</h3>
      <hr></hr>
      <div className="sidebarElement">
        <Link to="/">
          <button className="gg-btn">
            <FontAwesomeIcon
              icon={faHouse}
              style={{ color: "#ffffff", marginRight: "0.5rem" }}
            />
            home
          </button>
        </Link>
        <Link to="/today">
          <button className="gg-btn">
            <FontAwesomeIcon
              icon={faCalendarDay}
              style={{ color: "#ffffff", marginRight: "0.5rem" }}
            />
            Today
          </button>
        </Link>
        <Link to="/history">
          <button className="gg-btn">
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              style={{ color: "#ffffff", marginRight: "0.5rem" }}
            />
            history
          </button>
        </Link>
      </div>
      <div className="logout-container">
        <Link to="/login">
          <button onClick={handlLogout} className="logout">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              style={{ color: "#ff0000", marginRight: "0.5rem" }}
            />
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
