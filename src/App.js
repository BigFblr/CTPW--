import "./App.css";
import EmployeeAPI from "./api/service.js";
import { deleteEmployee } from './redux/slices/slicesEmpl';
import { useEffect } from "react";
import AppRouter from "./Router";
import { lightTheme, darkTheme } from "./theme";
import { CssBaseline, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { initializeEmployees, toggleTheme, toggleAuthorization } from './redux/slices/slicesEmpl';

function App() {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employee.employees);
  const isAuthorized = useSelector(state => state.employee.isAuthorized);
  const isDarkMode = useSelector(state => state.employee.isDarkMode);

  useEffect(() => {
    dispatch(initializeEmployees());
  }, [dispatch]);

  const delEmp = (id) => {
    if (EmployeeAPI.delete(id)) {
      dispatch(deleteEmployee(id));
    }
  };

  const addEmployee = (employee) => {
    const newEmployee = EmployeeAPI.add(employee);
    if (newEmployee) {
      dispatch(addEmployee(newEmployee));
    }
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline /> {/* Обеспечивает базовые стили для тем */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Button 
          variant="contained" 
          onClick={handleToggleTheme} 
          style={{ 
            padding: '8px 16px', // Уменьшаем размер кнопки
            marginBottom: '20px' // Добавляем отступ снизу
          }}
        >
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button>
        <AppRouter 
          isAuthorized={isAuthorized} 
          setIsAuthorized={toggleAuthorization} 
          employees={employees} 
          addEmployee={addEmployee} 
          delEmp={delEmp} 
        />
      </div>
    </ThemeProvider>
  );
}

export default App;