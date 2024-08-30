import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../appContext";
import Sidebar from "../compenents/sidebar/SideBar";
import axios from "axios";
import { TodoWrapper } from "../compenents/Wrapper/TodoWrapper";
import { Login } from "../compenents/LoginSignup/Login";

export const Completed = () => {
  const userData = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [taskChanged, setTaskChanged] = useState(false);
  const getTasks = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}task/completed`, {
        withCredentials: true,
      })
      .then(function (response) {
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.log("Error: response data is not an array");
        }
      })
      .catch(function (error) {
        console.log("Error fetching history ", error);
      });
  };
  useEffect(() => {
    getTasks();
  }, [taskChanged]);
  return (
    <div className="home-container">
      {userData ? (
        <div className="content-container">
          <Sidebar />
          <TodoWrapper
            tasks={tasks}
            setTasks={setTasks}
            taskChanged={taskChanged}
            setTaskChanged={setTaskChanged}
          />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};
