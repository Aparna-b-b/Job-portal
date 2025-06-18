import mongoose from "mongoose";

const compsnySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    password: { type: String, required:true},
})

const Company=mongoose.model('Company',compsnySchema)
export default Company