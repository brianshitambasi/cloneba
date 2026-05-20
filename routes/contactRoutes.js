const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  getContactById,
  markAsRead,
  deleteContact,
} = require('../controllers/contactController');
const { auth, adminOnly } = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', auth, adminOnly, getContacts);
router.get('/:id', auth, adminOnly, getContactById);
router.put('/:id/read', auth, adminOnly, markAsRead);
router.delete('/:id', auth, adminOnly, deleteContact);

module.exports = router;
