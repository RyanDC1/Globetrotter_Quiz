'use client'

import React, { useState } from 'react'
import { Button, Form, Input, message as AntMessage, Flex } from 'antd'
import { createChallenge } from '@/actions/challengeActions'
import { CreateChallengeParams } from '@/models/challenge'
import { getUserScoreFromStore } from '@/utils/helpers'

interface Props {
    onCreate: (id: string) => void
}

interface FormValues {
    username: string
}

export default function CreateChallenge(props: Props) {

    const { onCreate } = props

    const [form] = Form.useForm()
    const [message, messageContext] = AntMessage.useMessage()

    const [loading, setLoading] = useState(false)

    return (
        <>
            {messageContext}
            <Form
                form={form}
                colon={false}
                requiredMark
                layout='vertical'
                preserve={false}
            >
                <Form.Item
                    label='Username'
                    name='username'
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please enter a user name'
                        },
                        {
                            min: 5,
                            message: 'user name must be at least 5 characters long'
                        },
                        {
                            pattern: /[a-zA-Z0-9_-]/,
                            message: 'user name can be alphanumeric or can contain "-", "_" only'
                        }
                    ]}
                >
                    <Input
                        placeholder='Enter your username'
                    />
                </Form.Item>

                <Flex justify='end'>
                    <Button
                        type='primary'
                        loading={loading}
                        onClick={validateAndCreate}
                    >
                        Create
                    </Button>
                </Flex>
            </Form>
        </>
    )

    function validateAndCreate() {
        setLoading(true)
        form.validateFields()
            .then((values: FormValues) => {
                generateChallenge({
                    userName: values.username,
                    score: getUserScoreFromStore()
                })
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }

    function generateChallenge(params: CreateChallengeParams) {
        createChallenge(params)
            .then((id) => {
                onCreate(id)
                message.success('Invite link created successfully')
            })
            .catch((error) => {
                console.error(error)
                message.error('Failed to create invite link, please try again')
            })
            .finally(() => {
                setLoading(false)
            })
    }
}