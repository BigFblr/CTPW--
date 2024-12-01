import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Employee from "./page/Table/Employee";
import Login from "./page/Login/login";
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const isAuthorized = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          isAuthorized ? (
            <Employee />
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;