const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Extract token from cookie
  if (!token) {
    return res.status(401).json({ message: "Yetkisiz erişim, token gerekli!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token süresi dolmuş!" });
    }
    return res.status(401).json({ message: "Geçersiz token!" });
  }
};

module.exports = authMiddleware;
