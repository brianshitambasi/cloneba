const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const {
  auth,
  authorizeRoles,
  checkOwnership,
} = require("../middleware/auth");

// =========================
// PUBLIC ROUTES
// =========================
router.post("/register", register);
router.post("/login", login);

// =========================
// ADMIN ONLY ROUTES
// =========================
router.get("/", auth, authorizeRoles("admin"), getUsers);

router.delete("/:id", auth, authorizeRoles("admin"), deleteUser);

// =========================
// OWNER OR ADMIN ROUTES
// =========================
router.get("/:id", auth, checkOwnership, getUserById);

router.put("/:id", auth, checkOwnership, updateUser);

module.exports = router;