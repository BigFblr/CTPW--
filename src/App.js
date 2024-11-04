import "./App.css";
import EmployeeAPI from "./api/service.js";
import { useState } from "react";
import AppRouter from "./Router";
import { lightTheme, darkTheme } from "./theme";
import { CssBaseline, Switch, FormControlLabel } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { Button } from '@mui/material';

const initialEmployees = EmployeeAPI.all();

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
    <CssBaseline /> {/* Обеспечивает базовые стили для тем */}
    <div style={{ padding: '20px' }}>
      <h1>Hello, MUI!</h1>
      <Button variant="contained" onClick={toggleTheme}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </Button>
      <AppRouter 
        isAuthorized={isAuthorized} 
        setIsAuthorized={setIsAuthorized} 
        employees={employees} 
        addEmployee={addEmployee} 
        delEmp={delEmp} 
      />
    </div>
  </ThemeProvider>
  );
}

export default App;