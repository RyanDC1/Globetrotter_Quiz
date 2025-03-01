'use client'

import { SessionStoreKeys } from "../Constants"

export const getUserScoreFromStore = () => {
    let score = sessionStorage.getItem(SessionStoreKeys.USER_SCORE)

    if (score) {
        try {
            return ~~score
        }
        catch (error) {
            return 0
        }
    }

    return 0
}