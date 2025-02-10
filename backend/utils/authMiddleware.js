const jwt = require('jsonwebtoken');  // Assuming JWT is used for auth

// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];  // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided, access denied.' });
  }

  try {
    // Verify token using secret key (ensure the key is securely stored, not hardcoded)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user info to request object
    req.user = decoded;
    next();  // Proceed to next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
