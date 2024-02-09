import express from "express";
import { addToast, deleteToast, getAllToasts, getToatsById, updateToast } from "../controller/Toast.js";
import { auth } from "../middleWares/auth.js";

const router = express.Router();

router.get("/", getAllToasts)

router.get("/:id", getToatsById)

router.post("/",auth, addToast)

router.delete("/:id", auth,deleteToast)

router.put("/:id",auth,updateToast)


export default router;