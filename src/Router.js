import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dish from "./page/Card/Dish"; 
import Login from "./page/Login/login";
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const isAuthorized = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Добавляем маршрут для страницы входа */}
        <Route path="/" element={
          isAuthorized ? (
            <Dish /> 
          ) : (
            <Navigate to="/login" /> 
          )
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;