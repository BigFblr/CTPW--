import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import DishCard from './Components/DishCard';
import { createDish, deleteDish, fetchAllDishes } from '../../redux/slices/slicesDish'; 
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Dish = () => {
  const dispatch = useDispatch(); 
  const dishes = useSelector(state => state.dishes.dishes); 
  const token = useSelector(state => state.auth.token); 

  const formik = useFormik({
    initialValues: {
      name: '',
      cost: 0,
      ingredients: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Название блюда обязательно'),
      cost: Yup.number()
        .required('Цена обязательна')
        .positive('Цена должна быть положительным числом')
        .integer('Цена должна быть целым числом'),
      ingredients: Yup.string()
        .required('Ингредиенты обязательны'),
    }),
    onSubmit: async (values) => {
      try {
        const createdDish = await dispatch(createDish({ dish: values, token })); 
        if (createdDish.meta.requestStatus === 'fulfilled') {
          formik.resetForm(); // Сбрасываем поля формы
        }
      } catch (error) {
        console.error('Error creating dish:', error);
        alert('Ошибка при создании блюда: ' + (error.message || 'Неизвестная ошибка'));
      }
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Название блюда"
              required
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              name="cost"
              value={formik.values.cost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Цена"
              required
              error={formik.touched.cost && Boolean(formik.errors.cost)}
              helperText={formik.touched.cost && formik.errors.cost}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              name="ingredients"
              value={formik.values.ingredients}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ингредиенты (через запятую)"
              required
              error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}
              helperText={formik.touched.ingredients && formik.errors.ingredients}
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