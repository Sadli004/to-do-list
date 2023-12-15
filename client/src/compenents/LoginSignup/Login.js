import { useState } from "react";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import $ from "jquery";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    $.post(
      `${process.env.REACT_APP_API_URL}user/login`,
      {
        email: email,
        password: password,
      },
      function (data, status) {
        if (status === "success") {
          console.log("user logged in \n", data);
          window.location.href = "/";
        }
        if (status !== "success") {
          console.log("Request failed with status :", status);
        }
      }
    );
  };
  return (
    <div>
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
        <div className="submit-container">
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className="forgot-password">
        Forgot your password ? <span>Click Here!</span>
      </div>
    </div>
  );
};
