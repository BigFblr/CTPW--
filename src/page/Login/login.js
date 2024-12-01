import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from '@mui/material';
import { signIn, signError } from '../../redux/slices/slicesAut';
import { signIn as apiSignIn } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error); // Adjusted to match your error state
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Adjusted to match your authentication state

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await apiSignIn(username, password);
      dispatch(signIn({ token, user: { username } }));
    } catch (error) {
      dispatch(signError("Неверные данные для входа")); // Adjusted error message
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(signError(null)); // Reset error state
    }
  }, [error, dispatch]);

  

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column" sx={{ height: '100vh' }}>
      <Typography variant="h2">Authorization</Typography>
      <form onSubmit={handleLogin}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
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