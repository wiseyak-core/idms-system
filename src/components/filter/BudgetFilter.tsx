import { CITIES } from '@/constant/cities'
import { TOPICS } from '@/constant/topics'
import { Card, Flex, Select, Button } from 'antd'
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

export const BudgetFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const { setTopic, topic } = useTopicSelect()

    const { handleSubmit, control, reset } =
        useForm<BudgetExpenseFormSchemaType>({
            resolver: yupResolver(budgetExpenseFormSchema),
            defaultValues: {},
        })

    const topicsOptions = TOPICS.map((topic) => ({
        label: topic.replace('_', ' '),
        value: topic,
    }))

    const citiesOptions = CITIES.map((city) => ({
        label: city,
        value: city,
    }))

    const monthOptions = MONTHS.map((month) => ({
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
                minWidth: '300px',
                maxWidth: '300px',
                height: '100%',
                width: '100%',
                flex: 1,
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
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        popupClassName="capitalizeWords"
                                        rootClassName="capitalizeWords"
                                        size="middle"
                                        mode="multiple"
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
                            <h3>Select Months:</h3>
                            <Controller
                                name="months"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        mode="multiple"
                                        value={value}
                                        onChange={onChange}
                                        popupClassName="capitalizeWords"
                                        rootClassName="capitalizeWords"
                                        size="middle"
                                        showSearch
                                        placeholder="Select a month"
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={monthOptions}
                                    />
                                )}
                            />
                        </Flex>
                        <Flex vertical>
                            <h3>Select उपशीर्षक:</h3>
                            <Controller
                                name={'उपशीर्षक'}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        mode="multiple"
                                        popupClassName="capitalizeWords"
                                        rootClassName="capitalizeWords"
                                        size="middle"
                                        showSearch
                                        placeholder="Select a उपशीर्षक"
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={subTitleOptions}
                                    />
                                )}
                            />
                        </Flex>
                    </Flex>
                    <Button type="primary" htmlType="submit">
                        Filter
                    </Button>
                </Flex>
            </form>
        </Card>
    )
}
