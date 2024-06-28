import Joi from "joi";
import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
    hotelName: String,
    adress: String,
    roomType:[String],
    price: Number,
    opinion: String,
    imgRoom: [String],
    imgHotel: String,
    kosher:String,
    userAdd:String
})

export const hotelModel = mongoose.model("Hotel", hotelSchema)

export const validatHotel = (hotel) => {
    const hSchema = Joi.object({
        hotelName: Joi.string(),
        adress: Joi.string(),
        roomType:Joi.string(),
        price: Joi.number(),
        opinion: Joi.string(),
        imgRoom: Joi.array().string(),
        imgHotel: Joi.string(),
        kosher:Joi.string()
    })
    return hSchema.validate(hotel);
}