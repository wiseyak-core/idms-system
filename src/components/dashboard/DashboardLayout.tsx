import { Flex, Layout } from 'antd'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
const { Content } = Layout

export const DashboardLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
            <Sidebar />
            <Layout>
                <Navbar />
                <Content>
                    <Flex
                        style={{
                            padding: '1rem',
                            width: '100%',
                        }}
                    >
                        <Outlet />
                    </Flex>
                </Content>
            </Layout>
        </Layout>
    )
}
