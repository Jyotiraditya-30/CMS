import React, { useState } from 'react';
import { TextField, Button, Typography, Link, IconButton, Card, CardMedia } from '@mui/material';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';

import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleChange = prop => event => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        window.location.href = '/Directory';
      } else {
        console.error('Token not received.');
        setLoginError('Invalid email or password'); 
      }
    } catch (error) {
      console.error(error.response.data);
      setLoginError('Invalid email or password'); 
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Card style={{ maxWidth: '400px', margin: 'auto', marginTop: '100px', padding: '20px', border: '1px solid #ccc', borderRadius: '15px' }}>
        <CardMedia
          component="img"
          height="150"
          image="/LoGo1.png" 
          alt="Logo"
          style={{ margin: 'auto', borderRadius: '50%', width: '80px', height: '80px', objectFit: 'cover' }}
        />
        <Typography variant="h5" style={{ marginBottom: '20px' }}>Login</Typography>
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange('email')}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <AccountCircle />
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange('password')}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <Lock />,
                endAdornment: (
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
          </div>
          {loginError && <Typography color="error" style={{ marginBottom: '20px' }}>{loginError}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: '20px' }}>
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </Typography>
      </Card>
    </div>
  );
};

export default Login;
