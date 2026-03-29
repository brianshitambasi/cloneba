const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
} = require("../controller/contactController");

const { auth, authorizeRoles } = require("../middleware/auth");

// =========================
// PUBLIC ROUTES
// =========================
router.post("/", createContact);

// =========================
// ADMIN ONLY ROUTES
// =========================
router.get("/", auth, authorizeRoles("admin"), getContacts);

router.get("/:id", auth, authorizeRoles("admin"), getContactById);

router.delete("/:id", auth, authorizeRoles("admin"), deleteContact);

module.exports = router;