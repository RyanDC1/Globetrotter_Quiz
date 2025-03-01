'use client'

import React, { useEffect } from 'react'
import { Button, Card, Flex, Image, Space, Typography } from 'antd';
import '@/css/home.scss';
import Instructions from './Instructions';
import { CaretRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/utils/Constants';

export default function HomePage() {

    const router = useRouter()

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
                        icon={<CaretRightOutlined />}
                        onClick={() => {
                            router.push(appRoutes.trivia)
                        }}
                    >
                        Start
                    </Button>
                ]}
            >
                <Card.Meta
                    title={
                        <Typography.Title level={3} className='title text-center'>
                            How Well Do You Know Your Cities?
                        </Typography.Title>
                    }
                    description={
                        <Space direction='vertical'>
                            <Image
                                className='image'
                                preview={false}
                                src='/assets/home-image.svg'
                                alt='main-img'
                            />

                            <Instructions />
                        </Space>
                    }
                />
            </Card>
        </Flex>
    )
}