import Joi from "joi";
import mongoose from "mongoose";

const toastSchema = mongoose.Schema({
    nameT: String,
    price: Number,
    // categories:[String],
    // img: img,
    isChalavi: Boolean
})

export const toastModel = mongoose.model("Toast", toastSchema)

export const validatToast = (_toast) => {
    const tSchema = Joi.object({
        nameT: Joi.String(),
        price: Joi.Number(),
        isChalavi: Joi.Boolean()
    })
    return tSchema.validate(_toast);
}