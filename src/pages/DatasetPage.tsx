import { DatasetTable } from '@/components/dataset/DatasetTable'
import UploadDataSetModal from '@/components/dataset/UploadDataSetModal'
import { Flex, Tabs, TabsProps } from 'antd'
import { useState } from 'react'

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
            <DatasetTable activeTab={activeTab} />
        </Flex>
    )
}
