// https://ant.design/components/layout layout code from here
import { Avatar, Flex, Layout, Typography } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const { Header, Content } = Layout;



export const DashboardLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", margin: 0, padding: 0 }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "end",
            paddingRight: 24,
          }}
        >
          <Flex align="center" gap={8}>
            <Avatar size={42} icon={<UserOutlined />} />
            <Typography.Text>John Doe</Typography.Text>
            <DownOutlined />
          </Flex>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
