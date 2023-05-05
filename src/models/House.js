import mongoose from "mongoose";
const houseSchema = new mongoose.Schema({
    address: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: String, required: true },
    contact: { type: String, required: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }

})
export const HouseModel=mongoose.model("house",houseSchema)