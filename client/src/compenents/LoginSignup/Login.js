import { useState } from "react";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import { Link } from "react-router-dom";
import "./LoginSignup.css";
import axios from "axios";
import GoogleButton from "react-google-button";

export const Login = ({ registered }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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
      .catch((err) => {
        console.log(err);
        // setError(err);
      });
  };
  const handleShowPassword = () => {
    const passwordInput = document.querySelector("input[name='password']");
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  };
  function navigate(url) {
    window.location.href = url;
  }
  const googleLogin = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}user/auth/google`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await response.json();
    navigate(data.url);
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
              autoComplete="off"
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
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FontAwesomeIcon icon={faEye} onClick={handleShowPassword} /> */}
          </div>
        </div>
        {registered && (
          <div className="success-signup">
            <h4>Successfully registered</h4>
          </div>
        )}
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
        <div className="submit-container">
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className="google-login">
        <GoogleButton
          type="light"
          onClick={() => {
            // Google OAuth code here
            googleLogin();
          }}
        />
      </div>
      <div className="forgot-password">
        Don't have an account ?{" "}
        <span>
          <Link to={"/register"}>Sign Up</Link>
        </span>
      </div>
    </div>
  );
};
