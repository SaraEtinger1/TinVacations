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
        day: Joi.Number().required(),
        dateToOrder: Joi.Number(),
        adress: Joi.String().required(),
        detailsInviting: Joi.String().required(),
        orderedProducts: Joi.object({
            name: Joi.String(),
            price: Joi.Number(),
            count: Joi.Number()
        })
    })
    return oSchema.validate(_order);
}