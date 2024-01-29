const express = require('express');
const courseController = require('./../controllers/courseController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

router
  .route('/:id')
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    courseController.deleteCourse
  );

module.exports = router;
