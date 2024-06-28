import bcryptjs from "bcryptjs";
import { userModel, validateUser, validateUserLogin } from "../model/User.js";
import { generateToken } from "../model/User.js";

export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await userModel.find({})
        res.json(allUsers)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
export const addUser = async (req, res) => {
    try {
        let { userName, password, email, phone } = req.body;
        let result = validateUser(req.body);
        console.log(result)
        if (result.error)
            return res.status(400).send(result.error.details[0].message)

        let sameUser = await userModel.findOne({ email })
        if (sameUser)
            return res.status(409).send("כבר קיים משתמש כזה")

        let hashedPassword = await bcryptjs.hash(password, 15);

        let newUser = new userModel({ userName, password: hashedPassword, email, phone});
        await newUser.save()
        let token = generateToken(newUser.userName, newUser._id, newUser.role);

        return res.status(201).json({ userName: newUser.userName, role: newUser.role, _id: newUser._id, token })
    }
    catch (err) {
        return res.status(400).json(err)
    }
}

export const loginUser = async (req, res) => {
    try {
        let { password, email } = req.body;
        let result = validateUserLogin(req.body);
        console.log(result)
        if (result.error)
            return res.status(400).send(result.error.details[0].message)

        let isUser = await userModel.findOne({ email })
        if (!isUser)
            return res.status(400).send("לא קיים מייל זה במערכת")
        if (!await bcryptjs.compare(password, isUser.password))
            return res.status(400).send("סיסמא לא נכונה")
        let token = generateToken(isUser.userName, isUser._id, isUser.role);
        return res.status(201).json({ userName: isUser.userName, role: isUser.role, _id: isUser._id, token })
    }
    catch (err) {
        res.status(400).json(err)
    }
}