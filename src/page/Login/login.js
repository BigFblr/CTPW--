import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from '@material-ui/core';

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

  if (username === "admin" && password === "password") {
    setAuth(true);
    navigate("/");
  } else {
    alert("Неверные данные для входа");
  }
};

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