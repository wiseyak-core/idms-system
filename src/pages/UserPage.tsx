import ChartSection from '@/components/ChartSection'
import { TOPICS } from '@/constant/topics'
import { Flex } from 'antd'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CITIES } from '@/constant/cities'
import FilterSection from '@/components/filter/FilterSection'
import { TopicProvider } from '@/hooks/useTopicSelect'
import { MONTHS, SUBTITLE } from '@/constant'

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
                months: MONTHS[0],
                उपशीर्षक: SUBTITLE[0],
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
