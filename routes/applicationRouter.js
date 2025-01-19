import express from "express";
import {employerGetAllApplications, jobseekerDeleteApplication, jobseekerGetAllApplications, postApplication} 
from "../controllers/applicationController.js";
import { Authorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", Authorized, postApplication);
router.get("/employer/getall", Authorized, employerGetAllApplications);
router.get("/jobseeker/getall", Authorized, jobseekerGetAllApplications);
router.delete("/delete/:id", Authorized, jobseekerDeleteApplication);


export default router;