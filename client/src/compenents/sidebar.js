import React from 'react';
import { Link } from 'react-router-dom';
import'./sidebar.css'



const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <div className='sidebar'>
      <h3>Task Manager</h3>
      <hr></hr>
        <div className='sidebarElement'>
        <Link to='/'><button  className='gg-btn' >home</button></Link>
        <Link to='/completed'><button  className='gg-btn' >completed</button></Link>
        <Link to='/history'><button  className='gg-btn' >history</button></Link>
        </div>
        <Link to='/profile'><button  className='logout' >Logout</button></Link>
      </div> 
    </div>
  );
};

export default Sidebar;