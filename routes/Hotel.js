import express from "express";
import { getHotelById, addHotel, getAllHotels, deleteHotel, updateHotel } from "../controller/Hotel.js";
import { authAdmin} from "../middleWares/auth.js";

const router = express.Router();

router.get("/", getAllHotels)

router.get("/:id", getHotelById)

router.post("/", authAdmin, addHotel)

router.delete("/:id", authAdmin, deleteHotel)

router.put("/:id", authAdmin, updateHotel)

export default router;