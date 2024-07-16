import React from "react";

import Sidebar from "../compenents/SideBar";
import { TodayTasks } from "../compenents/todayTasks";
export const Today = () => {
  return (
    // <div className="home-container">
    <>
      <Sidebar />
      <TodayTasks />
    </>
  );
};
