import { useState } from "react";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import { Link } from "react-router-dom";
import "./LoginSignup.css";
import axios from "axios";

export const Login = ({ registered }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}user/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: "true",
        }
      )
      .then(function (response) {
        console.log(response.data);
        window.location.href = "/";
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">LOGIN</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleLogin}>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {registered && (
          <div className="success-signup">
            <h4>Successfully registered</h4>
          </div>
        )}
        <div className="submit-container">
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className="forgot-password">
        Don't have an account ?{" "}
        <span>
          <Link to={"/register"}>Sign Up</Link>
        </span>
      </div>
    </div>
  );
};
