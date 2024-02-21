import mongoose from "mongoose";

export const connectDb = () => {
    let uri= process.env.DB_URI||"mongodb+srv://Sara_Etinger:9Q087k5EMmO2Rr2P@vacationinginisrael.uustziw.mongodb.net/?retryWrites=true&w=majority"//"mongodb://0.0.0.0:27017/hotel"    
    mongoose.connect(uri)
        .then(suc => {
            console.log("mongoDB connected" + suc.connection.host);
        }).catch(err => {
            console.log("cannot connect mongoDB");
            console.log(err)
            process.exit(1);
        })
}