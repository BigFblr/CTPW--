import { createSlice } from '@reduxjs/toolkit';
import EmployeeAPI from "../../api/service";

const initialState = {
  employees: [],
  isAuthorized: false,
  isDarkMode: false,
};

const slicesEmpl = createSlice({
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
      state.isAuthorized = true;
    },
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    initializeEmployees(state) {
      state.employees = EmployeeAPI.all();
    },
  },
});

export const { 
  setEmployees, 
  addEmployee, 
  deleteEmployee, 
  toggleAuthorization, 
  toggleTheme, 
  initializeEmployees 
} = slicesEmpl.actions;

export default slicesEmpl.reducer;