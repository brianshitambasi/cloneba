const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', auth, adminOnly, createProject);
router.put('/:id', auth, adminOnly, updateProject);
router.delete('/:id', auth, adminOnly, deleteProject);

module.exports = router;
