import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getDishesByName,
    getDishesByCost,
    getDishNamesByMenu,
    getAllDishes,
    deleteDishAPI // Не забудьте импортировать deleteDishAPI
} from "../../api/service"; // Импортируем функции для работы с API
import { createDish as createDishApi } from "../../api/service";
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

export const fetchDishesByName = createAsyncThunk(
    'dishes/fetchByName',
    async ({ name, token }) => {
        const response = await getDishesByName(name, token);
        return response;
    }
);

export const fetchDishesByCost = createAsyncThunk(
    'dishes/fetchByCost',
    async ({ cost, token }) => {
        const response = await getDishesByCost(cost, token);
        return response;
    }
);

export const deleteDish = createAsyncThunk(
    'dishes/delete',
    async ({ id, token }) => {
        await deleteDishAPI(id, token); // Убедитесь, что у вас есть API для удаления блюда
        return id; // Возвращаем id для удаления из состояния
    }
);

export const createDish = createAsyncThunk(
    'dishes/add',
    async ({ dish, token }) => {
        const response = await createDishApi(dish, token);
        return response;
    }
);

export const fetchDishNamesByMenu = createAsyncThunk(
    'dishes/fetchNamesByMenu',
    async ({ menuId, token }) => {
        const response = await getDishNamesByMenu(menuId, token);
        return response;
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
            .addCase(fetchDishesByName.fulfilled, (state, action) => {
                state.dishes = action.payload;
                state.error = null;
            })
            .addCase(fetchDishesByName.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(fetchDishesByCost.fulfilled, (state, action) => {
                state.dishes = action.payload;
                state.error = null;
            })
            .addCase(fetchDishesByCost.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteDish.fulfilled, (state, action) => {
                state.dishes = state.dishes.filter(dish => dish.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteDish.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(createDish.fulfilled, (state, action) => {
                state.dishes.push(action.payload);
                state.error = null;
            })
            .addCase(createDish.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(fetchDishNamesByMenu.fulfilled, (state, action) => {
                state.dishes = action.payload;
                state.error = null;
            })
            .addCase(fetchDishNamesByMenu.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

// Используйте правильное имя для экспорта
export const { setError, toggleTheme, toggleAuthorization } = slicesDishes.actions;

export default slicesDishes.reducer;