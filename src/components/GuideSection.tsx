import { Button, Modal, Typography, Space, List } from 'antd'
import { useState } from 'react'
import {
    budgetFilterGuideItems,
    quadrimesterFilterGuideItems,
} from '@/constant/guide'
import { TOPICS } from '@/constant/topics'

const { Paragraph } = Typography

const GuideSection = ({ category }: { category: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                View Filter Guide
            </Button>

            <Modal
                title="Filter Guide"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="close" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
            >
                <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: '100%' }}
                >
                    <List
                        itemLayout="vertical"
                        dataSource={
                            category === TOPICS[0].value
                                ? budgetFilterGuideItems
                                : quadrimesterFilterGuideItems
                        }
                        renderItem={(item) => (
                            <List.Item>
                                {item.title && (
                                    <Typography.Text
                                        strong
                                        style={{
                                            marginRight: '0.5rem',
                                        }}
                                    >
                                        {item.title}
                                    </Typography.Text>
                                )}
                                <Typography.Text>
                                    {item.description}
                                </Typography.Text>
                            </List.Item>
                        )}
                    />
                    <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                        Note: Filter options adjust dynamically based on your
                        selections to prevent overwhelming data views.
                    </Paragraph>
                </Space>
            </Modal>
        </>
    )
}

export default GuideSection
