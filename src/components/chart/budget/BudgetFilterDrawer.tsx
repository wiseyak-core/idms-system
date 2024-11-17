import { useState } from 'react'
import { Button, Drawer } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import FilterSection from '@/components/filter/FilterSection'
const BudgetFilterDrawer = () => {
    const [open, setOpen] = useState(false)

    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Button
                type="primary"
                onClick={showDrawer}
                icon={<FilterOutlined />}
            >
                Filter
            </Button>
            <Drawer
                title="Filter Section"
                onClose={onClose}
                open={open}
                placement="left"
            >
                <FilterSection onClose={onClose} />
            </Drawer>
        </>
    )
}

export default BudgetFilterDrawer
