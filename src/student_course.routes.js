const express = require('express');
const studentcourseController = require('./student_course.controller');
const router = express.Router();


router.post('/addperson', studentcourseController.addPerson);
router.post('/addcourse', studentcourseController.addCourse);
router.post('/addstudentdetails', studentcourseController.addStudentCourse);
router.get('/getstudentdetails', studentcourseController.getStudentCourse);

module.exports = router;