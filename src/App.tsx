import React, { useContext, useEffect } from "react";
import "./App.css";
import "./pages/auth/LoginPage";
import AuthContext from "./store/auth";
import { useNavigate, Outlet } from "react-router-dom";

function App() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    authContext?.tryAutoLogin();
    if (!authContext?.isAuthenticated) {
      //console.log("Redirecting....");
      navigate("/login");
    }
    console.log("Is Logged in: ", authContext?.isAuthenticated);
  }, [authContext?.isAuthenticated, navigate]);

  return <Outlet />;
}

export default App;
