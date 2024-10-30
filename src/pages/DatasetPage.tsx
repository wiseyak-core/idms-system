import { Button, Flex, Table } from 'antd'

type DatasetTableProps = {
    id: string
    name: string
    url: string
    uploadedAt: string
}

const datasetTableData: DatasetTableProps[] = [
    {
        id: '1',
        name: 'Sales Data Q1 2023',
        url: 'https://example.com/datasets/sales-q1-2023',
        uploadedAt: new Date('2023-01-15T10:30:00Z').toLocaleDateString(),
    },
    {
        id: '2',
        name: 'Customer Feedback 2023',
        url: 'https://example.com/datasets/customer-feedback-2023',
        uploadedAt: new Date('2023-03-22T14:00:00Z').toLocaleDateString(),
    },
    {
        id: '3',
        name: 'Website Traffic Analysis',
        url: 'https://example.com/datasets/website-traffic-2023',
        uploadedAt: new Date('2023-05-10T09:45:00Z').toLocaleDateString(),
    },
    {
        id: '4',
        name: 'Product Inventory Report',
        url: 'https://example.com/datasets/inventory-report',
        uploadedAt: new Date('2023-07-18T11:15:00Z').toLocaleDateString(),
    },
    {
        id: '5',
        name: 'Marketing Campaign Results',
        url: 'https://example.com/datasets/marketing-campaign',
        uploadedAt: new Date('2023-09-05T16:20:00Z').toLocaleDateString(),
    },
]

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

export const DatasetPage = () => {
    return (
        <Flex vertical gap={16} style={{ width: '100%' }}>
            <Flex align="center" justify="flex-end">
                <Button type="primary">Upload Dataset</Button>
            </Flex>
            <Table
                columns={columns}
                dataSource={datasetTableData}
                rowKey="id"
                pagination={false}
            />
        </Flex>
    )
}
