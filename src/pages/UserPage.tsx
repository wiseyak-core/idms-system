import ChartSection from '@/components/ChartSection'
import { TOPICS } from '@/constant/topics'
import { Col, Row } from 'antd'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CITIES } from '@/constant/cities'
import FilterSection from '@/components/filter/FilterSection'
import { TopicProvider } from '@/hooks/useTopicSelect'
import { MONTHS } from '@/constant'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import BudgetFilterDrawer from '@/components/chart/budget/BudgetFilterDrawer'

export const UserPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const topic = searchParams.get('topic') || ''
    const city = searchParams.get('city') || ''

    const matches = useMediaQuery('(min-width: 1024px)')

    useEffect(() => {
        if (topic.length === 0 && city.length === 0) {
            setSearchParams({
                ...searchParams,
                topic: TOPICS[0],
                cities: CITIES[0],
                months: MONTHS[0],
                उपशीर्षक: 'all',
            })
        }
    }, [])

    return (
        <TopicProvider>
            <Row
                gutter={8}
                style={{
                    width: '100%',
                    padding: '1rem',
                    maxHeight: '100vh',
                    alignItems: 'start',
                    overflow: 'hidden',
                }}
            >
                {matches ? (
                    <Col xs={24} sm={24} md={24} lg={5}>
                        <FilterSection />
                    </Col>
                ) : (
                    <Col
                        span={24}
                        style={{
                            marginBottom: '1rem',
                        }}
                    >
                        <BudgetFilterDrawer />
                    </Col>
                )}
                <Col xs={24} sm={24} md={24} lg={19}>
                    <ChartSection />
                </Col>
            </Row>
        </TopicProvider>
    )
}
