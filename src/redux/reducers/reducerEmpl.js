import { combineReducers } from 'redux';
import authReducer from '../slices/slicesAut'; 
import employeeReducer from '../slices/slicesEmpl'; 

const reducerEmpl = combineReducers({
    auth: authReducer, 
    employee: employeeReducer, 
});

export default reducerEmpl;