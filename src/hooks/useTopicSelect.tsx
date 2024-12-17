import { QUADRIMESTER_TITLE } from '@/constant'
import { CITIES } from '@/constant/cities'
import { QUARTER } from '@/constant/quarter'
import { YEAR } from '@/constant/year'
import {
    createContext,
    PropsWithChildren,
    useState,
    useContext,
    useEffect,
} from 'react'
import { useSearchParams } from 'react-router-dom'

export interface ITopicContext {
    topic: string
    setTopic: (topic: string) => void
}

const TopicContext = createContext<ITopicContext>({
    topic: '',
    setTopic: () => {},
})

export const TopicProvider = ({ children }: PropsWithChildren) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [selectedTopic, setSelectedTopic] = useState<string>('')

    useEffect(() => {
        setSelectedTopic(searchParams.get('topic') || '')
    }, [searchParams])
    const setTopic = (topic: string) => {
        searchParams.set('topic', topic)
        searchParams.set('cities', CITIES[0])
        switch (topic) {
            case 'quadrimester_expense':
                searchParams.set('topic', 'quadrimester_expense')
                searchParams.set('years', YEAR[0])
                searchParams.set('quarter', QUARTER[0])
                searchParams.set('शीर्षक', QUADRIMESTER_TITLE[0])
                break
            default:
                searchParams.set('topic', topic)
        }
        setSearchParams(searchParams)
        setSelectedTopic(topic)
    }

    return (
        <TopicContext.Provider value={{ topic: selectedTopic, setTopic }}>
            {children}
        </TopicContext.Provider>
    )
}

const useTopicSelect = () => {
    const context = useContext(TopicContext)
    if (context === undefined) {
        throw new Error('useTopic must be used within a TopicProvider')
    }
    return context
}

export default useTopicSelect
