'use client'

import React from 'react'
import { Flex, Layout, Space, Typography } from 'antd'
import Image from 'next/image'

const { Header, Content } = Layout

interface Props {
    children: React.ReactNode
}

export default function MainLayout({ children } : Props) {
  return (
    <Layout className='main-layout'>
        <Header>
            <Flex gap={4} align='center'>
                <Image
                    src={'/logo.svg'}
                    alt='logo'
                    width={40}
                    height={40}
                />
                <Space 
                    align='baseline'
                    className='title'
                >
                    <Typography.Title 
                        className='main-title'
                    >
                        Globetrotter
                    </Typography.Title>
                    <Typography.Text 
                        type='secondary'
                        className='description'
                    >
                        Trivia Around the World!
                    </Typography.Text>
                </Space>
            </Flex>
        </Header>
        <Content>
            {children}
        </Content>
    </Layout>
  )
}