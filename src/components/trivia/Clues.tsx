import React from 'react'
import { Flex, Typography } from 'antd'
import { Trivia } from '@/models/Trivia'

interface Props {
    clues?: Trivia['clues']
}

export default function Clues({ clues }: Props) {
    return (
        clues?.map((clue, idx) => (
            <Flex
                className='clues'
                key={idx}
                vertical
                align='center'
            >
                <Typography.Title level={3} className='text-center'>
                    {clue}
                </Typography.Title>
            </Flex>
        ))
    )
}