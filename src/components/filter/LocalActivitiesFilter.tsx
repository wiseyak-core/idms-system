import { CITIES } from '@/constant/cities'
import { QUARTER } from '@/constant/quarter'
import { TOPICS } from '@/constant/topics'
import { YEAR } from '@/constant/year'
import { Card, Flex, Select, Button } from 'antd'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    localActivitiesFilterFormSchema,
    LocalActivitiesFilterFormSchemaType,
} from '@/schema/localActivities.schema'
import useTopicSelect from '@/hooks/useTopicSelect'
import { useEffect } from 'react'

export const LocalActivitiesFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const { setTopic } = useTopicSelect()

    const { handleSubmit, register, reset } =
        useForm<LocalActivitiesFilterFormSchemaType>({
            resolver: yupResolver(localActivitiesFilterFormSchema),
            defaultValues: {},
        })

    useEffect(() => {
        reset({
            city: searchParams.get('city') ?? '',
            year: searchParams.get('year') ?? '',
            quarter: searchParams.get('quarter') ?? '',
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

    const handleTopicChange = (value: string) => {
        setTopic(value)
    }

    const handleFilter = (values: LocalActivitiesFilterFormSchemaType) => {
        if (values.city && values.year && values.quarter) {
            setSearchParams({
                city: values.city,
                year: values.year,
                quarter: values.quarter,
            })
        }
    }

    return (
        <Card
            title="Select Filters"
            style={{
                minWidth: '300px',
                maxWidth: '300px',
            }}
        >
            <form onSubmit={handleSubmit(handleFilter)}>
                <Flex gap={24} vertical>
                    <Flex gap={8} vertical>
                        <Flex vertical>
                            <h3>Select District:</h3>
                            <Select
                                {...register('city')}
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
                                onChange={(e) => {
                                    handleTopicChange(e)
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
                                {...register('year')}
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
                                {...register('quarter')}
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
                    <Button type="primary" htmlType="submit">
                        Filter
                    </Button>
                </Flex>
            </form>
        </Card>
    )
}
