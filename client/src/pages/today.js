import React, { useContext, useEffect, useState } from "react";
import { TodoWrapper } from "../compenents/Wrapper/TodoWrapper";
import Sidebar from "../compenents/sidebar/SideBar";
import AuthContext from "../appContext";
import axios from "axios";
import { Login } from "../compenents/LoginSignup/Login";
export const Today = () => {
  const userData = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [taskChanged, setTaskChanged] = useState(false);
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}task/today`,
        {
          withCredentials: true,
        }
      );

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
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
