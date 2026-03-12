const { validationResult } = require("express-validator");

const Course = require("../models/course.models");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/appError");

const { Error } = require("mongoose");

const getAllCourses = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
});

const getCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    const error = AppError.create("course not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, data: { course } });
});

const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = AppError.create(
      { errors: errors.array() },
      400,
      httpStatusText.ERROR,
    );
    return next(error);
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { newCourse } });
});

const editCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: { ...req.body },
    },
  );
  if (!course) {
    const error = AppError.create("course not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  editCourse,
  deleteCourse,
};
