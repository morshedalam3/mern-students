import express from "express";
import mongoose from "mongoose";
import Students from "../models/student.js";

const router = express.Router();

// add single student
export const addStudent = async (req, res) => {
  const { stdName, stdAge, stdClass, stdSchool, stdDivision, stdStatus } =
    req.body;
  if (
    !stdName ||
    !stdAge ||
    !stdClass ||
    !stdSchool ||
    !stdDivision ||
    !stdStatus
  ) {
    return res.status(400).json({ message: "Please fill all the fields" });
  } else {
    const newStudent = new Students({
      stdName,
      stdAge,
      stdClass,
      stdSchool,
      stdDivision,
      stdStatus,
    });

    try {
      await newStudent.save();
      res.status(201).json({
        message: "New Student added successfully",
        status: "Success",
      });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};

//get all students
export const getStudents = async (req, res) => {
  try {
    const allStudent = await Students.find();

    res.status(200).json(allStudent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update students information
export const updateStudentInfo = async (req, res) => {
  const { id } = req.params;
  const { stdName, stdAge, stdClass, stdSchool, stdDivision, stdStatus } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No student's data with id: ${id}`);

  const updatedStudent = {
    stdName,
    stdAge,
    stdClass,
    stdSchool,
    stdDivision,
    stdStatus,
    _id: id,
  };
  await Students.findByIdAndUpdate(id, updatedStudent, { new: true });

  res.json(updatedStudent);
};

// delete student information
export const deleteStudentInfo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No student's data with id: ${id}`);

  await Students.findByIdAndRemove(id);

  res.json({ message: "Student data deleted successfully." });
};

export default router;
