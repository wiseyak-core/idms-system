import { QUADRIMESTER_SORT } from '@/constant'
import { getQuadrimesterExpenseService } from '@/services/charts.service'
import { quadrimesterExpenseBarChart } from '@/utils/quadrimesterHighChartConverter'
import { quadrimesterSortData } from '@/utils/quadrimesterSortData'
import { Card, Flex, Select } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

const QuadrimesterChart = () => {
    const [searchParams] = useSearchParams()

    const [sort, setSort] = useState()
    const quarter = searchParams.getAll('quarter') || ''
    const years = searchParams.getAll('years') || ''
    const cities = searchParams.getAll('cities') || ''
    const topic = searchParams.getAll('topic') || ''
    const शीर्षक = searchParams.getAll('शीर्षक') || ''

    const { data: chartData } = useQuery({
        queryKey: [topic, cities, years, quarter, शीर्षक],
        queryFn: () =>
            getQuadrimesterExpenseService({
                cities,
                years,
                शीर्षक,
                quarter,
            }),
    })

    const coreData = chartData && chartData.data

    console.log(coreData)
    const filteredData =
        coreData && coreData.filter((item: any) => item['शीर्षक'] !== '')

    const sortedData =
        filteredData && quadrimesterSortData(filteredData, sort, quarter)

    const structuredData =
        sortedData && quadrimesterExpenseBarChart(sortedData, quarter)

    const sortOptions = QUADRIMESTER_SORT.map((item) => ({
        value: item,
        label: item,
    }))

    return (
        <Card
            title="Charts"
            style={{
                flexGrow: 1,
                width: '100%',
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
            }}
        >
            <Flex
                align="center"
                justify="flex-start"
                style={{
                    marginBottom: 20,
                }}
            >
                <Flex vertical>
                    <h3>Select Sort:</h3>
                    <Select
                        value={sort}
                        onChange={(value) => {
                            setSort(value)
                        }}
                        popupClassName="capitalizeWords"
                        rootClassName="capitalizeWords"
                        size="middle"
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select sort"
                        filterOption={(input, option) =>
                            (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={sortOptions}
                    />
                </Flex>
            </Flex>
            <HighchartsReact
                id="chart"
                highcharts={Highcharts}
                options={structuredData || {}}
                export
            />
        </Card>
    )
}

export default QuadrimesterChart
