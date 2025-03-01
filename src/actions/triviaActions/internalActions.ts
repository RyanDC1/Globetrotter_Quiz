import { Trivia, TriviaQuestion } from "@/models/Trivia";
import { connectToDB } from "../../../db";
import { trivia } from "../../../db/schema";

export async function seedData(data: Trivia[]) {
    await connectToDB()
    const count = await trivia.countDocuments()

    if(count == 0) {
        await trivia.insertMany(data)
    }
}

export async function getRandomTriviaQuestion(): Promise<TriviaQuestion> {
    await connectToDB()

    const result: Trivia[] = await trivia.aggregate([
        {
            $sample: { size: 1 }
        },
        {
            $addFields: {
                id: { $toString: "$_id" }
            }
        },
        {
            $project: {
                _id: 0,
                id: 1,
                city: 1,
                country: 1,
                clues: 1,
                options: 1,
                facts: 1,
                trivia: 1
            }
        }
    ])

    if(result.length == 0) {
        throw Error('No records present in DB')
    }

    return {
        id: result[0].id,
        clues: result[0].clues,
        options: result[0].options
    }
}

export async function getById(id: string) {
    await connectToDB()
    const result = await trivia.findById(id)

    return result?.toJSON() as Trivia
}