import { BUDGET_SORT } from '@/constant'
import { getQuadrimesterExpenseService } from '@/services/charts.service'
import {
    quadrimesterBudgetExpenseChartMultipleCity,
    quadrimesterExpenseAreaChart,
    quadrimesterExpenseBarChart,
    quadrimesterExpenseCityTable,
    quadrimesterExpenseLineChart,
    quadrimesterExpensePieChart,
    quadrimesterExpenseQuarterlyTable,
    quadrimesterYearTable,
    quarterlyBudgetAnalysis,
} from '@/utils/quadrimesterHighChartConverter'
import { quadrimesterSortData } from '@/utils/quadrimesterSortData'
import { Card, Flex, Select } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import DataGrid from '@/components/DataGrid'
import useActiveFilters from '@/hooks/useActiveFilter'
import HC_exporting from 'highcharts/modules/exporting'
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting'

HC_exporting(Highcharts)
HighchartsOfflineExporting(Highcharts)

const QuadrimesterChart = () => {
    const [searchParams] = useSearchParams()
    const { setActiveFilters } = useActiveFilters()
    const [analysisType, setAnalysisType] = useState('budget')
    const [chartType, setChartType] = useState('Area')

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

    useEffect(() => {
        if (chartData) {
            console.log(chartData)
            setActiveFilters(chartData.data.filterOptions.year)
        }
    }, [chartData])

    const displayDataGrid =
        शीर्षक.includes('all') &&
        (years.length > 1 || cities.length > 1 || quarter.length > 1)

    const coreData = chartData && chartData.data.data

    const config = () => {
        if (coreData) {
            if (quarter.length > 1) {
                return quadrimesterExpenseQuarterlyTable(coreData, quarter)
            } else if (cities.length > 1) {
                return quadrimesterExpenseCityTable(coreData, cities)
            } else {
                return quadrimesterYearTable(coreData, years)
            }
        }
    }

    const multipleCitiesGraph =
        coreData && quadrimesterBudgetExpenseChartMultipleCity(coreData, cities)

    const sectorWiseData =
        coreData && quarterlyBudgetAnalysis(coreData, quarter[0], analysisType)

    const filteredData =
        coreData && coreData?.filter((item: any) => item['शीर्षक'] !== '')

    const pieData = filteredData && quadrimesterExpensePieChart(filteredData)

    const areaGraphData =
        filteredData &&
        quadrimesterExpenseAreaChart(filteredData, years, quarter)

    const lineGraphData =
        filteredData &&
        quadrimesterExpenseLineChart(filteredData, years, quarter)

    const sortedData = filteredData && quadrimesterSortData(filteredData, sort)

    const structuredData = sortedData && quadrimesterExpenseBarChart(sortedData)

    const sortOptions = BUDGET_SORT.map((item) => ({
        value: item,
        label: item,
    }))

    const analysisOptions = [
        { value: 'budget', label: 'Budget Analysis' },
        { value: 'expense', label: 'Expense Analysis' },
    ]

    const chartTypeOptions = [
        { value: 'Area', label: 'Area Chart' },
        { value: 'Line', label: 'Line Chart' },
    ]

    const multipleGraphRender = (years: string[], cities: string[]) => {
        if (
            (years.length > 1 || quarter.length > 1) &&
            !शीर्षक.includes('all')
        ) {
            return (
                <HighchartsReact
                    id="chart"
                    highcharts={Highcharts}
                    options={
                        chartType === 'Area'
                            ? areaGraphData || {}
                            : lineGraphData || {}
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
                    options={multipleCitiesGraph || {}}
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
        <Flex
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
                        {years.length <= 1 && quarter.length <= 1 && (
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
                        {(years.length > 1 || quarter.length > 1) && (
                            <Flex vertical>
                                <h3>Select Chart Type:</h3>
                                <Select
                                    value={chartType}
                                    onChange={(value) => {
                                        setChartType(value)
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
                                    options={chartTypeOptions}
                                />
                            </Flex>
                        )}
                    </Flex>
                    <Flex vertical>{multipleGraphRender(years, cities)}</Flex>
                </Card>
            )}
            {!displayDataGrid && (
                <Card
                    title="Pie Charts"
                    styles={{
                        body: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                        },
                    }}
                >
                    <HighchartsReact
                        id="chart"
                        highcharts={Highcharts}
                        immutable={true}
                        options={pieData || {}}
                        export
                    />
                </Card>
            )}
            {!displayDataGrid && शीर्षक[0] === 'all' && (
                <Card
                    title="Sector Wise Charts"
                    extra={
                        <Select
                            value={analysisType}
                            onChange={(value) => setAnalysisType(value)}
                            options={analysisOptions}
                            style={{ width: 200 }}
                            placeholder="Select Analysis Type"
                        />
                    }
                    styles={{
                        body: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                        },
                    }}
                >
                    <HighchartsReact
                        id="chart"
                        highcharts={Highcharts}
                        immutable={true}
                        options={sectorWiseData || {}}
                        export
                    />
                </Card>
            )}
            {displayDataGrid && (
                <Card title={`Comparision`}>
                    <DataGrid config={config() || {}} />
                </Card>
            )}
        </Flex>
    )
}

export default QuadrimesterChart
