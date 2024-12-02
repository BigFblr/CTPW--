import "./App.css";
import { useEffect } from "react";
import AppRouter from "./Router";
import { lightTheme, darkTheme } from "./theme";
import { CssBaseline, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllDishes,
  toggleTheme,
  toggleAuthorization
} from './redux/slices/slicesDish';

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(state => state.dishes.isAuthorized);
  const isDarkMode = useSelector(state => state.dishes.isDarkMode);
  const token = useSelector(state => state.auth.token); // Получаем токен из состояния auth

  useEffect(() => {
    if (token) {
      dispatch(fetchAllDishes(token)); // Загружаем все блюда при инициализации компонента
    }
  }, [dispatch, token]); 

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
        />
      </div>
    </ThemeProvider>
  );
}

export default App;