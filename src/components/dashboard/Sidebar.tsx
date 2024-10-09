import {  Menu, MenuProps, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { ApiOutlined, AppstoreOutlined, BarChartOutlined, DatabaseOutlined, FormOutlined, HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";


type MenuItem = Required<MenuProps>['items'][number];

const sidebarItems: MenuItem[] =[
  { key: "home", label: "Home", icon: <HomeOutlined /> },
  { key: "category", label: "Categories", icon: <AppstoreOutlined /> },
  { key: "manage-datasets", label: "Manage Datasets", icon: <DatabaseOutlined /> },
  { key: "data-api", label: "Data API", icon: <ApiOutlined /> },
  { key: "forms", label: "Forms", icon: <FormOutlined /> },
  { key: "reports", label: "Reports & Analytics", icon: <BarChartOutlined /> },
  { key: "settings", label: "Settings", icon: <SettingOutlined /> }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const activeKey = pathname.split('/')[1];
  console.log(pathname)
  const handleMenuClick = ({key} : {key : string}) => {
    navigate('/' + key)
  }
  return (
    <Sider width={200} collapsible theme="light">
    <Typography.Title
      level={2}
      style={{
        padding: "0rem 1rem",
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

export default Sidebar;
