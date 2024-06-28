import mongoose from "mongoose";
import { hotelModel, validatHotel } from "../model/Hotel.js";

export const getAllHotels = async (req, res) => {
    let txt = req.query.txt || "";
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 15;
    try {
        let arr = await hotelModel.find({ hotelName: new RegExp(txt) })
            .skip((page - 1) * perPage).limit(perPage);
        res.json(arr)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
export const getHotelById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("לא קיים כזה קוד")
    try {
        let data = await hotelModel.findOne({ _id: id });
        if (!data)
            return res.status(404).send("לא קיים מלון עם כזה קוד")
        res.json(data)
    }
    catch (err) {
        res.status(400).json(err)

    }
}
export const deleteHotel = async (req, res) => {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("לא קיים כזה קוד")
    try {
        let deletedHotel = await hotelModel.findById(id);
        if (!deleteHoteld)
            return res.status(404).send("לא קיים מלון עם כזה קוד למחיקה")
        if (req.myUser.role != "ADMIN" && req.myUser._id != deletedHotel.userAdd)
            return res.status(403).send("רק מנהל או מי שהוסיף את המלון למערכת יכול למחוק אותו");
        deletedHotel = await hotelModel.findByIdAndDelete(id);
        res.json(deletedHotel)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
export const updateHotel = async (req, res) => {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("לא קיים כזה קוד")
    try {
        let hotelToUpdate = await hotelModel.findByIdAndUpdate(id, req.body)
        if (!hotelToUpdate)
            return res.status(404).send("לא קיים מלון עם כזה קוד לעדכון")
        return res.status(200).json(hotelToUpdate)
    }
    catch (err) {
        res.status(400).send(err)

    }

}
export const addHotel = async (req, res) => {
    let { hotelName, adress, kosher } = req.body;   
    let result = validatHotel(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message)
    try {
        let sameHotel = await hotelModel.findOne({ hotelName, adress, kosher })
        if (sameHotel)
            return res.status(409).send("כבר קיים כזה מלון במערכת")
        let newHotel = new hotelModel({ ...req.body, userAdd: req.myUser._id });

        await newHotel.save()
        return res.status(201).json(newHotel)
    }
    catch (err) {
        res.status(400).json(err)
    }
}