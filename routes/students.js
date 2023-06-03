const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');

router.get('/', studentController.getAllStudents);
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudentById);
router.patch('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
