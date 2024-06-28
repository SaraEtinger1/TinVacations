import Joi from "joi";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    phone: String,
    role: { type: String, default: "USER" }

})

export const userModel = mongoose.model("users", userSchema);

export const validateUser = (_user) => {
    const useSchema = Joi.object({

        userName: Joi.string().base64().required().,
        password: Joi.string().required().alphanum(),
        email: Joi.string().email().required(),
        phone: Joi.string().phone(),

    })
    return useSchema.validate(_user);
}
export const validateUserLogin = (_user) => {
    const useSchema = Joi.object({

        userName: Joi.string().base64(),
        password: Joi.string().required().alphanum(),
        email: Joi.string().email(),
        phone: Joi.string().phone(),

    })
    return useSchema.validate(_user);
}


export const generateToken = (userName, _id, role) => {
    let token = Jwt.sign({ userName, _id, role }, process.env.JWT_SECRET, {
        expiresIn: "4m"
    })
    return token;
}

