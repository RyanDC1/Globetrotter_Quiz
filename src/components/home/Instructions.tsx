'use client'

import React from 'react'
import { Flex, Space, Typography } from 'antd';
import '@/css/home.scss';
import { MAX_NUMBER_QUESTIONS } from '@/utils/Constants';

interface Steps {
    icon: string,
    title: string,
    description: string
}

const steps: Steps[] = [
    {
        icon: '/icons/Question.svg',
        title: `${MAX_NUMBER_QUESTIONS} challenging city questions await.`,
        description: "Get ready to test your knowledge with a diverse range of questions covering various aspects of cities around the world!"
    },
    {
        icon: '/icons/Detective.svg',
        title: "Use your detective skills to solve the clues!",
        description: "Each question provides clues to help you deduce the correct answer. Sharpen your skills and crack the case!"
    },
    {
        icon: '/icons/Check.svg',
        title: "Four Options, One Right Answer - Can You Crack the Code?",
        description: "For each question, you'll be presented with four multiple-choice answers. Carefully consider each option before making your selection."
    },
    {
        icon: '/icons/Feedback.svg',
        title: "Instant Feedback! Track your score in real time",
        description: "See your score immediately after each answer. Track your progress and aim for a perfect score!"
    },
    {
        icon: '/icons/Award.svg',
        title: "Play Solo or Challenge a Friend - Who's the Ultimate City Whiz?",
        description: "Test your city expertise against yourself or challenge a friend for a fun and competitive game.  Who will claim the title of Ultimate City Whiz?"
    }
];


export default function Instructions() {
    return (
        <Space direction='vertical'>
            {
                steps.map((step, idx) => (
                    <Flex
                        key={idx}
                        vertical
                    >
                        <Space>
                            <img className='icon' src={step.icon} alt='icon' />
                            <Typography.Text>
                                {step.title}
                            </Typography.Text>
                        </Space>
                        <Typography.Text type='secondary'>
                            {step.description}
                        </Typography.Text>
                    </Flex>
                ))
            }
        </Space>
    )
}