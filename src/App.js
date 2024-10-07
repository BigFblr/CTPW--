import "./App.css";
import EmployeeAPI from "./api/service.js";
import Table from "./Table";
import Form from "./Form";
import { useState } from "react";
import AuthorizationPage from "./login"

const initialEmployees = EmployeeAPI.all();

function App() {
  return (
    <AuthorizationPage />
  );
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
      <Form handleSubmit={addEmployee} inEmployee={{ name: "", job: "", email: ""}} />
      <Table employees={employees} delEmployee={delEmp} />
    </div>
  );
}

export default App;
