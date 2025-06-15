// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getTasks, saveTask } = require('../controllers/taskController');

router.get('/', auth, getTasks);
router.post('/', auth, saveTask);
// add DELETE, PUT if not already there

module.exports = router;
