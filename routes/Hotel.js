import express from "express";
import { getHotelById, addHotel, getAllHotels, deleteHotel, updateHotel } from "../controller/Hotel.js";
import { auth } from "../middleWares/auth.js";

const router = express.Router();

router.get("/", getAllHotels)

router.get("/:id", getHotelById)

// router.post("/", addHotel)
router.post("/", auth, addHotel)

router.delete("/:id", auth, deleteHotel)

// router.put("/:id",  updateHotel)
router.put("/:id", auth, updateHotel)



export default router;