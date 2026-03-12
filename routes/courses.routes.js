const express = require("express");


const router = express.Router();

const coursesController = require("../controllers/courses.controller");
const verifyToken = require('../middleware/verifyToken');
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middleware/allowedTo");
const validationSchema = require("../middleware/validationSchema");

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(verifyToken,allowedTo(userRoles.MANAGER),validationSchema,coursesController.addCourse,);

router
  .route("/:courseId")
  .get(coursesController.getCourse)
  .patch(verifyToken , allowedTo(userRoles.MANAGER),coursesController.editCourse)
  .delete(verifyToken ,allowedTo(userRoles.ADMIN, userRoles.MANAGER), coursesController.deleteCourse);

module.exports = router;
