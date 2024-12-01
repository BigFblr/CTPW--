import { createSlice } from '@reduxjs/toolkit';
import EmployeeAPI from "../../api/service";

const initialState = {
    employees: [], 
    error: null,   
    isDarkMode: false,
    isAuthorized: false
};

const slicesEmpl = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload;
        },
        addEmployee: (state, action) => {
            state.employees.push(action.payload); 
        },
        deleteEmployee: (state, action) => {
            state.employees = state.employees.filter(employee => employee.id !== action.payload);
        },
        initializeEmployees: (state) => {
            state.employees = EmployeeAPI.all();
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode; 
        },
        toggleAuthorization: (state) => {
            state.isAuthorized = !state.isAuthorized;
        }
    }
});

export const { setEmployees, addEmployee, deleteEmployee, initializeEmployees, setError, toggleTheme, toggleAuthorization } = slicesEmpl.actions;

export default slicesEmpl.reducer; 