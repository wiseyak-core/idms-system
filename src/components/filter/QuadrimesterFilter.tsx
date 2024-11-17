import { CITIES } from '@/constant/cities'
import { QUARTER } from '@/constant/quarter'
import { TOPICS } from '@/constant/topics'
import { YEAR } from '@/constant/year'
import { Card, Flex, Select, Button, Checkbox } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    quadrimesterFilterFormSchema,
    QuadrimesterFilterFormSchemaType,
} from '@/schema/quadrimesterfilter.schema'
import useTopicSelect from '@/hooks/useTopicSelect'
import { useEffect } from 'react'
import { MONTHS, QUADRIMESTER_TITLE } from '@/constant'

export const QuadrimesterFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const { setTopic, topic } = useTopicSelect()

    const { handleSubmit, control, reset, watch } =
        useForm<QuadrimesterFilterFormSchemaType>({
            resolver: yupResolver(quadrimesterFilterFormSchema),
            defaultValues: {},
        })

    const cities = watch('cities')

    const year = watch('years')

    const quarter = watch('quarter')

    const शीर्षक = watch('शीर्षक')

    const isSingleCity =
        (year && year.length > 1) ||
        (quarter && quarter.length > 1) ||
        (शीर्षक && शीर्षक.length > 1)

    const isSingleYear =
        (cities && cities.length > 1) ||
        (quarter && quarter.length > 1) ||
        (शीर्षक && शीर्षक.length > 1)

    const isSingleQuarter =
        (cities && cities.length > 1) ||
        (year && year.length > 1) ||
        (शीर्षक && शीर्षक.length > 1)

    const isSingleTitle =
        (cities && cities.length > 1) ||
        (year && year.length > 1) ||
        (quarter && quarter.length > 1)

    useEffect(() => {
        reset({
            cities: searchParams.getAll('cities') ?? '',
            years: searchParams.getAll('years') ?? '',
            quarter: searchParams.getAll('quarter') ?? '',
            शीर्षक: searchParams.getAll('शीर्षक') ?? '',
        })
    }, [searchParams])

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

    const quarterOptions = QUARTER.map((quarter) => ({
        label: quarter,
        value: quarter,
    }))

    const titleOptions = QUADRIMESTER_TITLE.map((item) => ({
        label: item,
        value: item,
    }))

    const handleTopicChange = (value: string) => {
        setTopic(value)
    }

    const handleFilter = (values: QuadrimesterFilterFormSchemaType) => {
        searchParams.delete('cities')
        searchParams.delete('years')
        searchParams.delete('quarter')
        searchParams.delete('शीर्षक')
        if (values.cities && values.years && values.quarter && values.शीर्षक) {
            values.cities.forEach(
                (city) =>
                    city &&
                    !searchParams.getAll('cities').includes(city) &&
                    searchParams.append('cities', city)
            )
            values.years.forEach(
                (year) =>
                    year &&
                    !searchParams.getAll('years').includes(year) &&
                    searchParams.append('years', year)
            )
            values.quarter.forEach(
                (quarter) =>
                    quarter &&
                    !searchParams.getAll('quarter').includes(quarter) &&
                    searchParams.append('quarter', quarter)
            )
            values.शीर्षक.forEach(
                (title) =>
                    title &&
                    !searchParams.getAll('शीर्षक').includes(title) &&
                    searchParams.append('शीर्षक', title)
            )

            setSearchParams(searchParams)
        }
    }

    return (
        <Card
            title="Select Filters"
            style={{
                minWidth: '300px',
                maxWidth: '300px',
                flex: '1',
            }}
        >
            <form onSubmit={handleSubmit(handleFilter)}>
                <Flex gap={24} vertical>
                    <Flex gap={8} vertical>
                        <Flex vertical>
                            <h3>Select District:</h3>
                            <Controller
                                control={control}
                                name="cities"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        onChange={(e) => {
                                            onChange(e)
                                        }}
                                        maxCount={
                                            शीर्षक?.includes('all') ||
                                            isSingleCity
                                                ? 1
                                                : citiesOptions.length
                                        }
                                        mode="multiple"
                                        value={value}
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
                                )}
                            />
                        </Flex>
                        <Flex vertical>
                            <h3>Select Category:</h3>

                            <Select
                                onChange={(e) => {
                                    handleTopicChange(e)
                                }}
                                value={topic}
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
                            <Controller
                                name="years"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        onChange={(e) => {
                                            onChange(e)
                                        }}
                                        maxCount={
                                            isSingleYear ||
                                            शीर्षक?.includes('all')
                                                ? 1
                                                : citiesOptions.length
                                        }
                                        mode="multiple"
                                        value={value}
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
                                )}
                            />
                        </Flex>
                        <Flex vertical>
                            <h3>Select Quarter:</h3>
                            <Controller
                                name="quarter"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e)
                                        }}
                                        maxCount={
                                            शीर्षक?.includes('all') ||
                                            isSingleQuarter
                                                ? 1
                                                : citiesOptions.length
                                        }
                                        mode="multiple"
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
                                )}
                            />
                        </Flex>
                        <Flex vertical>
                            <h3>Select शीर्षक:</h3>
                            <Controller
                                name="शीर्षक"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Flex
                                        justify="space-between"
                                        align="start"
                                        gap={10}
                                        vertical
                                    >
                                        <Select
                                            value={
                                                value?.includes('all')
                                                    ? []
                                                    : value
                                            }
                                            onChange={(e) => {
                                                onChange(e)
                                            }}
                                            style={{ width: '100%' }}
                                            maxCount={isSingleTitle ? 1 : 5}
                                            mode="multiple"
                                            popupClassName="capitalizeWords"
                                            rootClassName="capitalizeWords"
                                            size="middle"
                                            showSearch
                                            placeholder="Select a शीर्षक"
                                            filterOption={(input, option) =>
                                                (option?.label ?? '')
                                                    .toLowerCase()
                                                    .includes(
                                                        input.toLowerCase()
                                                    )
                                            }
                                            options={titleOptions}
                                        />
                                        <Checkbox
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            checked={value?.includes('all')}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    onChange(['all'])
                                                } else {
                                                    onChange([])
                                                }
                                            }}
                                            disabled={
                                                isSingleCity ||
                                                isSingleYear ||
                                                isSingleQuarter
                                            }
                                        >
                                            All
                                        </Checkbox>
                                    </Flex>
                                )}
                            />
                        </Flex>
                    </Flex>
                    <Button type="primary" htmlType="submit">
                        Filter
                    </Button>
                    <Button
                        type="default"
                        onClick={() => {
                            setSearchParams({
                                ...searchParams,
                                topic: TOPICS[0],
                                cities: CITIES[0],
                                months: MONTHS[0],
                                उपशीर्षक: 'all',
                            })
                        }}
                    >
                        Default
                    </Button>
                </Flex>
            </form>
        </Card>
    )
}
