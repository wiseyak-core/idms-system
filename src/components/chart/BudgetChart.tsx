import { BUDGET_SORT, CHART_OPTIONS, PIE_STATE } from '@/constant'
import { getBudgetExpenseService } from '@/services/charts.service'
import {
    budgetExpenseAreaChart,
    budgetExpenseBarChart,
    budgetExpenseLineChart,
    budgetExpensePieChart,
    budgetExpenseStackedChart,
} from '@/utils/budgetHighChartConverter'
import { Card, Divider, Flex, Select } from 'antd'
import { budgetSortData } from '@/utils/budgetSortData'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { BudgetExpensekeys } from '@/model'
import exporting from 'highcharts/modules/exporting'

exporting(Highcharts)

const BudgetChart = () => {
    const [searchParams] = useSearchParams()

    const [pieState, setPieState] = useState<BudgetExpensekeys>('खर्च')
    const [sort, setSort] = useState()
    const [chart, setChart] = useState('Area')
    const months = searchParams.getAll('months') || ''
    const cities = searchParams.getAll('cities') || ''
    const topic = searchParams.get('topic') || ''
    const उपशीर्षक = searchParams.getAll('उपशीर्षक') || ''

    const { data: chartData } = useQuery({
        queryKey: [topic, cities, months, उपशीर्षक],
        queryFn: () =>
            getBudgetExpenseService({
                cities,
                months,
                उपशीर्षक,
            }),
    })

    const coreData = chartData && chartData.data

    const stackedGraphData =
        coreData && budgetExpenseStackedChart(coreData, cities)

    const areaGraphData = coreData && budgetExpenseAreaChart(coreData, months)

    const lineGraphData = coreData && budgetExpenseLineChart(coreData, months)

    const pieGraph = coreData && budgetExpensePieChart(coreData, pieState)

    const filteredData =
        coreData && coreData.filter((item) => item['बजेट उपशीर्षक नाम'] !== '')

    const sortedData = filteredData && budgetSortData(filteredData, sort)

    const structuredData = sortedData && budgetExpenseBarChart(sortedData)

    const chartOptions = CHART_OPTIONS.map((item) => ({
        value: item,
        label: item,
    }))

    const sortOptions = BUDGET_SORT.map((item) => ({
        value: item,
        label: item,
    }))

    const pieOptions = PIE_STATE.map((item) => ({
        value: item,
        label: item,
    }))

    const multipleGraphRender = (months: string[], cities: string[]) => {
        if (months.length > 1 && !उपशीर्षक.includes('all')) {
            return (
                <HighchartsReact
                    id="chart"
                    highcharts={Highcharts}
                    options={
                        chart === 'Area'
                            ? areaGraphData || {}
                            : lineGraphData || {}
                    }
                    export
                    style={{ zIndex: '-10 !important' }}
                />
            )
        } else if (cities.length > 1 && !उपशीर्षक.includes('all')) {
            return (
                <HighchartsReact
                    id="chart"
                    highcharts={Highcharts}
                    options={stackedGraphData || {}}
                    export
                    style={{ zIndex: '-10 !important' }}
                />
            )
        }
        return (
            <HighchartsReact
                id="chart"
                highcharts={Highcharts}
                options={structuredData || {}}
                export
                style={{ zIndex: '-10 !important' }}
            />
        )
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
                {months.length <= 1 && cities.length <= 1 && (
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
                )}
                {months.length > 1 && (
                    <Flex vertical>
                        <h3>Select Chart Type:</h3>
                        <Select
                            value={chart}
                            onChange={(value) => {
                                setChart(value)
                            }}
                            popupClassName="capitalizeWords"
                            rootClassName="capitalizeWords"
                            size="middle"
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select chart"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={chartOptions}
                        />
                    </Flex>
                )}
            </Flex>
            <Flex
                vertical
                gap={20}
                style={{
                    height: '100%',
                    width: '100%',
                    paddingBottom: 20,
                }}
            >
                {multipleGraphRender(months, cities)}

                <Divider />
                <Flex vertical>
                    <Flex vertical>
                        <h3>Select expense/budget: </h3>
                        <Select
                            value={pieState}
                            onChange={(value) => {
                                setPieState(value)
                            }}
                            popupClassName="capitalizeWords"
                            rootClassName="capitalizeWords"
                            size="middle"
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select चालु/पूंजीगत/जम्मा"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={pieOptions}
                        />
                    </Flex>
                    <HighchartsReact
                        id="chart"
                        highcharts={Highcharts}
                        options={pieGraph || {}}
                        export
                    />
                </Flex>
            </Flex>
        </Card>
    )
}

export default BudgetChart
