import ChartSection from '@/components/ChartSection'
import FilterSection from '@/components/FilterSection'
import { TOPICS } from '@/constant/topics'
import { getQuadrimesterExpenseService } from '@/services/charts.service'
import { Flex } from 'antd'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { CITIES } from '@/constant/cities'
import { CHART_TYPE } from '@/constant/chartType'
import { YEAR } from '@/constant/year'
import { QUARTER } from '@/constant/quarter'

export const UserPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const topics = searchParams.get('topics') || ''
    const cities = searchParams.get('cities') || ''
    const year = searchParams.get('year') || ''
    const title = searchParams.get('title') || ''
    const chartType = searchParams.get('chart_type') || ''
    const quarter = searchParams.get('quarter') || ''

    const { data } = useQuery({
        queryKey: [topics, cities, year, title, chartType, quarter],
        queryFn: () =>
            getQuadrimesterExpenseService({
                cities,
                year,
                title,
                chart_type: chartType,
                quarter,
            }),
        enabled: topics.length > 0 && cities.length > 0,
    })
    useEffect(() => {
        if (topics.length === 0 && cities.length === 0) {
            setSearchParams({
                ...searchParams,
                topics: TOPICS[0],
                cities: CITIES[0],
                chartType: CHART_TYPE[0],
                year: YEAR[0],
                quarter: QUARTER[0],
                title: 'budget-expense',
            })
        }
    }, [])
    const chartData = data?.data

    return (
        <Flex vertical>
            <Flex gap={8}>
                <FilterSection />
                {chartData && chartData.data?.length > 0 && (
                    <ChartSection chartData={chartData} />
                )}
            </Flex>
            <Link to={'/home'}>Navigate to Dashboard</Link>
        </Flex>
    )
}
