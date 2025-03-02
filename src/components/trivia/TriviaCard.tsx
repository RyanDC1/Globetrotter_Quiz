'use client'

import React, { useEffect, useState } from 'react'
import { Card, Flex, message as antMessage, Space, Spin, Typography, Skeleton } from 'antd'
import { TriviaQuestion } from '@/models/Trivia'
import { useRouter } from 'next/navigation'
import { getTriviaQuestion, verifyResponse } from '@/actions/triviaActions/triviaActions'
import { useFeedbackModal } from '@/utils/hooks'
import Clues from './Clues'
import Options from './Options'
import { appRoutes, MAX_NUMBER_QUESTIONS, SCORE_STEP, SessionStoreKeys } from '@/utils/Constants'
import '@/css/trivia.scss'

interface Progress {
    isCompleted: boolean,
    score: number,
    questionNumber: number
}

export default function TriviaCard() {

    const router = useRouter()

    const [message, messageContext] = antMessage.useMessage()

    const [isLoading, setIsLoading] = useState(true)
    const [isVerifying, setIsVerifying] = useState(false)
    const [question, setQuestion] = useState<TriviaQuestion>()
    const [progress, setProgress] = useState<Progress>({
        isCompleted: false,
        questionNumber: 1,
        score: 0
    })

    const [feedback, feedbackContext] = useFeedbackModal({
        completeMessage: progress.questionNumber === MAX_NUMBER_QUESTIONS ? 'Complete' : 'Next',
        onCompleteClick: () => {
            // if questions are complete, redirect user to results page
            if (progress.questionNumber === MAX_NUMBER_QUESTIONS) {
                setProgress((progress) => ({
                    ...progress,
                    isCompleted: true
                }))
                router.push(appRoutes.results)
            }
            else {
                // move to next question
                updateQuestion()
                setProgress((progress) => ({
                    ...progress,
                    questionNumber: progress.questionNumber + 1
                }))
            }
        }
    })

    useEffect(() => {
        router.prefetch(appRoutes.results)

        updateQuestion()
            .catch((error) => {
                console.error(error)
                message.error("An error occurred, redirecting to home...")
                router.push('/')
            })
    }, [])

    useEffect(() => {
        // keep track of the score in session storage
        sessionStorage.setItem(
            SessionStoreKeys.USER_SCORE,
            String(progress.score)
        )
    }, [progress?.score])

    return (
        <Spin spinning={isVerifying}>
            {messageContext}
            {feedbackContext}
            <Flex align='center' justify='center'>
                <Card
                    className='card'
                >
                    <Skeleton
                        active
                        loading={isLoading || progress.isCompleted}
                    >

                        <Card.Meta
                            title={
                                <Typography.Text type='secondary'>
                                    {progress.questionNumber}
                                </Typography.Text>
                            }
                            description={
                                <Space direction='vertical'>
                                    <Clues
                                        clues={question?.clues}
                                    />

                                    <Options
                                        options={question?.options}
                                        disabled={isVerifying}
                                        onClick={async (option, idx) => {
                                            if (isVerifying) {
                                                return
                                            }

                                            document.getElementById(`question-card-${idx}`)?.classList.add('selected')
                                            await verifyAnswer(option)
                                            document.getElementById(`question-card-${idx}`)?.classList.remove('selected')
                                        }}
                                    />
                                </Space>
                            }
                        />
                    </Skeleton>
                </Card>
            </Flex>
        </Spin>
    )

    async function updateQuestion() {
        setIsLoading(true)
        return getTriviaQuestion()
            .then((response) => {
                setQuestion(response)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    async function verifyAnswer(option: string) {
        setIsVerifying(true)
        return verifyResponse(question?.id!, option)
            .then((response) => {
                if (response.isValid) {
                    setProgress((progress) => ({
                        ...progress,
                        score: progress.score + SCORE_STEP
                    }))
                }

                // show response modal
                feedback(response)
            })
            .catch((error) => {
                message.error("An error occurred, please try again")
            })
            .finally(() => {
                setIsVerifying(false)
            })
    }
}