import ChartSection from '@/components/ChartSection'
import FilterSection from '@/components/FilterSection'
import { Flex } from 'antd'
import { Link } from 'react-router-dom'

export const UserPage = () => {
    return (
        <Flex vertical>
            <Flex gap={8}>
                <FilterSection />
                <ChartSection />
            </Flex>
            <Link to={'/home'}>Navigate to Dashboard</Link>
        </Flex>
    )
}
