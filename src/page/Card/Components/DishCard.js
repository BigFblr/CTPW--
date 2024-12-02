import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const DishCard = ({ dish, delDish }) => {
  return (
    <Card variant="outlined" style={{ margin: '1rem' }}>
      <CardContent>
        <Typography variant="h5">{dish.name}</Typography>
        <Typography variant="body2">Цена: {dish.cost} руб.</Typography>
        <Typography variant="body2">Ингредиенты:</Typography>
        {Array.isArray(dish.ingredients) ? (
          dish.ingredients.map(ingredient => (
            <div key={ingredient.id}>
              <span>{ingredient.name}</span> - <span>{ingredient.quantity}</span>
            </div>
          ))
        ) : (
          <span>{dish.ingredients}</span> // Если ингредиенты - это строка
        )}
        <Button variant="contained" color="secondary" onClick={delDish}>
          Удалить
        </Button>
      </CardContent>
    </Card>
  );
};

export default DishCard;