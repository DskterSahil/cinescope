// middleware/verifyToken.js
import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token,"ff9d462d4513ec5445bab5aa92b816dc8dc6ad4e7b335fbfcebc6f18511ba516");
    req.user = decoded; // Attach user payload to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
