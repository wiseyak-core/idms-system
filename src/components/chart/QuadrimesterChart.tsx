import { BUDGET_SORT } from '@/constant'
import { getQuadrimesterExpenseService } from '@/services/charts.service'
import {
    quadrimesterExpenseAreaChart,
    quadrimesterExpenseBarChart,
    quadrimesterExpensePieChart,
} from '@/utils/quadrimesterHighChartConverter'
import { quadrimesterSortData } from '@/utils/quadrimesterSortData'
import { Card, Flex, Select } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

const QuadrimesterChart = () => {
    const [searchParams] = useSearchParams()

    const chart = 'Area'

    const [sort, setSort] = useState()
    const quarter = searchParams.getAll('quarter') || ''
    const years = searchParams.getAll('years') || ''
    const cities = searchParams.getAll('cities') || ''
    const शीर्षक = searchParams.getAll('शीर्षक') || ''

    const { data: chartData, isLoading } = useQuery({
        queryKey: [cities, years, quarter, शीर्षक],
        queryFn: () =>
            getQuadrimesterExpenseService({
                cities,
                years,
                शीर्षक,
                quarter,
            }),
    })

    const coreData = chartData && chartData.data

    const filteredData =
        coreData && coreData.filter((item: any) => item['शीर्षक'] !== '')

    const pieData = filteredData && quadrimesterExpensePieChart(filteredData)

    const areaGraphData =
        filteredData &&
        quadrimesterExpenseAreaChart(filteredData, years, quarter)

    const sortedData = filteredData && quadrimesterSortData(filteredData, sort)

    const structuredData = sortedData && quadrimesterExpenseBarChart(sortedData)

    const sortOptions = BUDGET_SORT.map((item) => ({
        value: item,
        label: item,
    }))

    const multipleGraphRender = (years: string[], cities: string[]) => {
        if (years.length > 1 && !शीर्षक.includes('all')) {
            return (
                <HighchartsReact
                    id="chart"
                    highcharts={Highcharts}
                    options={
                        chart === 'Area' ? areaGraphData || {} : {}
                        // : lineGraphData || {}
                    }
                    immutable={true}
                    export
                    style={{ zIndex: '-10 !important' }}
                />
            )
        } else if (cities.length > 1 && !शीर्षक.includes('all')) {
            return (
                <HighchartsReact
                    id="chart"
                    highcharts={Highcharts}
                    // options={stackedGraphData || {}}
                    options={{}}
                    immutable={true}
                    export
                    style={{ zIndex: '-10 !important' }}
                />
            )
        }
        return (
            <HighchartsReact
                id="chart"
                highcharts={Highcharts}
                immutable={true}
                options={structuredData || {}}
                export
                style={{ zIndex: '-10 !important' }}
            />
        )
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <Card
            title="Charts"
            style={{
                overflowY: 'auto',
                width: '100%',
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
            }}
            styles={{
                body: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    maxHeight: '100vh',
                    overflowY: 'auto',
                },
                header: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    zIndex: '50',
                },
            }}
        >
            <Flex align="center" justify="space-between">
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
            <Flex vertical>
                {multipleGraphRender(years, cities)}
                <HighchartsReact
                    id="chart"
                    highcharts={Highcharts}
                    immutable={true}
                    options={pieData || {}}
                    export
                />
            </Flex>
        </Card>
    )
}

export default QuadrimesterChart
