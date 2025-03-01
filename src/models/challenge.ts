export interface Challenge {
    id: string,
    challengerName: string,
    challengerScore: number
}

export interface CreateChallengeParams {
    userName: string,
    score: number
}