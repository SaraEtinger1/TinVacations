import Joi from "joi";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    phone: String,
    role: { type: String, default: "USER" }
    // dateLogin: Date
})

export const userModel = mongoose.model("users", userSchema);

export const validateUser = (_user) => {
    const useSchema = Joi.object({


        userName: Joi.string(),
        password: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),


        // userName: Joi.string().base64().required(),
        // password: Joi.string().required().alphanum(),
        // email: Joi.string().email().required(),
        // phone: Joi.string().phone().required(),
        // role:Joi.string().base64().required(),
        // // dateLogin: Joi.Date().required()
    })
    return useSchema.validate(_user);
}
export const validateUserLogin = (_user) => {
    const useSchema = Joi.object({

        userName: Joi.string(),
        password: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),


        // userName: Joi.string().base64(),
        // password: Joi.string().required().alphanum(),
        // email: Joi.string().email().required(),
        // phone: Joi.string().phone(),
        // dateLogin: Joi.Date()
    })
    return useSchema.validate(_user);
}


export const generateToken = (userName, _id, role) => {
    let token = Jwt.sign({ userName, _id, role }, process.env.JWT_SECRET || "succsful", {
        expiresIn: "4m"
    })
    return token;
}

