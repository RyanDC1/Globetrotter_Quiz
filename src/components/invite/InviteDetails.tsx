'use client'

import React from 'react'
import { Challenge } from '@/models/challenge'
import { Button, Card, Flex, Image, Space, Typography } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { appRoutes, MAX_SCORE } from '@/utils/Constants'
import '@/css/home.scss';

interface Props extends Challenge { }

export default function InviteDetails(props: Props) {

    const { challengerName, challengerScore } = props

    const router = useRouter()

    return (
        <Flex align='center' justify='center'>
            <Card
                className='card'
                actions={[
                    <Button
                        block
                        type='primary'
                        icon={<CaretRightOutlined />}
                        onClick={() => {
                            router.push(appRoutes.trivia)
                        }}
                    >
                        Accept Challenge
                    </Button>
                ]}
            >
                <Card.Meta
                    title={
                        <Typography.Title level={3} className='title text-center'>
                            Location Quiz Challenge from {challengerName}
                        </Typography.Title>
                    }
                    description={
                        <Space direction='vertical'>
                            <Image
                                className='image'
                                preview={false}
                                src='/assets/invite-details-image.svg'
                                alt='main-img'
                            />

                            <Typography.Text>
                                {challengerName} scored <b>{challengerScore}/{MAX_SCORE}</b> on the Location Quiz! 
                                Think you can do better? Accept the challenge and prove your geographical prowess!
                            </Typography.Text>
                        </Space>
                    }
                />
            </Card>
        </Flex>
    )
}