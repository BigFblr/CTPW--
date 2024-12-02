import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import DishCard from './Components/DishCard';
import { createDish, deleteDish, fetchAllDishes } from '../../redux/slices/slicesDish'; // Импортируем fetchAllDishes

const Dish = () => {
  const dispatch = useDispatch(); 
  const dishes = useSelector(state => state.dishes.dishes); 
  const token = useSelector(state => state.auth.token); 
  const [newDish, setNewDish] = useState({ id: null, cost: 0, name: '', ingredients: '' }); // Изменено поле id_menu и id_special_offer на ingredients

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDish({ ...newDish, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const createdDish = await dispatch(createDish({ dish: newDish, token })); 
      if (createdDish.meta.requestStatus === 'fulfilled') {
        setNewDish({ id: null, cost: 0, name: '', ingredients: '' }); // Сбрасываем поля формы
      }
    } catch (error) {
      console.error('Error creating dish:', error);
      alert('Ошибка при создании блюда: ' + (error.message || 'Неизвестная ошибка'));
    }
  };

  const delDish = async (id) => {
    try {
      await dispatch(deleteDish({ id, token })); 
    } catch (error) {
      console.error('Error deleting dish:', error);
      alert('Ошибка при удалении блюда: ' + (error.message || 'Неизвестная ошибка'));
    }
  };

  useEffect(() => {
    const fetchDishes = async () => {
      if (token) {
        try {
          // Используем dispatch для получения всех блюд
          await dispatch(fetchAllDishes(token)); 
        } catch (error) {
          console.error('Error fetching dishes:', error);
        }
      }
    };

    fetchDishes(); // Вызов функции для получения блюд
  }, [dispatch, token]); 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Здесь можно добавить форму для добавления нового блюда */}
        <input
          type="text"
          name="name"
          value={newDish.name}
          onChange={handleChange}
          placeholder="Название блюда"
          required
        />
        <input
          type="number"
          name="cost"
          value={newDish.cost}
          onChange={handleChange}
          placeholder="Цена"
          required
        />
        <input
          type="text"
          name="ingredients"
          value={newDish.ingredients}
          onChange={handleChange}
          placeholder="Ингредиенты (через запятую)"
          required
        />
        <button type="submit">Добавить блюдо</button>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {dishes.map(dish => (
          <DishCard key={dish.id} dish={dish} delDish={() => delDish(dish.id)} />
        ))}
      </div>
    </div>
  );
};

export default Dish;