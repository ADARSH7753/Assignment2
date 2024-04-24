import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect("mongodb+srv://adarsh10274:root@cluster0.xtimg1p.mongodb.net/", {
        dbName: "hotel"
    })
    .then(() => {
        console.log("Database Connected")
    })
    .catch((error) => {
        console.log(error);
    })
}