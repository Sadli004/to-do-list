import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./compenents/LoginSignup/Login";
import { SignUp } from "./compenents/LoginSignup/SignUp";
import { History } from "./pages/history";
import { Today } from "./pages/today";
import axios from "axios";
import AuthContext from "./appContext";
import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState(null);
  const getUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}user`, {
        withCredentials: true,
      });

      setUserData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={userData}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/today" element={<Today />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
