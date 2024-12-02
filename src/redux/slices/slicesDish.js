import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDish as createDishApi, getAllDishes, deleteDishAPI } from "../../api/service"; // Импортируйте вашу функцию createDish

const initialState = {
    dishes: [],
    error: null,
    isDarkMode: false,
    isAuthorized: false,
};

export const fetchAllDishes = createAsyncThunk(
    'dishes/fetchAll',
    async (token) => {
        const response = await getAllDishes(token);
        return response;
    }
);

export const deleteDish = createAsyncThunk(
    'dishes/delete',
    async ({ id, token }) => {
        await deleteDishAPI(id, token);
        return id; // Возвращаем id для удаления из состояния
    }
);

export const createDish = createAsyncThunk(
    'dishes/add',
    async ({ dish, token }) => {
        const response = await createDishApi(dish, token); // Используем вашу функцию для создания блюда
        return response; // Возвращаем созданное блюдо
    }
);

const slicesDishes = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
        toggleAuthorization: (state) => {
            state.isAuthorized = !state.isAuthorized;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllDishes.fulfilled, (state, action) => {
                state.dishes = action.payload; // Обновляем список блюд с полученными данными
                state.error = null; // Сбрасываем ошибку
            })
            .addCase(fetchAllDishes.rejected, (state, action) => {
                state.error = action.error.message; // Устанавливаем сообщение об ошибке
            })
            .addCase(deleteDish.fulfilled, (state, action) => {
                state.dishes = state.dishes.filter(dish => dish.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteDish.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(createDish.fulfilled, (state, action) => {
                state.dishes.push(action.payload); // Добавляем новое блюдо в состояние
                state.error = null;
            })
            .addCase(createDish.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export const { setError, toggleTheme, toggleAuthorization } = slicesDishes.actions;

export default slicesDishes.reducer;