import { BUDGET_SORT, CHART_OPTIONS, PIE_STATE } from '@/constant'
import { getBudgetExpenseService } from '@/services/charts.service'
import {
    budgetExpenseAreaChart,
    budgetExpenseBarChart,
    budgetExpenseCityTable,
    budgetExpenseHeatMap,
    budgetExpenseLineChart,
    budgetExpensePieChart,
    budgetExpenseStackedChart,
    budgetExpenseTableMonth,
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
import DataGrid from '@/components/DataGrid'

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

    const { data: chartData, isLoading } = useQuery({
        queryKey: [topic, cities, months, उपशीर्षक],
        queryFn: () =>
            getBudgetExpenseService({
                cities,
                months,
                उपशीर्षक,
            }),
    })

    const coreData = chartData && chartData?.data

    const config =
        coreData &&
        (cities.length > 1
            ? budgetExpenseCityTable(coreData.data)
            : budgetExpenseTableMonth(coreData.data))

    const stackedGraphData =
        coreData && budgetExpenseStackedChart(coreData.data, cities)

    const areaGraphData =
        coreData && budgetExpenseAreaChart(coreData.data, months)

    const lineGraphData =
        coreData && budgetExpenseLineChart(coreData.data, months)

    const pieGraph = coreData && budgetExpensePieChart(coreData.data, pieState)

    const heatMap = coreData && budgetExpenseHeatMap(coreData.data)

    const filteredData =
        coreData &&
        coreData.data.filter((item) => item['बजेट उपशीर्षक नाम'] !== '')

    const sortedData = filteredData && budgetSortData(filteredData, sort)

    const structuredData = sortedData && budgetExpenseBarChart(sortedData)

    const displayDataGrid =
        उपशीर्षक.includes('all') && (months.length > 1 || cities.length > 1)

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

    if (isLoading) {
        return <p>Loading...</p>
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
            {!displayDataGrid && (
                <Card
                    title="Basic Charts"
                    styles={{
                        body: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                        },
                    }}
                >
                    <Flex align="center" justify="flex-end" gap={8}>
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
            )}

            {!displayDataGrid && (
                <Row
                    style={{
                        width: '100%',
                    }}
                    gutter={8}
                >
                    <Col xs={24} md={24} lg={14}>
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
                    <Col xs={24} md={24} lg={10}>
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
            )}
            {!displayDataGrid && coreData && उपशीर्षक.includes('all') && (
                <>
                    <WardWiseBudgetChart coreData={coreData.data} />
                    <SectorWiseBudgetChart coreData={coreData.data} />
                </>
            )}
            {displayDataGrid && (
                <Card
                    title={`Comparision by ${months.length > 1 ? 'Months' : 'Cities'}`}
                >
                    <DataGrid config={config || {}} />
                </Card>
            )}
        </Flex>
    )
}

export default BudgetChart
