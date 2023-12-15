import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import { useState } from "react";
import { Login } from "./Login";
import $ from "jquery";
export const SignUp = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    $.post(
      `${process.env.REACT_APP_API_URL}user/register`,
      {
        username: userName,
        password: password,
        Email: email,
      },
      function (data, status) {
        if (status === "success") {
          console.log("user registered \n", data);
          setFormSubmit(true);
        }
        if (status !== "success") {
          console.log("Request failed with status :", status);
        }
      }
    );
  };
  return (
    <div>
      {formSubmit ? (
        <div className="success-signup">
          <Login />
          <h4>Succefully registered</h4>
        </div>
      ) : (
        <div>
          <div className="header">
            <div className="text">SIGN UP</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="inputs">
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input">
                <img src={email_icon} alt="" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <img src={password_icon} alt="" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="submit-container">
                <button type="submit" className="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
