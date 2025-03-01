import React from 'react'
import { Card, Col, Row } from 'antd'
import { Trivia } from '@/models/Trivia'

interface Props {
    options?: Trivia['options'],
    disabled: boolean,
    onClick: (option: string, id: number) => void
}

export default function Options(props: Props) {

    const { options, onClick, disabled } = props

    return (
        <Row gutter={[8, 8]} className='questions'>
            {
                options?.map((option, idx) => (
                    <Col className='question' key={idx} lg={12}>
                        <Card
                            id={`question-card-${idx}`}
                            className='question-card'
                            hoverable
                            onClick={() => !disabled && onClick(option, idx)}
                        >
                            {option}
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}