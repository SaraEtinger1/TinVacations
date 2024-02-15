import Joi from "joi";
import mongoose from "mongoose";

const minimalProduct = mongoose.Schema({
    name: String,
    price: Number,
    count: Number
})
const orderSchema = mongoose.Schema({
    day: Number,
    dateToOrder: Date,
    adress: String,
    detailsInviting: String,
    orderedProducts: minimalProduct
})

export const orderModel = mongoose.model("order", orderSchema)

export const validatOrder = (_order) => {
    const oSchema = Joi.object({
        day: Joi.number().required(),
        dateToOrder: Joi.number(),
        adress: Joi.string().required(),
        detailsInviting: Joi.string().required(),
        orderedProducts: Joi.object({
            name: Joi.string(),
            price: Joi.number(),
            count: Joi.number()
        })
    })
    return oSchema.validate(_order);
}