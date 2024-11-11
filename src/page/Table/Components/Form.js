import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';

const Form = ({ handleSubmit, inEmployee }) => {
  const [employee, setEmployee] = useState(inEmployee);

  useEffect(() => {
    setEmployee(inEmployee);
  }, [inEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(employee);
    setEmployee(inEmployee); // Сброс формы после отправки
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
        <TextField
          label="Имя"
          name="name"
          value={employee.name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Должность"
          name="job"
          value={employee.job}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          variant="outlined"
        />
        <Button type="submit" variant="contained">Добавить</Button>
      </Box>
    </form>
  );
};

export default Form;