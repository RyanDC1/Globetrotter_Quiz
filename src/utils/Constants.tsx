export const appRoutes = {
    root: '/',
    trivia: '/trivia',
    results: '/results',
    invite: '/invites/{id}',
    invite_whatsapp: '/invites/whatsapp/{id}'
}

export const INVITE_URL = process.env.NEXT_PUBLIC_APP_URL + appRoutes.invite
export const WHATSAPP_INVITE_URL = process.env.NEXT_PUBLIC_APP_URL + appRoutes.invite_whatsapp

export const successMessages = [
    "You're absolutely right! Well done!",
    "Boom! You nailed it!",
    "You're a geography master!",
    "That's correct! You're on a roll!",
    "Fantastic! You're unstoppable!"
];

export const failureMessages = [
    "Not quite! Don't worry, try again.",
    "Nice try, but not this time. Keep going!",
    "Hmmm, not the right answer. Maybe the next one will be easier!",
    "Don't give up! You'll get it eventually.",
    "Keep practicing, your geography knowledge is growing!"
];

export const scoreMessages: Record<number, string> = {
    0: "Oh dear, 0 out of 10. Well, everyone starts somewhere! Time to hit the geography books!",
    1: "That's 1 out of 10!  Hey, at least you got one! Onward and upward from here!",
    2: "2 out of 10. Not bad, but there's room for improvement! Keep exploring those maps!",
    3: "3 out of 10. You're getting there! A few more capitals and you'll be a pro.",
    4: "4 out of 10. Not too shabby! You're on your way to becoming a geography guru. ",
    5: "Right in the middle with 5 out of 10! Time to step up your game and aim for the top!",
    6: "6 out of 10. Pretty good! You're getting the hang of this geography thing!",
    7: "7 out of 10. Well done! You're a geography whiz in the making!",
    8: "8 out of 10. Impressive! You really know your cities!",
    9: "So close to perfect! 9 out of 10! One more city and you'd be a geography champion!",
    10: "A perfect 10 out of 10! You are a true geography master!"
};

export const MAX_NUMBER_QUESTIONS = 5
export const MAX_SCORE = 10
export const SCORE_STEP = 2

export const SessionStoreKeys = {
    USER_SCORE: 'USER_SCORE'
}