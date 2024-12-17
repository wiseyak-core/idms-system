import { CITIES } from '@/constant/cities'
import { TOPICS } from '@/constant/topics'
import { Card, Flex, Select, Button, Checkbox } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    budgetExpenseFormSchema,
    BudgetExpenseFormSchemaType,
} from '@/schema/budgetExpense.schema'
import useTopicSelect from '@/hooks/useTopicSelect'
import { useEffect } from 'react'
import { MONTHS, SUBTITLE } from '@/constant'
import GuideSection from '../GuideSection'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import useActiveOptions from '@/hooks/useActiveFilter'

export const BudgetFilter = ({ onClose }: { onClose?: () => void }) => {
    const matches = useMediaQuery('(min-width: 1024px)')

    const [searchParams, setSearchParams] = useSearchParams()

    const { activeFilters } = useActiveOptions()

    const { setTopic, topic } = useTopicSelect()

    const { handleSubmit, control, reset, watch } =
        useForm<BudgetExpenseFormSchemaType>({
            resolver: yupResolver(budgetExpenseFormSchema),
            defaultValues: {},
        })

    const cities = watch('cities')
    const months = watch('months')
    const उपशीर्षक = watch('उपशीर्षक')

    const topicsOptions = TOPICS

    const citiesOptions = CITIES.map((city) => ({
        label: city,
        value: city,
    }))

    const monthOptions =
        activeFilters &&
        activeFilters.map((month) => ({
            label: month,
            value: month,
        }))

    const subTitleOptions = SUBTITLE.map((subTitle) => ({
        label: subTitle,
        value: subTitle,
    }))

    const handleTopicChange = (value: string) => {
        setTopic(value)
    }

    const handleFilter = (values: BudgetExpenseFormSchemaType) => {
        searchParams.delete('cities')
        searchParams.delete('months')
        searchParams.delete('उपशीर्षक')
        if (values.cities && values.months && values.उपशीर्षक) {
            values.cities.forEach(
                (city) =>
                    city &&
                    !searchParams.getAll('cities').includes(city) &&
                    searchParams.append('cities', city)
            )
            values.months.forEach(
                (month) =>
                    month &&
                    !searchParams.getAll('months').includes(month) &&
                    searchParams.append('months', month)
            )
            values.उपशीर्षक.forEach(
                (subTitle) =>
                    subTitle &&
                    !searchParams.getAll('उपशीर्षक').includes(subTitle) &&
                    searchParams.append('उपशीर्षक', subTitle)
            )
            setSearchParams(searchParams)
        }
        onClose && onClose()
    }

    useEffect(() => {
        const months = searchParams.getAll('months')
        const उपशीर्षक = searchParams.getAll('उपशीर्षक')

        if (!months) {
            searchParams.set('months', MONTHS[0])
        }

        if (!उपशीर्षक) {
            searchParams.set('उपशीर्षक', SUBTITLE[0])
        }

        setSearchParams(searchParams)

        reset({
            cities: searchParams.getAll('cities') ?? '',
            months: searchParams.getAll('months') ?? '',
            उपशीर्षक: searchParams.getAll('उपशीर्षक') ?? '',
        })
    }, [searchParams])

    return (
        <Card
            title="Select Filters"
            style={{
                height: '100%',
                width: '100%',
                flex: 1,
            }}
            styles={{
                body: {
                    width: '100%',
                },
            }}
        >
            <form onSubmit={handleSubmit(handleFilter)}>
                <Flex gap={24} vertical>
                    <Flex gap={8} vertical>
                        <Flex vertical>
                            <h3>Select District:</h3>
                            <Controller
                                name="cities"
                                control={control}
                                render={({
                                    field: { value, onChange },
                                    formState: { errors },
                                }) => (
                                    <>
                                        <Select
                                            value={value}
                                            onChange={onChange}
                                            popupClassName="capitalizeWords"
                                            rootClassName="capitalizeWords"
                                            size="middle"
                                            mode="multiple"
                                            showSearch
                                            maxCount={
                                                months &&
                                                उपशीर्षक &&
                                                (months?.length > 1 ||
                                                    उपशीर्षक?.length > 1)
                                                    ? 1
                                                    : undefined
                                            }
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
                            <h3>Select Months:</h3>
                            <Controller
                                name="months"
                                control={control}
                                render={({
                                    field: { value, onChange },
                                    formState: { errors },
                                }) => (
                                    <>
                                        <Select
                                            mode="multiple"
                                            value={value}
                                            onChange={onChange}
                                            popupClassName="capitalizeWords"
                                            rootClassName="capitalizeWords"
                                            size="middle"
                                            showSearch
                                            maxCount={
                                                उपशीर्षक &&
                                                cities &&
                                                (cities?.length > 1 ||
                                                    उपशीर्षक?.length > 1)
                                                    ? 1
                                                    : undefined
                                            }
                                            placeholder="Select a month"
                                            filterOption={(input, option) =>
                                                (option?.label ?? '')
                                                    .toLowerCase()
                                                    .includes(
                                                        input.toLowerCase()
                                                    )
                                            }
                                            options={monthOptions}
                                        />
                                        {errors && errors.months && (
                                            <span style={{ color: 'red' }}>
                                                {errors.months.message}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </Flex>
                        <Flex vertical>
                            <h3>Select उपशीर्षक:</h3>
                            <Controller
                                name={'उपशीर्षक'}
                                control={control}
                                render={({
                                    field: { value, onChange },
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
                                            style={{
                                                width: '100%',
                                            }}
                                            mode="multiple"
                                            maxCount={
                                                cities &&
                                                months &&
                                                (cities.length > 1 ||
                                                    months.length > 1)
                                                    ? 1
                                                    : 5
                                            }
                                            popupClassName="capitalizeWords"
                                            rootClassName="capitalizeWords"
                                            size="middle"
                                            showSearch
                                            placeholder="Select a उपशीर्षक"
                                            filterOption={(input, option) =>
                                                (option?.label ?? '')
                                                    .toLowerCase()
                                                    .includes(
                                                        input.toLowerCase()
                                                    )
                                            }
                                            options={subTitleOptions}
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
                                        {errors && errors.उपशीर्षक && (
                                            <span style={{ color: 'red' }}>
                                                {errors.उपशीर्षक.message}
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
                                onClose && onClose()
                            }}
                        >
                            Default
                        </Button>
                        {matches && <GuideSection category={TOPICS[0].value} />}
                    </Flex>
                </Flex>
            </form>
        </Card>
    )
}
