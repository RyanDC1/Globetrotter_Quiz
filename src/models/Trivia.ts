export interface Trivia {
    id?: string,
    city: string,
    country: string,
    options: string[],
    clues: string[],
    facts: string[],
    trivia: string[]
}

export type TriviaQuestion = Pick<Trivia, 'id' | 'options' | 'clues'>

export interface TriviaResponse {
    isValid: boolean,
    correctOption: string,
    selectedOption: string,
    trivia: string[],
    facts: string[]
}