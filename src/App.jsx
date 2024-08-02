import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import MainRoute from "./routes/MainRoute";
import Posts from "./components/Posts";

function App() {
  console.log("App rendering");
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route element={<MainRoute />}>
        <Route path="/" element={<Posts />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
