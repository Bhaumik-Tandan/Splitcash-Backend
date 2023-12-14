import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  // Check if the "Authorization" header is present and starts with "Bearer "
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).send("A valid Bearer token is required for authentication");
  }

  // Extract the token from the header
  const token = authHeader.substring(7); // Remove "Bearer " from the beginning

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the userId to the req object
    req.userId = decoded.userId;
    req.user = decoded; // Keep this line if you want to use other token payload data in your routes
    
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

export default authenticate;
