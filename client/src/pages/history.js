import React, { useEffect, useState } from "react";
import Sidebar from "../compenents/sidebar/SideBar";
import axios from "axios";

export const History = () => {
  const [history, setHistory] = useState([]);
  const getHistory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}user/history`, {
        withCredentials: true,
      })
      .then(function (response) {
        setHistory(response.data);
      })
      .catch(function (error) {
        console.log("Error fetching history ", error);
      });
  };
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <div className="history">
      <Sidebar />

      <div className="completed-container">
        <div className="completed-container1">
          <h1>History</h1>
          {history &&
            history.map((task) => (
              <div key={task.TaskID} className="Todo">
                {task.Title}
                <div className="end-date">
                  {new Date(task.EndDate).toLocaleDateString()}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
