import mongoose from "mongoose";
import { toastModel, validatToast } from "../model/Toast.js";

export const getAllToasts = async (req, res) => {
    let txt = req.query.txt || "";
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 15;
    try {
        let arr = await toastModel.find({ nameT: new RegExp(txt) })
            .skip((page - 1) * perPage).limit(perPage);
        res.json(arr)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
export const getToatsById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("לא קיים כזה קוד")
    try {
        let data = await toastModel.findOne({ _id: id });
        if (!data)
            return res.status(404).send("לא קיים טוסט עם כזה קוד")
        res.json(data)
    }
    catch (err) {
        res.status(400).json(err)

    }
}
export const deleteToast = async (req, res) => {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("לא קיים כזה קוד")
    try {
        // let deletedToast = await toastModel.findByIdAndDelete(id);
        let deletedToast = await toastModel.findById(id);
        if (!deletedToast)
            return res.status(404).send("לא קיים טוסט עם כזה קוד למחיקה")
        if (req.myUser.role != "ADMIN" && req.myUser._id != deleteToast.userAdd)
            return res.status(403).send("רק מנהל או מי שהוסיף את הטוסט לתפריט יכול למחוק אותו");
        deleteToast = await toastModel.findByIdAndDelete(id);
        res.json(deletedToast)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
export const updateToast = async (req, res) => {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("לא קיים כזה קוד")
    let { nameT, price, categories, isChalavi } = req.body;
    try {
        let toastToUpdate = await toastModel.findByIdAndUpdate(id, req.body)
        if (!toastToUpdate)
            return res.status(404).send("לא קיים טוסט עם כזה קוד לעדכון")
        return res.status(200).json(toastToUpdate)
    }
    catch (err) {
        res.status(400).send(err)

    }

}
export const addToast = async (req, res) => {
    let { nameT, isChalavi } = req.body;
    // if (!nameT||!isChalavi)
    //     return res.status(404).send("חסר פרמטרים להוספת טוסט לתפריט")
    let result = validatToast(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message)
    try {
        let sameToast = await toastModel.findOne({ nameT })
        if (sameToast)
            return res.status(409).send("כבר קיים כזה טוסט בתפריט")
        let newToast = new toastModel({ ...req.body, userAdd: req.myUser._id });
        await newToast.save()
        return res.status(201).json(newToast)
    }
    catch (err) {
        res.status(400).json(err)
    }
}