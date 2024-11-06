import { SORT } from '@/constant'
import { QuadrimesterExpenseProps } from '@/model'
import { quadrimesterExpenseChart } from '@/utils/highChartConverter'
import { sortData } from '@/utils/sortData'
import { Card, Flex, Select } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const ChartSection = ({
    chartData,
}: {
    chartData: QuadrimesterExpenseProps
}) => {
    const [sort, setSort] = useState()
    const [searchParams] = useSearchParams()
    const quarter = searchParams.get('quarter')
    const coreData = chartData.data
    const filteredData = coreData.filter((item: any) => item['शीर्षक'] !== null)

    const sortedData = sortData(filteredData, sort, quarter)

    const structuredData = quadrimesterExpenseChart(sortedData, quarter)

    console.log(structuredData)

    const sortOptions = SORT.map((item) => ({
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
                options={structuredData}
                export
            />
        </Card>
    )
}

export default ChartSection
