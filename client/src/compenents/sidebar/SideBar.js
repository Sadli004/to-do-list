import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faHouse,
  faClockRotateLeft,
  faCalendarDay,
  faBell,
  faBellSlash,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import AuthContext from "../../appContext";

const Sidebar = () => {
  const location = useLocation();
  const userData = useContext(AuthContext);

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

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="user-info">
            <img src="./avatar.png" />
            <h2>{userData[0].Username}</h2>
          </div>
          <div className="icons">
            <FontAwesomeIcon icon={faBell} />
          </div>
        </div>
        <hr></hr>
        <div className="sidebar-elements">
          {/* <Link
            to="/"
            className={`gg-btn ${location.pathname === "/" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faHouse} style={{ marginRight: "0.5rem" }} />
            Home
          </Link> */}
          <Link
            to="/"
            className={`gg-btn ${location.pathname === "/" ? "active" : ""}`}
          >
            <FontAwesomeIcon
              icon={faCalendarDay}
              style={{ marginRight: "0.5rem" }}
            />
            Today
          </Link>
          <Link
            to="/history"
            className={`gg-btn ${
              location.pathname === "/history" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              style={{ marginRight: "0.5rem" }}
            />
            History
          </Link>
        </div>
      </div>
      <div className="logout-container">
        <Link to="/login" onClick={handlLogout}>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            style={{ color: "#ff0000", marginRight: "0.5rem" }}
          />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
