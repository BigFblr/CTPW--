import "./App.css";
import EmployeeAPI from "./api/service.js";
import { useState } from "react";
import AppRouter from "./Router";

const initialEmployees = EmployeeAPI.all();

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [isAuthorized, setIsAuthorized] = useState(false);

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
    <div className="App">
      <AppRouter 
        isAuthorized={isAuthorized} 
        setIsAuthorized={setIsAuthorized} 
        employees={employees} 
        addEmployee={addEmployee} 
        delEmp={delEmp} 
      />
    </div>
  );
}

export default App;