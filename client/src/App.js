import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./compenents/LoginSignup/Login";
import { SignUp } from "./compenents/LoginSignup/SignUp";
import { History } from "./pages/history";
import { Today } from "./pages/today";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/today" element={<Today />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
