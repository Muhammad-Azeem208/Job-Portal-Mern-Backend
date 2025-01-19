import express from "express";
import {deleteJob, getAllJobs, getmyJobs, postJob, updateJob} from "../controllers/jobController.js";
import { Authorized } from "../middlewares/auth.js";
const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", Authorized, postJob);
router.get("/getmyjobs", Authorized, getmyJobs);
router.put("/update/:id", Authorized, updateJob);
router.delete("/delete/:id", Authorized, deleteJob);



export default router;