import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from '@mui/material';
import { signIn, signError } from '../../redux/slices/slicesAut';
import { signIn as apiSignIn } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Имя пользователя обязательно'),
      password: Yup.string()
        .required('Пароль обязателен')
        .min(4, 'Пароль должен содержать минимум 4 символа'),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        const token = await apiSignIn(username, password);
        dispatch(signIn({ token, user: { username } }));
      } catch (error) {
        dispatch(signError("Неверные данные для входа"));
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(signError(null)); // Сброс состояния ошибки
    }
  }, [error, dispatch]);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column" sx={{ height: '100vh' }}>
      <Typography variant="h2">Authorization</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            fullWidth
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            fullWidth
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">Login</Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default Login;