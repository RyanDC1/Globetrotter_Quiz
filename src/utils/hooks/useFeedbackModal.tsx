'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Flex, Modal, Space, Typography } from 'antd'
import ReactConfetti from 'react-confetti'
import { TriviaResponse } from '@/models/Trivia'
import { CheckCircleFilled, FrownFilled } from '@ant-design/icons'
import { failureMessages, successMessages } from '../Constants'

const getRandomIndex = (max: number) => {
    return Math.floor(Math.random() * max)
}

const getRandomFact = (facts: TriviaResponse['facts']) => {
    // calculate a random index
    const factIndex = getRandomIndex(facts.length)
    return facts[factIndex]
}

const getSuccessMessage = () => {
    const messageIndex = getRandomIndex(successMessages.length)
    return successMessages[messageIndex]
}

const getFailMessage = () => {
    const messageIndex = getRandomIndex(failureMessages.length)
    return failureMessages[messageIndex]
}

interface Props {
    onCompleteClick: () => void,
    completeMessage: string
}

export default function useFeedbackModal({ onCompleteClick, completeMessage }: Props): [React.Dispatch<React.SetStateAction<TriviaResponse | undefined>>, React.JSX.Element] {

    const [feedback, setFeedBack] = useState<TriviaResponse | undefined>()
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        if (feedback?.isValid) {
            setShowConfetti(true)
        }
    }, [feedback?.isValid])


    const ModalContext = useMemo(() => (
        <>
            <Modal
                open={feedback != null}
                footer={null}
                closable={false}
                maskClosable={false}
                destroyOnClose
                rootClassName='feedback-modal'
            >
                {
                    feedback &&
                    <Flex align='center' justify='center'>
                        {
                            <Space direction='vertical'>
                                <Typography.Title level={4} className='feedback-title text-center'>
                                    {
                                        feedback?.isValid ?
                                            getSuccessMessage()
                                            :
                                            getFailMessage()
                                    }
                                </Typography.Title>

                                <Flex justify='center'>
                                    {
                                        feedback?.isValid ?
                                            <CheckCircleFilled style={{ color: '#52c41a', fontSize: 64 }} />
                                            :
                                            <FrownFilled style={{ color: '#ffd54f', fontSize: 64 }} />
                                    }
                                </Flex>

                                {
                                    feedback?.facts?.length > 0 &&
                                    <Alert
                                        className='trivia-fact'
                                        type='info'
                                        showIcon
                                        closable={false}
                                        message={`Here's a fun fact about ${feedback?.correctOption}`}
                                        description={
                                            <Typography.Text type='secondary'>
                                                {getRandomFact(feedback?.facts)}
                                            </Typography.Text>
                                        }
                                    />
                                }

                                {
                                    !feedback?.isValid &&
                                    <>
                                        <Typography.Text type='secondary'>
                                            The correct answer is: {feedback.correctOption}
                                        </Typography.Text>
                                        <Typography.Text type='secondary'>
                                            Your answer was: {feedback.selectedOption}
                                        </Typography.Text>
                                    </>
                                }

                                <Button
                                    type='primary'
                                    className='action-btn'
                                    block
                                    onClick={() => {
                                        setShowConfetti(false)
                                        onCompleteClick()
                                        setFeedBack(undefined)
                                    }}
                                >
                                    {completeMessage}
                                </Button>
                            </Space>
                        }
                    </Flex>
                }
            </Modal>
            {
                showConfetti &&
                <ReactConfetti
                    gravity={0.2}
                    style={{ zIndex: 2000 }}
                    height={document.body.clientHeight - 80}
                    initialVelocityX={5}
                    initialVelocityY={5}
                    numberOfPieces={2600}
                    opacity={1}
                    recycle={false}
                    run={feedback?.isValid ?? false}
                    width={document.body.clientWidth - 20}
                    wind={0}
                />
            }
        </>
    ), [feedback?.correctOption, showConfetti])

    return [
        setFeedBack,
        ModalContext
    ]
}