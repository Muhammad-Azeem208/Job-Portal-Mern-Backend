import express from "express";
import {getUser, logout, register} from "../controllers/userController.js";
import {login} from "../controllers/userController.js";
import { Authorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", Authorized, logout);
router.get("/getuser", Authorized, getUser);

export default router;