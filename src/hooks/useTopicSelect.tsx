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
