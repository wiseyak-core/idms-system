import { BUDGET_SORT, BUDGET_STATE } from '@/constant'
import { getBudgetExpenseService } from '@/services/charts.service'
import { budgetExpenseBarChart } from '@/utils/budgetHighChartConverter'
import { Card, Flex, Select } from 'antd'
import { budgetSortData } from '@/utils/budgetSortData'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

const BudgetChart = () => {
    const [searchParams] = useSearchParams()

    const [sort, setSort] = useState()
    const [state, setState] = useState()
    const months = searchParams.get('months') || ''
    const city = searchParams.get('city') || ''
    const topic = searchParams.get('topic') || ''
    const उपशीर्षक = searchParams.get('उपशीर्षक') || ''

    const { data: chartData } = useQuery({
        queryKey: [topic, city, months, उपशीर्षक],
        queryFn: () =>
            getBudgetExpenseService({
                city,
                months,
                उपशीर्षक,
            }),
    })

    const coreData = chartData && chartData.data

    const filteredData =
        coreData &&
        coreData.filter((item: any) => item['बजेट उपशीर्षक नाम'] !== '')

    const sortedData = filteredData && budgetSortData(filteredData, sort, state)

    const structuredData =
        sortedData && budgetExpenseBarChart(sortedData, state)

    const sortOptions = BUDGET_SORT.map((item) => ({
        value: item,
        label: item,
    }))

    const stateOptions = BUDGET_STATE.map((item) => ({
        value: item,
        label: item,
    }))

    console.log(chartData)

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
                justify="space-between"
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
                <Flex vertical>
                    <h3>Select जम्मा/चालु: </h3>
                    <Select
                        value={state}
                        onChange={(value) => {
                            setState(value)
                        }}
                        popupClassName="capitalizeWords"
                        rootClassName="capitalizeWords"
                        size="middle"
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select जम्मा/चालु"
                        filterOption={(input, option) =>
                            (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={stateOptions}
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

export default BudgetChart
