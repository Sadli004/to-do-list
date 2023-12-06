import React, { useState } from 'react'
import'./LoginSignup.css'
import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import { SignUp } from './SignUp';
import { Login } from './Login';

export const LoginSignup  = () => {
const [action, setAction] = useState("Login");
const handleClick = () => {
  if(action === "Login"){
  setAction("SignUp")
  } else {
    setAction("Login");
  }
} 
  return (
   <div>
      {action === "Login"?<div className='container'> 
        <Login/>
        <div className='forgot-password'><p>Don't have an account ? <span onClick={handleClick}>Sign Up</span></p></div>
        </div>:
        <div className='container'>
          <SignUp/>
        <div className='forgot-password'><p>Already have an account ? <span onClick={handleClick}>Sign In</span></p></div>          
        </div>  }
   </div>
  )
}