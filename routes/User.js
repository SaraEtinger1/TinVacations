import express from "express";
import { addUser, getAllUsers, loginUser } from "../controller/User.js";
import { authAdmin } from "../middleWares/auth.js";

const router = express.Router();

router.get("/", authAdmin,getAllUsers)

router.post("/", addUser)

router.post("/login", loginUser)

export default router;