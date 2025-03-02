'use server'

import { Challenge, CreateChallengeParams } from "@/models/challenge";
import challenge from "../../../db/schema/challenge";
import { connectToDB } from "../../../db";

export async function createChallenge(params: CreateChallengeParams) {
    await connectToDB()

    const result = await challenge.findOneAndUpdate(
        {
            normalizedName: params.userName.toUpperCase()
        },
        {
            $set: { 
                challengerScore: params.score,
                challengerName: params.userName,
                normalizedName: params.userName.toUpperCase()
            }
        },
        {
            upsert: true,
            returnOriginal: false
        }
    )

    return result.toJSON().id
}

export async function getChallenge(id: string) : Promise<Challenge> {
    await connectToDB()

    const result = await challenge.findById(id)
    return result?.toJSON() as Challenge
}