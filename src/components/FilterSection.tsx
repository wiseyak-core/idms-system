import { Button, Card, Flex, Select } from 'antd'
import { CITIES } from '@/constant/cities'
import { TOPICS } from '@/constant/topics'
import '../index.css'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { YEAR } from '@/constant/year'
// import { CHART_TYPE } from '@/constant/chartType'
import { QUARTER } from '@/constant/quarter'

const FilterSection = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const topics = searchParams.getAll('topics') || ''
    const cities = searchParams.getAll('cities') || ''
    const year = searchParams.get('year') || ''
    // const title = searchParams.get('title') || ''
    // const chartType = searchParams.get('chart_type') || ''
    const quarter = searchParams.get('quarter') || ''

    const [selectedTopic, setSelectedTopics] = useState<string[]>(topics)
    const [selectedCities, setSelectedCities] = useState<string[]>(cities)
    const [selectedYear, setSelectedYear] = useState<string>(year)
    // const [selectedTitle, setSelectedTitle] = useState<string>(title)
    // const [selectedChartType, setSelectedChartType] =
    //     useState<string>(chartType)
    const [selectedQuarter, setSelectedQuarter] = useState<string>(quarter)

    const topicsOptions = TOPICS.map((topic) => ({
        label: topic.replace('_', ' '),
        value: topic,
    }))

    const citiesOptions = CITIES.map((city) => ({
        label: city,
        value: city,
    }))

    const yearOptions = YEAR.map((year) => ({
        label: year,
        value: year,
    }))

    // const chartTypeOptions = CHART_TYPE.map((chartType) => ({
    //     label: chartType,
    //     value: chartType,
    // }))

    // const titleOptions = [
    //     {
    //         label: 'budget-expense',
    //         value: 'budget-expense',
    //     },
    // ]

    const quarterOptions = QUARTER.map((quarter) => ({
        label: quarter,
        value: quarter,
    }))

    const handleFilter = () => {
        setSearchParams({
            ...searchParams,
            topics: selectedTopic,
            cities: selectedCities,
            year: selectedYear,
            // title: selectedTitle,
            // chart_type: selectedChartType,
            quarter: selectedQuarter,
        })
    }

    return (
        <Card
            title="Select Filters"
            style={{
                minWidth: '300px',
                maxWidth: '300px',
            }}
        >
            <Flex gap={24} vertical>
                <Flex gap={8} vertical>
                    <Flex vertical>
                        <h3>Select District:</h3>
                        <Select
                            value={selectedCities}
                            onChange={(value) => {
                                setSelectedCities(value)
                            }}
                            popupClassName="capitalizeWords"
                            rootClassName="capitalizeWords"
                            size="middle"
                            showSearch
                            placeholder="Select a district"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={citiesOptions}
                        />
                    </Flex>
                    <Flex vertical>
                        <h3>Select Category:</h3>
                        <Select
                            value={selectedTopic}
                            onChange={(value) => {
                                setSelectedTopics(value)
                            }}
                            popupClassName="capitalizeWords"
                            rootClassName="capitalizeWords"
                            size="middle"
                            showSearch
                            placeholder="Select a category"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={topicsOptions}
                        />
                    </Flex>
                    <Flex vertical>
                        <h3>Select Year:</h3>
                        <Select
                            value={selectedYear}
                            onChange={(value) => {
                                setSelectedYear(value)
                            }}
                            popupClassName="capitalizeWords"
                            rootClassName="capitalizeWords"
                            size="middle"
                            showSearch
                            placeholder="Select a year"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={yearOptions}
                        />
                    </Flex>
                    {/* <Flex vertical>
                        <h3>Select Chart Type:</h3>
                        <Select
                            value={selectedChartType}
                            onChange={(value) => {
                                setSelectedChartType(value)
                            }}
                            popupClassName="capitalizeWords"
                            rootClassName="capitalizeWords"
                            size="middle"
                            showSearch
                            placeholder="Select a chartType"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={chartTypeOptions}
                        />
                    </Flex> */}
                    {/* <Flex vertical>
                        <h3>Select Title:</h3>
                        <Select
                            value={selectedTitle}
                            onChange={(value) => {
                                setSelectedTitle(value)
                            }}
                            popupClassName="capitalizeWords"
                            rootClassName="capitalizeWords"
                            size="middle"
                            showSearch
                            placeholder="Select a title"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={titleOptions}
                        />
                    </Flex> */}
                    <Flex vertical>
                        <h3>Select Quarter:</h3>
                        <Select
                            value={selectedQuarter}
                            onChange={(value) => {
                                setSelectedQuarter(value)
                            }}
                            popupClassName="capitalizeWords"
                            rootClassName="capitalizeWords"
                            size="middle"
                            showSearch
                            placeholder="Select a quarter"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={quarterOptions}
                        />
                    </Flex>
                </Flex>
                <Button type="primary" onClick={handleFilter}>
                    Filter
                </Button>
            </Flex>
        </Card>
    )
}

export default FilterSection
