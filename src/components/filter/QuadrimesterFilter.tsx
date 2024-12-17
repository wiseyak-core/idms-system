import { CITIES } from '@/constant/cities'
import { QUARTER } from '@/constant/quarter'
import { TOPICS } from '@/constant/topics'
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
import useActiveOptions from '@/hooks/useActiveFilter'
import GuideSection from '../GuideSection'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export const QuadrimesterFilter = () => {
    const matches = useMediaQuery('(min-width: 1024px)')
    const [searchParams, setSearchParams] = useSearchParams()
    const { activeFilters } = useActiveOptions()
    const { setTopic, topic } = useTopicSelect()

    const { handleSubmit, control, reset, watch, setValue } =
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

    const topicsOptions = TOPICS

    const citiesOptions = CITIES.map((city) => ({
        label: city,
        value: city,
    }))

    const yearOptions =
        activeFilters &&
        activeFilters.map((year) => ({
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

    useEffect(() => {
        if (शीर्षक) {
            if (!शीर्षक.includes('all') && quarter?.includes('total')) {
                setValue(
                    'quarter',
                    quarter.filter((quarter) => quarter !== 'total')
                )
            }
        }
    }, [शीर्षक])

    return (
        <Card
            title="Select Filters"
            style={{
                maxWidth: '100%',
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
                                render={({
                                    field: { onChange, value },
                                    formState: { errors },
                                }) => (
                                    <>
                                        <Select
                                            onChange={(e) => {
                                                onChange(e)
                                            }}
                                            maxCount={
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
                                                    .includes(
                                                        input.toLowerCase()
                                                    )
                                            }
                                            options={citiesOptions}
                                        />
                                        {errors && errors.cities && (
                                            <span style={{ color: 'red' }}>
                                                {errors.cities.message}
                                            </span>
                                        )}
                                    </>
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
                                render={({
                                    field: { onChange, value },
                                    formState: { errors },
                                }) => (
                                    <>
                                        <Select
                                            onChange={(e) => {
                                                onChange(e)
                                            }}
                                            maxCount={
                                                isSingleYear
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
                                                    .includes(
                                                        input.toLowerCase()
                                                    )
                                            }
                                            options={yearOptions}
                                        />
                                        {errors && errors.years && (
                                            <span style={{ color: 'red' }}>
                                                {errors.years.message}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </Flex>
                        <Flex vertical>
                            <h3>Select Quarter:</h3>
                            <Controller
                                name="quarter"
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    formState: { errors },
                                }) => {
                                    const isTotalDisabled =
                                        !शीर्षक?.includes('all')

                                    const updatedQuarterOptions =
                                        quarterOptions.map((option) => ({
                                            ...option,
                                            disabled:
                                                option.value === 'total' &&
                                                isTotalDisabled,
                                        }))
                                    return (
                                        <>
                                            <Select
                                                value={value}
                                                onChange={(e) => {
                                                    onChange(e)
                                                }}
                                                maxCount={
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
                                                        .includes(
                                                            input.toLowerCase()
                                                        )
                                                }
                                                options={updatedQuarterOptions}
                                            />
                                            {errors && errors.quarter && (
                                                <span style={{ color: 'red' }}>
                                                    {errors.quarter.message}
                                                </span>
                                            )}
                                        </>
                                    )
                                }}
                            />
                        </Flex>
                        <Flex vertical>
                            <h3>Select शीर्षक:</h3>
                            <Controller
                                name="शीर्षक"
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    formState: { errors },
                                }) => (
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
                                        >
                                            All
                                        </Checkbox>
                                        {errors && errors.शीर्षक && (
                                            <span style={{ color: 'red' }}>
                                                {errors.शीर्षक.message}
                                            </span>
                                        )}
                                    </Flex>
                                )}
                            />
                        </Flex>
                    </Flex>
                    <Flex vertical gap={16}>
                        <Button type="primary" htmlType="submit">
                            Filter
                        </Button>

                        <Button
                            type="default"
                            onClick={() => {
                                setSearchParams({
                                    ...searchParams,
                                    topic: TOPICS[0].value,
                                    cities: CITIES[0],
                                    months: MONTHS[0],
                                    उपशीर्षक: 'all',
                                })
                            }}
                        >
                            Default
                        </Button>
                        {matches && <GuideSection category={TOPICS[1].value} />}
                    </Flex>
                </Flex>
            </form>
        </Card>
    )
}
