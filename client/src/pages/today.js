import React from "react";

import Sidebar from "../compenents/sidebar/SideBar";
import { TodayTasks } from "../compenents/todayTasks";
export const Today = () => {
  return (
    <div className="home-container">
      <div className="content-container">
        <Sidebar />
        <TodayTasks />
      </div>
    </div>
  );
};
