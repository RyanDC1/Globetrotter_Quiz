import { Challenge } from "@/models/challenge";
import mongoose from "mongoose";

const modelName = 'Challenge'

mongoose.set('strictQuery', true)

interface ChallengeType extends Challenge {
    normalizedName: string
}


const challenge = new mongoose.Schema<ChallengeType>({
    id: {
        type: String
    },
    challengerName: {
        type: String,
        required: true
    },
    challengerScore: {
        type: Number,
        required: true
    },
    normalizedName: {
        type: String,
        required: true
    }
})

challenge.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, prop) => {
        prop.id = prop._id.toString()
        delete prop._id
        delete prop.__v
        return prop
    }
})

export default (mongoose.models?.[modelName] as mongoose.Model<Challenge> || mongoose.model(modelName, challenge))