import { combineReducers } from 'redux';
import authReducer from '../slices/slicesAut'; 
import slicesDish from '../slices/slicesDish'; 

const rootReducer = combineReducers({
    auth: authReducer, 
    dishes: slicesDish,
});

export default rootReducer;