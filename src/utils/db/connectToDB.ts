import mongoose from "mongoose"


export const connectToDB = async () => {
    mongoose.connect(process.env.DB_URI!).then(() => {
        console.log("Database connected.......!");
    }).catch(console.log);
}