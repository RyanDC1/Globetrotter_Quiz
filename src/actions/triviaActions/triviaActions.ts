'use server'

import { TriviaResponse } from "@/models/Trivia"
import { getById, getRandomTriviaQuestion } from "./internalActions"

export async function getTriviaQuestion() {
    return getRandomTriviaQuestion()
}

export async function verifyResponse(questionId: string, option: string): Promise<TriviaResponse> {
    const result = await getById(questionId)

    const isValid = result?.city.trim().toLowerCase() == option.trim().toLowerCase()
    
    return {
        isValid,
        correctOption: result.city,
        selectedOption: option,
        facts: result.facts,
        trivia: result.trivia
    }
}