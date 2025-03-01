'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, Flex, Image, Space, Typography } from 'antd'
import { RedoOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { appRoutes, MAX_SCORE, scoreMessages } from '@/utils/Constants'
import { useRouter } from 'next/navigation'
import { getUserScoreFromStore } from '@/utils/helpers'
import { InviteModal } from '../invite'
import '@/css/result.scss'

export default function Result() {

    const router = useRouter()

    const [showInviteModal, setShowInviteModal] = useState(false)

    const score = useMemo(() => {
        return getUserScoreFromStore()
    }, [])

    useEffect(() => {
        router.prefetch(appRoutes.trivia)
    }, [])

    return (
        <Flex align='center' justify='center'>
            <Card
                className='card'
                actions={[
                    <Button
                        block
                        type='primary'
                        icon={<RedoOutlined />}
                        onClick={() => {
                            router.push(appRoutes.trivia)
                        }}
                    >
                        Re-Take Quiz ?
                    </Button>,
                    <Button
                        block
                        variant='outlined'
                        color='primary'
                        icon={<UsergroupAddOutlined />}
                        onClick={() => {
                            setShowInviteModal(true)
                        }}
                    >
                        Challenge a friend
                    </Button>,
                ]}
            >
                <Card.Meta
                    title={
                        <Typography.Title level={3}>
                            Score
                        </Typography.Title>
                    }
                    description={
                        <Space direction='vertical'>
                            <Image
                                className='image'
                                preview={false}
                                src='/assets/complete-image.svg'
                                alt='complete-img'
                            />

                            <Typography.Title level={4}>
                                {score} / {MAX_SCORE}
                            </Typography.Title>

                            <Typography.Text type='secondary'>
                                {scoreMessages[score]}
                            </Typography.Text>
                        </Space>
                    }
                />
            </Card>

            <InviteModal
                open={showInviteModal}
                onClose={() => {
                    setShowInviteModal(false)
                }}
            />
        </Flex>
    )
}