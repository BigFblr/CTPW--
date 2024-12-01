import { configureStore } from '@reduxjs/toolkit';
import reducerEmpl from '../reducers/reducerEmpl'; 

const store = configureStore({
    reducer: reducerEmpl,
});

export default store;