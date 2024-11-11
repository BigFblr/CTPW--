import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
  isAuthorized: false,
  isDarkMode: false,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload;
    },
    addEmployee(state, action) {
      state.employees.push(action.payload);
    },
    deleteEmployee(state, action) {
      state.employees = state.employees.filter(employee => employee.id !== action.payload);
    },
    toggleAuthorization(state) {
      state.isAuthorized = !state.isAuthorized;
    },
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setEmployees, addEmployee, deleteEmployee, toggleAuthorization, toggleTheme } = employeeSlice.actions;

export default employeeSlice.reducer;