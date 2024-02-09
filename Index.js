import express from "express";
import cors from "cors";
import { connectDb } from "./DB/connectDb.js";
import toastRouter from "./routes/Toast.js";
import userRouter from "./routes/User.js";
import orderRouter from "./routes/Order.js";
import {config} from "dotenv";
import { erroeHandling } from "./middleWares/errorHandling.js";

const app = express();

config();

app.use(express.json());
app.use(cors())

connectDb();

app.use("/api/Toast", toastRouter)
app.use("/api/User", userRouter)
app.use("/api/Order", orderRouter)


app.use(erroeHandling)

let port=process.env.PORT||3500
app.listen(port,  ()=> {
    console.log("app is listening on "+ port)
});
