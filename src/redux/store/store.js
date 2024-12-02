import { configureStore } from '@reduxjs/toolkit';
import reducerDish from '../reducers/reducerDish'; 

const store = configureStore({
    reducer: reducerDish,
});

export default store;