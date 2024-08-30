import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Today } from "./pages/today";
import { Login } from "./compenents/LoginSignup/Login";
import { SignUp } from "./compenents/LoginSignup/SignUp";
import axios from "axios";
import AuthContext from "./appContext";
import { useEffect, useState } from "react";
import { Completed } from "./pages/completed";
import { Home } from "./pages/home";
import { Upcoming } from "./pages/upcoming";

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
            <Route path="/today" element={<Today />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
