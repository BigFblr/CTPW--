import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import DishCard from './Components/DishCard';
import { createDish, deleteDish, fetchAllDishes } from '../../redux/slices/slicesDish'; // Импортируем fetchAllDishes
import { Box, Button, TextField, Typography, Grid } from '@mui/material';

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
          await dispatch(fetchAllDishes(token)); 
        } catch (error) {
          console.error('Error fetching dishes:', error);
        }
      }
    };

    fetchDishes(); 
  }, [dispatch, token]); 

  return (
    <Box sx={{ padding: '2rem', backgroundColor: 'background.default' }}>
      <Typography variant="h4" gutterBottom>
        Добавить новое блюдо
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              name="name"
              value={newDish.name}
              onChange={handleChange}
              placeholder="Название блюда"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              name="cost"
              value={newDish.cost}
              onChange={handleChange}
              placeholder="Цена"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              name="ingredients"
              value={newDish.ingredients}
              onChange={handleChange}
              placeholder="Ингредиенты (через запятую)"
              required
            />
          </Grid>
        </Grid>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          sx={{ marginTop: '1rem' }}
        >
          Добавить блюдо
        </Button>
      </form>
      <Typography variant="h5" sx={{ marginTop: '2rem' }}>
        Список блюд
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
        {dishes.map(dish => (
          <Grid item xs={12} sm={6} md={4} key={dish.id}>
            <DishCard dish={dish} delDish={() => delDish(dish.id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dish;