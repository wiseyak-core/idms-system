import ChartSection from '@/components/ChartSection'
import { TOPICS } from '@/constant/topics'
import { Flex } from 'antd'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CITIES } from '@/constant/cities'
import { YEAR } from '@/constant/year'
import { QUARTER } from '@/constant/quarter'
import FilterSection from '@/components/filter/FilterSection'
import { TopicProvider } from '@/hooks/useTopicSelect'
import { QUADRIMESTER_TITLE } from '@/constant'

export const UserPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const topic = searchParams.get('topic') || ''
    const city = searchParams.get('city') || ''

    useEffect(() => {
        if (topic.length === 0 && city.length === 0) {
            setSearchParams({
                ...searchParams,
                topic: TOPICS[0],
                cities: CITIES[0],
                years: YEAR[0],
                quarter: QUARTER[0],
                शीर्षक: QUADRIMESTER_TITLE[0],
            })
        }
    }, [])

    return (
        <TopicProvider>
            <Flex
                gap={8}
                style={{
                    width: '100%',
                    padding: '1rem',
                    maxHeight: '100vh',
                    alignItems: 'start',
                    overflow: 'hidden',
                }}
            >
                <FilterSection />
                <ChartSection />
            </Flex>
        </TopicProvider>
    )
}
