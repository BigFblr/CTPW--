// AuthorizationPage.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';

const AuthorizationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you can add your authorization logic
    console.log(`Username: ${username}, Password: ${password}`);
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

export default AuthorizationPage;