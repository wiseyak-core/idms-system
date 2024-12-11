import { BASE_URL } from '@/constant'
import { DatasetTableProps } from '@/model'
import { Input, Table, Tag } from 'antd'
import axios from 'axios'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { DeleteButton } from '../common/DeleteButton'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (_: any, __: any, index: number) => index + 1,
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: 'File Name',
        dataIndex: 'file_name',
        key: 'file_name',
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        render: (text: number | null) => text || '-',
    },
    {
        title: 'Month',
        dataIndex: 'month',
        key: 'month',
        render: (text: number | null) => text || '-',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (text: string | null) => (
            <Tag
                color="green"
                style={{
                    textTransform: 'capitalize',
                }}
            >
                {text?.replaceAll('_', ' ')}
            </Tag>
        ),
    },
    {
        title: 'Uploaded At',
        dataIndex: 'created',
        key: 'created',
    },
    {
        title: 'Last Modified',
        dataIndex: 'modified',
        key: 'modified',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_: any, record: DatasetTableProps) => {
            const params = {
                file_name: record.file_name,
                city: record.city,
                category: record.category,
                year: record.year,
                month: record.month,
            }
            const searchParams = new URLSearchParams()
            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    searchParams.append(key, value.toString())
                }
            })
            return (
                <DeleteButton
                    endpoint={`${BASE_URL}/api/dataset?${searchParams.toString()}`}
                    queryKey="dataset"
                />
            )
        },
    },
]
export const DatasetTable = ({ activeTab }: { activeTab: string }) => {
    const [searchText, setSearchText] = useState('')

    const { data: apiData, isLoading } = useQuery<DatasetTableProps[]>({
        queryKey: ['dataset'],
        queryFn: async () => {
            return (await axios.get(BASE_URL + '/api/dataset')).data
        },
    })

    const activeData = useMemo(() => {
        let filteredData = apiData || []

        switch (activeTab) {
            case 'All':
                break // Use all data
            case 'Budget Expense':
                filteredData = (apiData || []).filter(
                    (data) => data.category === 'budget_expense'
                )
                break
            case 'Quadrimester Expense':
                filteredData = (apiData || []).filter(
                    (data) => data.category === 'quadrimester_expense'
                )
                break
            default:
                break
        }

        if (searchText) {
            return filteredData.filter(
                (item) =>
                    item.city
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    item.category
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    item.file_name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
            )
        }

        return filteredData
    }, [apiData, activeTab, searchText])

    return (
        <>
            <Input.Search
                placeholder="Search by city, or category or filename"
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
            />
            <Table
                columns={columns}
                dataSource={activeData}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                loading={isLoading}
            />
        </>
    )
}
