import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Employee from "./page/Table/Employee";
import Form from "./page/Table/Components/Form";
import Login from "./page/Login/login";

const AppRouter = ({ isAuthorized, setIsAuthorized, employees, addEmployee, delEmp }) => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuthorized} />} />
        <Route path="/" element={
          isAuthorized ? (
            <>
             <p>Welcome!</p> {/* Приветственное сообщение */}
              <Employee />
            </>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;