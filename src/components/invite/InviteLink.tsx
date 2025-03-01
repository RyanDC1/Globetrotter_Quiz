'use client'

import React, { useMemo } from 'react'
import { Button, Divider, Flex, Input, QRCode, message as AntMessage, Typography } from 'antd'
import { INVITE_URL } from '@/utils/Constants'
import { CopyOutlined } from '@ant-design/icons'

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

            <Input
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
        </Flex>
    )
}