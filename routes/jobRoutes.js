const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', auth, adminOnly, createJob);
router.put('/:id', auth, adminOnly, updateJob);
router.delete('/:id', auth, adminOnly, deleteJob);

module.exports = router;
