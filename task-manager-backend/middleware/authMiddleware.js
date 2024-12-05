const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log("Received token:", token); // Debug: Check if token is received

  if (!token) return res.status(401).json({ message: 'No token provided, authorization denied' });

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Debug: Check if token is decoded successfully
      req.user = decoded;
      next();
  } catch (err) {
      console.error("Token verification failed:", err.message); // Debug: Check why verification failed
      res.status(401).json({ message: 'Token is invalid' });
  }
};

module.exports = auth;
