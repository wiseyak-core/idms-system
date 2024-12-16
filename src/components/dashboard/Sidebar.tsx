import { Menu, MenuProps, Typography } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { DatabaseOutlined, DownloadOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const sidebarItems: MenuItem[] = [
    {
        key: 'dataset',
        label: 'Manage Datasets',
        icon: <DatabaseOutlined />,
    },
    {
        key: 'crawler',
        label: 'Web Crawler',
        icon: <DownloadOutlined />,
    },
]

const Sidebar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const activeKey = pathname.split('/')[1]
    const handleMenuClick = ({ key }: { key: string }) => {
        navigate('/' + key)
    }
    return (
        <Sider width={200} collapsible theme="light">
            <Typography.Title
                level={2}
                style={{
                    padding: '0rem 1rem',
                }}
            >
                IDMS
            </Typography.Title>
            <Menu
                mode="inline"
                theme="light"
                defaultSelectedKeys={[activeKey]}
                items={sidebarItems}
                onClick={handleMenuClick}
            />
        </Sider>
    )
}

export default Sidebar
