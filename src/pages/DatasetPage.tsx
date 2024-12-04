import UploadDataSetModal from '@/components/dataset/UploadDataSetModal'
import { DatasetTableProps } from '@/model'
import { Flex, Table, Tabs, TabsProps } from 'antd'
import { useState } from 'react'

const datasetTableData: DatasetTableProps[] = [
    {
        id: '1',
        name: 'Sales Data Q1 2023',
        url: 'https://example.com/datasets/sales-q1-2023',
        uploadedAt: new Date('2023-01-15T10:30:00Z').toLocaleDateString(),
        category: 'Budget Expense',
    },
    {
        id: '2',
        name: 'Customer Feedback 2023',
        url: 'https://example.com/datasets/customer-feedback-2023',
        uploadedAt: new Date('2023-03-22T14:00:00Z').toLocaleDateString(),
        category: 'Budget Expense',
    },
    {
        id: '3',
        name: 'Website Traffic Analysis',
        url: 'https://example.com/datasets/website-traffic-2023',
        uploadedAt: new Date('2023-05-10T09:45:00Z').toLocaleDateString(),
        category: 'Quadrimester Expense',
    },
    {
        id: '4',
        name: 'Product Inventory Report',
        url: 'https://example.com/datasets/inventory-report',
        uploadedAt: new Date('2023-07-18T11:15:00Z').toLocaleDateString(),
        category: 'Quadrimester Expense',
    },
    {
        id: '5',
        name: 'Marketing Campaign Results',
        url: 'https://example.com/datasets/marketing-campaign',
        uploadedAt: new Date('2023-09-05T16:20:00Z').toLocaleDateString(),
        category: 'Budget Expense',
    },
]

const budgetExpenseData: DatasetTableProps[] = datasetTableData.filter(
    (data) => data.category === 'Budget Expense'
)

const quadrimesterExpenseData: DatasetTableProps[] = datasetTableData.filter(
    (data) => data.category === 'Quadrimester Expense'
)

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
    },
    {
        title: 'Uploaded At',
        dataIndex: 'uploadedAt',
        key: 'uploadedAt',
    },
]

const items: TabsProps['items'] = [
    {
        key: 'All',
        label: 'All',
    },
    {
        key: 'Budget Expense',
        label: 'Budget Expense',
    },
    {
        key: 'Quadrimester Expense',
        label: 'Quadrimester Expense',
    },
]

export const DatasetPage = () => {
    const [activeTab, setActiveTab] = useState<string>('All')
    const onChange = (key: string) => {
        setActiveTab(key)
    }

    const activeData = () => {
        switch (activeTab) {
            case 'All':
                return datasetTableData
            case 'Budget Expense':
                return budgetExpenseData
            case 'Quadrimester Expense':
                return quadrimesterExpenseData
        }
    }

    return (
        <Flex vertical gap={16} style={{ width: '100%' }}>
            <Flex align="center" justify="space-between">
                <Tabs
                    defaultActiveKey={activeTab}
                    activeKey={activeTab}
                    items={items}
                    onChange={onChange}
                    type="card"
                />
                <UploadDataSetModal />
            </Flex>

            <Table
                columns={columns}
                dataSource={activeData()}
                rowKey="id"
                pagination={false}
            />
        </Flex>
    )
}
