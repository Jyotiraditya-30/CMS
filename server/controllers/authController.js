import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/UserModel.js';

const secretKey = process.env.JWT_SECRET || 'default_secret_key';

const authController = {

  async signup(req, res) {
    const { username, email, password } = req.body;
    try {

      // Validation check
      if (username.length > 20) {
        return res.status(400).json({ username: 'Username must be less than 20 characters' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ email: 'Invalid email format' });
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          password: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
        });
      }

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ email: 'Email is already registered' });
      }

      user = new User({ username, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.json({ msg: 'User registered' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },


  async login(req, res) {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      jwt.sign(
        payload,
        secretKey,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token, user });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

}

export default authController;
