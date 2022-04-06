import express from "express";
const router = express.Router();

import {
  addStudent,
  getStudents,
  updateStudentInfo,
  deleteStudentInfo,
} from "../controllers/student.js";

router.post("/add", addStudent);
router.get("/getAll", getStudents);
router.put("/:id", updateStudentInfo);
router.delete("/:id", deleteStudentInfo);
export default router;
