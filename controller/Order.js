import mongoose from "mongoose";
import { orderModel } from "../model/Order.js";

export const getAllOrders = async (req, res) => {
    try {
        let arr = await orderModel.find({})
        res.json(arr)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
export const getOrdersById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("לא קיים כזה קוד")
    try {
        let data = await orderModel.findOne({ _id: id });
        if (!data)
            return res.status(404).send("לא קיים הזמנה במערכת עם כזה קוד")
        res.json(data)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
export const deleteOrder = async (req, res) => {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("לא קיים כזה קוד")
    try {
        let deletedOrder = await orderModel.findByIdAndDelete(id);
        if (!deletedOrder)
            return res.status(404).send("לא קיים הזמנה במערכת עם כזה קוד למחיקה")
        res.json(deletedOrder)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
export const updateOrder = async (req, res) => {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("לא קיים כזה קוד")
    // let { name, price, categories, isChalavi } = req.body;
    try {
        let orderToUpdate = await orderModel.findByIdAndUpdate(id, req.body)
        if (!orderToUpdate)
            return res.status(404).send("לא קיים הזמנה במערכת עם כזה קוד לעדכון")
        return res.status(200).json(orderToUpdate)
    }
    catch (err) {
        res.status(400).send(err)

    }

}
export const addOrder = async (req, res) => {
    let { day, adress, orderedProducts } = req.body;
    if (!day || !adress || !orderedProducts)
        return res.status(404).send("חסר פרמטרים להוספת הזמנה למערכת")
    try {
        let sameOrder = await orderModel.findOne({ day, adress, orderedProducts })
        if (sameOrder)
            return res.status(409).send("כבר קיים כזו הזמנה במערכת ")
        let newOrder = new orderModel(req.body);
        await newOrder.save()
        return res.status(201).json(newOrder)
    }
    catch (err) {
        res.status(400).json(err)
    }
}