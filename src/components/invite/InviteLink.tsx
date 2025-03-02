'use client'

import React, { useMemo } from 'react'
import { Button, Divider, Flex, Input, QRCode, message as AntMessage, Typography, Space } from 'antd'
import { INVITE_URL, WHATSAPP_INVITE_URL } from '@/utils/Constants'
import { CopyOutlined, GlobalOutlined, WhatsAppOutlined } from '@ant-design/icons'

interface Props {
    challengeId: string
}

export default function InviteLink(props: Props) {

    const { challengeId } = props

    const [message, messageContext] = AntMessage.useMessage()

    const inviteLink = useMemo(() => INVITE_URL.replace('{id}', challengeId), [challengeId])

    return (
        <Flex align='center' vertical>
            {messageContext}
            <QRCode
                type='svg'
                value={inviteLink}
                icon="/logo.svg"
            />

            <Divider>
                <Typography.Text type='secondary'>
                    or
                </Typography.Text>
            </Divider>

            <Space direction='vertical' style={{ width: '100%' }}>
                <Input
                    prefix={<GlobalOutlined />}
                    disabled
                    value={inviteLink}
                    suffix={
                        <Button
                            type='link'
                            icon={<CopyOutlined />}
                            onClick={() => {
                                navigator.clipboard.writeText(inviteLink)
                                message.success("Invite link copied successfully")
                            }}
                        />
                    }
                />

                <Input
                    prefix={<WhatsAppOutlined />}
                    disabled
                    value={WHATSAPP_INVITE_URL.replace('{id}', challengeId)}
                    suffix={
                        <Button
                            type='link'
                            icon={<CopyOutlined />}
                            onClick={() => {
                                navigator.clipboard.writeText(WHATSAPP_INVITE_URL.replace('{id}', challengeId))
                                message.success("Invite link copied successfully")
                            }}
                        />
                    }
                />

            </Space>
        </Flex>
    )
}