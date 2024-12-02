import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:8088/dish';

export const getDishesByName = async (name, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/name/${name}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching dishes by name:', error);
        throw error.response ? error.response.data : error;
    }
};

export const fetchAllDishes = createAsyncThunk(
  'dishes/fetchAll',
  async (token) => {
      const response = await getAllDishes(token);
      return response;
  }
);

export const getAllDishes = async (token) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/all`, {
          headers: {
              'Authorization': `Bearer ${token}`, // Передаем токен для авторизации
          },
      });
      return response.data; // Возвращаем данные (список блюд)
  } catch (error) {
      console.error('Error fetching all dishes:', error);
      throw error.response ? error.response.data : error; // Обработка ошибок
  }
};

export const getDishesByCost = async (cost, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cost/${cost}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching dishes by cost:', error);
        throw error.response ? error.response.data : error;
    }
};

export const createDish = async (dish, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, dish, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error creating dish:', error);
        throw error.response ? error.response.data : error;
    }
};

export const getDishNamesByMenu = async (menuId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/menu/${menuId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching dish names by menu:', error);
        throw error.response ? error.response.data : error;
    }
};

export const deleteDishAPI = async (id, token) => {
    try {
        await axios.delete(`${API_BASE_URL}/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting dish:', error);
        throw error.response ? error.response.data : error;
    }
};

// const DishAPI = {
//   dishes: [
//     { id: 0, name: "Паста", price: 300, menu: "Основное меню", chef: "Иван Иванов" },
//     { id: 1, name: "Салат Цезарь", price: 250, menu: "Закуски", chef: "Петр Петров" },
//   ],

//   all: function () {
//     return this.dishes;
//   },

//   get: function (id) {
//     return this.dishes.find(dish => dish.id === id);
//   },

//   delete: function (id) {
//     this.dishes = this.dishes.filter(dish => dish.id !== id);
//     return true;
//   },

//   add: function (dish) {
//     // Проверка на существующий id
//     if (dish.id !== undefined && this.dishes.some(d => d.id === dish.id)) {
//       throw new Error(`Dish with id ${dish.id} already exists.`);
//     }

//     // Генерация нового id, если не передан
//     if (dish.id === undefined) {
//       dish.id = this.dishes.length > 0 ? Math.max(...this.dishes.map(d => d.id)) + 1 : 0;
//     }

//     this.dishes.push(dish);
//     return dish;
//   },

//   update: function (dish) {
//     const index = this.dishes.findIndex(d => d.id === dish.id);
//     if (index !== -1) {
//       this.dishes[index] = dish; // Обновляем существующее блюдо
//     }
//     return dish;
//   },
// };

// export default DishAPI; // Экспортируем DishAPI