import { Button, Modal, Typography, Space, List } from 'antd'
import { useState } from 'react'

const { Paragraph } = Typography

const GuideSection = () => {
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

    const guideItems = [
        {
            key: 'districts',
            title: 'Districts :',
            description:
                'Select multiple districts (max 1 if other filters have multiple selections)',
        },
        {
            key: 'categories',
            title: 'Categories :',
            description: 'Choose a single category from available options',
        },
        {
            key: 'months',
            title: 'Months :',
            description:
                'Pick multiple months (limited to 1 if districts or subtitles have multiple selections)',
        },
        {
            key: 'subtitles',
            title: 'Subtitles (उपशीर्षक) :',
            description: 'Select specific subtitles or check "All"',
        },
        {
            key: 'note',
            title: '',
            description:
                'Some selections may be disabled to maintain data clarity',
        },
    ]

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
                        dataSource={guideItems}
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
