//https://www.youtube.com/watch?v=Y-XW9m8qOis
import React from "react";
import "./App.css";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import LandingPage from "./views/LandingPage";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./views/HomePage";
import ProfilePage from "./views/ProfilePage";
import SettingsPage from "./views/SettingsPage";
import Notifications from './views/Notifications';
import OtherProfilePage from "./views/OtherProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/otherprofile" element={<OtherProfilePage/>}/>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<Notifications/>}/>
      </Routes>
    </div>
  );
}

export default App;
