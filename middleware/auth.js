const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// ==========================
// AUTH MIDDLEWARE (JWT VERIFY)
// ==========================
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// ==========================
// ROLE-BASED AUTHORIZATION
// ==========================
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Access denied: insufficient permissions",
      });
    }

    next();
  };
};

// ==========================
// OWNERSHIP CHECK MIDDLEWARE
// ==========================
const checkOwnership = (req, res, next) => {
  const userIdFromToken = req.user.id;
  const userRole = req.user.role;
  const userIdFromParams = req.params.id;

  // allow admin always
  if (userRole === "admin") return next();

  // allow only self access
  if (userIdFromToken !== userIdFromParams) {
    return res.status(403).json({
      error: "You can only access or modify your own account",
    });
  }

  next();
};

module.exports = {
  auth,
  authorizeRoles,
  checkOwnership,
};