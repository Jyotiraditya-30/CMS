import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const secretKey = process.env.JWT_SECRET || 'default_secret_key';

// Middleware for regular users
export const userAuth = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], secretKey); 

    const user = await User.findById(decoded.user.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Authorization denied, invalid token' });
  }
};

// Middleware for admins
export const adminAuth = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], secretKey); 

    const user = await User.findById(decoded.user.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    if (user.role !== 1) { 
      return res.status(403).json({ message: 'Authorization denied, user is not an admin' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Authorization denied, invalid token' });
  }
};
