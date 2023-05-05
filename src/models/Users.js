import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedHouses :[{type: mongoose.Schema.Types.ObjectId,ref:"house"}]
})
export const UserModel=mongoose.model("users",userSchema)


