import { SessionStoreKeys } from "../Constants"

export const getUserScoreFromStore = () => {
    try {
        let score = sessionStorage?.getItem(SessionStoreKeys.USER_SCORE)

        if (score) {
            return ~~score
        }
    }
    catch (error) {
        return 0
    }

    return 0
}