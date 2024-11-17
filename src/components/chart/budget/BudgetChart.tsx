import { BUDGET_SORT, CHART_OPTIONS, PIE_STATE } from '@/constant'
import { getBudgetExpenseService } from '@/services/charts.service'
import {
    budgetExpenseAreaChart,
    budgetExpenseBarChart,
    budgetExpenseHeatMap,
    budgetExpenseLineChart,
    budgetExpensePieChart,
    budgetExpenseStackedChart,
} from '@/utils/budgetHighChartConverter'
import { Card, Col, Flex, Row, Select } from 'antd'
import { budgetSortData } from '@/utils/budgetSortData'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { BudgetExpensekeys } from '@/model'
import HighchartsHeatmap from 'highcharts/modules/heatmap'
import exporting from 'highcharts/modules/exporting'
import WardWiseBudgetChart from './WardWiseBudgetChart'
import SectorWiseBudgetChart from './SectorWiseBudgetChart'

HighchartsHeatmap(Highcharts)

exporting(Highcharts)

const BudgetChart = () => {
    const [searchParams] = useSearchParams()

    const [pieState, setPieState] = useState<BudgetExpensekeys>('खर्च')
    const [sort, setSort] = useState()
    const [chart, setChart] = useState('Line')
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

    const heatMap = coreData && budgetExpenseHeatMap(coreData)

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
        if (
            months.length > 1 &&
            !उपशीर्षक.includes('all') &&
            (areaGraphData || lineGraphData)
        ) {
            return (
                <HighchartsReact
                    id="chart"
                    highcharts={Highcharts}
                    immutable={true}
                    options={
                        chart === 'Area'
                            ? areaGraphData || {}
                            : lineGraphData || {}
                    }
                    export
                    style={{ zIndex: '-10 !important' }}
                />
            )
        } else if (
            cities.length > 1 &&
            !उपशीर्षक.includes('all') &&
            stackedGraphData
        ) {
            return (
                <HighchartsReact
                    id="chart"
                    immutable={true}
                    highcharts={Highcharts}
                    options={stackedGraphData || {}}
                    export
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
            />
        )
    }

    return (
        <Flex
            title="Charts"
            style={{
                overflowY: 'auto',
                width: '100%',
                display: 'flex',
                height: '100%',
                maxHeight: '100vh',
                gap: 8,
                flexDirection: 'column',
                marginBottom: 20,
            }}
        >
            <Card title="Basic Charts">
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
                </Flex>
            </Card>

            <Row
                style={{
                    width: '100%',
                }}
                gutter={8}
            >
                <Col span={14}>
                    <Card
                        title="Heat Map"
                        style={{
                            height: '100%',
                        }}
                    >
                        <HighchartsReact
                            id="chart"
                            highcharts={Highcharts}
                            options={heatMap || {}}
                            immutable={true}
                            style={{ width: '70%' }}
                            export
                        />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="Pie Chart">
                        <Flex vertical gap={8}>
                            <h3>Select expense/budget: </h3>
                            <Select
                                value={pieState}
                                onChange={(value) => {
                                    setPieState(value)
                                }}
                                popupClassName="capitalizeWords"
                                rootClassName="capitalizeWords"
                                size="middle"
                                style={{ width: '100%' }}
                                placeholder="Select चालु/पूंजीगत/जम्मा"
                                filterOption={(input, option) =>
                                    (option?.label ?? '')
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={pieOptions}
                            />
                            <HighchartsReact
                                id="chart"
                                highcharts={Highcharts}
                                options={pieGraph || {}}
                                style={{ width: '30%' }}
                                immutable={true}
                                export
                            />
                        </Flex>
                    </Card>
                </Col>
            </Row>
            {coreData && उपशीर्षक.includes('all') && (
                <>
                    <WardWiseBudgetChart coreData={coreData} />
                    <SectorWiseBudgetChart coreData={coreData} />
                </>
            )}
        </Flex>
    )
}

export default BudgetChart
