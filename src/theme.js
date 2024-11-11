import { createTheme } from '@mui/material';

// Светлая тема
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D5006D', // Розовый
    },
    secondary: {
      main: '#9C27B0', // Фиолетовый
    },
    background: {
      default: '#F9F9F9', // Мягкий белый
      paper: '#FFFFFF', // Белый
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FF4081 30%, #D5006D 90%)', // Градиент розового
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 64, 129, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: '#E0E0E0',
          padding: '12px 15px',
          borderBottom: '2px solid #ccc',
        },
        body: {
          padding: '12px 15px',
          borderBottom: '1px solid #ddd',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: '#F5F5F5',
          },
          '&:hover': {
            backgroundColor: '#E0E0E0',
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#FFFFFF', // Белый
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: '0.1rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '1rem',
          marginRight: '1rem',
          backgroundColor: '#FAFAFA',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          marginRight: '0.5rem',
          color: '#333',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          maxWidth: '80%',
          margin: '0 auto',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#FFFFFF', // Белый
        },
      },
    },
  },
});

// Темная тема
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D5006D', // Розовый
    },
    secondary: {
      main: '#9C27B0', // Фиолетовый
    },
    background: {
      default: '#121212', // Мягкий черный
      paper: '#1E1E1E', // Темный фон для бумаги
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px', // Уменьшаем размер кнопки
          marginBottom: '20px', 
          background: 'linear-gradient(45deg, #9C27B0 30%, #D5006D 90%)', // Градиент фиолетового
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(156, 39, 176, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: '#333',
          padding: '12px 15px',
          borderBottom: '2px solid #555',
        },
        body: {
          padding: '12px 15px',
          borderBottom: '1px solid #666',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: '#444',
          },
          '&:hover': {
            backgroundColor: '#555',
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '1rem',
          border: '1px solid #666',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#333', // Темный фон
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: '0.1rem',
          border: '1px solid #888',
          borderRadius: '5px',
          fontSize: '1rem',
          marginRight: '1rem',
          backgroundColor: '#444',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          marginRight: '0.5rem',
          color: '#ccc',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          maxWidth: '80%',
          margin: '0 auto',
          padding: '1rem',
          border: '1px solid #666',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#222', // Темный фон
        },
      },
    },
  },
});

export { lightTheme, darkTheme };