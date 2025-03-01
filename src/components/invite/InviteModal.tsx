'use client'

import { Modal } from 'antd'
import React, { useState } from 'react'
import CreateChallenge from './CreateChallenge'
import InviteLink from './InviteLink'

interface Props {
    open: boolean,
    onClose: () => void
}

export default function InviteModal(props: Props) {

    const { open, onClose } = props

    const [challengeId, setChallengeId] = useState<string>()

    return (
        <Modal
            title={!challengeId ? 'Create Invite Link' : 'Share Invite Link'}
            open={open}
            destroyOnClose
            maskClosable={false}
            onCancel={onClose}
            footer={null}
            centered
        >
            {
                challengeId ?
                <InviteLink 
                    challengeId={challengeId}
                />
                :
                <CreateChallenge 
                    onCreate={(id) => setChallengeId(id)}
                />
            }
        </Modal>
    )
}