import React, { useState } from 'react';
import { TextField, Button, Typography, Link, IconButton, InputAdornment, Card, CardMedia } from '@mui/material';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';

import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { username, email, password } = formData;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data);
      setIsRegistered(true);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        setErrors({
          username: errorData.username || '',
          email: errorData.email || '',
          password: errorData.password || ''
        });
      } else {
        console.error(error);
      }
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
          style={{ margin: 'auto', borderRadius: '50%', width: '80px', height: '80px', objectFit: 'cover', marginBottom: '20px' }}
        />
        <Typography variant="h5" style={{ marginBottom: '20px' }}>Sign Up</Typography>
        {isRegistered ? (
          <div>
            <Typography style={{ marginBottom: '20px' }}>USER REGISTERED SUCCESSFULLY <Link href="/">login page</Link>.</Typography>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <TextField
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: <AccountCircle />
                }}
              />
              {errors.username && <Typography color="error">{errors.username}</Typography>}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <TextField
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: <AccountCircle />
                }}
              />
              {errors.email && <Typography color="error">{errors.email}</Typography>}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <TextField
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                minLength="6"
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: <Lock />,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && <Typography color="error">{errors.password}</Typography>}
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
            <Typography variant="body2" style={{ marginTop: '20px' }}>
              Login if have an account <Link href="/">Login</Link>
            </Typography>
          </form>

        )}

      </Card>
    </div>
  );
};

export default Signup;
