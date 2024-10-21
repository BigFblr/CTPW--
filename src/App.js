import "./App.css";
import EmployeeAPI from "./api/service.js";
import Table from "./Table";
import Form from "./Form";
import Login from "./login";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const initialEmployees = EmployeeAPI.all();

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [isAuthorized, setIsAuthorized] = useState(false); // Используйте одну и ту же переменную
  const delEmp = (id) => {
    if (EmployeeAPI.delete(id)) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  const addEmployee = (employee) => {
    const newEmployee = EmployeeAPI.add(employee);
    if (newEmployee) {
      setEmployees([...employees, newEmployee]);
    }
  };

  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/login" element={<Login setAuth={setIsAuthorized} />} /> // Исправьте здесь
          <Route path="/" element={
            isAuthorized ? ( // Исправьте здесь
              <>
      <Form handleSubmit={addEmployee} inEmployee={{ name: "", job: "", email: ""}} />
      <Table employees={employees} delEmployee={delEmp} />
      </>
      ) : (
        <Navigate to="/login" />
      )
    } />
    </Routes>
    </div>
    </Router>
  );
}

export default App;