import express from "express";
import { getAllOrders, getOrdersById, addOrder, deleteOrder, updateOrder } from "../controller/Order.js";

const router = express.Router();

router.get("/", getAllOrders)

router.get("/:id", getOrdersById)

router.post("/", addOrder)

router.delete("/:id", deleteOrder)

router.put("/:id", updateOrder)


export default router;