import { Card, Typography } from 'antd'

const { Paragraph } = Typography

const GuideSection = () => {
    return (
        <Card
            title="Filter Guide"
            style={{ width: '100%' }}
            styles={{
                body: {
                    maxHeight: '200px',
                    overflowY: 'auto',
                },
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <ul
                    style={{
                        paddingLeft: '20px',
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}
                >
                    <li>
                        <strong>Districts:</strong> Select multiple districts
                        (max 1 if other filters have multiple selections)
                    </li>
                    <li>
                        <strong>Categories:</strong> Choose a single category
                        from available options
                    </li>
                    <li>
                        <strong>Months:</strong> Pick multiple months (limited
                        to 1 if districts or subtitles have multiple selections)
                    </li>
                    <li>
                        <strong>Subtitles (उपशीर्षक):</strong> Select specific
                        subtitles or check "All"
                    </li>
                    <li>
                        Some selections may be disabled to maintain data clarity
                    </li>
                </ul>
                <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                    Note: Filter options adjust dynamically based on your
                    selections to prevent overwhelming data views.
                </Paragraph>
            </div>
        </Card>
    )
}

export default GuideSection
