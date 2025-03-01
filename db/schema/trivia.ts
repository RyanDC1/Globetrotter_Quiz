import { Trivia } from "@/models/Trivia";
import mongoose from "mongoose";

const modelName = 'Trivia'

mongoose.set('strictQuery', true)


const trivia = new mongoose.Schema<Trivia>({
    id: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    clues: {
        type: [String],
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    facts: {
        type: [String],
        required: true
    },
    trivia: {
        type: [String],
        required: true
    }
})

trivia.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, prop) => {
        prop.id = prop._id.toString()
        delete prop._id
        delete prop.__v
        return prop
    }
})

export default (mongoose.models?.[modelName] as mongoose.Model<Trivia> || mongoose.model(modelName, trivia))