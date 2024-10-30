import { Avatar, Flex, Layout, Typography, Dropdown, MenuProps } from 'antd'

import { DownOutlined, UserOutlined } from '@ant-design/icons'

const { Header } = Layout

const items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Profile',
    },
    {
        key: '2',
        label: 'Settings',
    },
]

export const Navbar = () => {
    return (
        <Header
            style={{
                padding: 0,
                background: '#fff',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'end',
                paddingRight: 24,
            }}
        >
            <Dropdown menu={{ items }} trigger={['click']}>
                <Flex align="center" gap={8} className="hover-pointer">
                    <Avatar size={42} icon={<UserOutlined />} />
                    <Typography.Text>John Doe</Typography.Text>
                    <DownOutlined />
                </Flex>
            </Dropdown>
        </Header>
    )
}
