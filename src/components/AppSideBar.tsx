import React from "react";

import { Layout, Menu, Affix } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

const AppSideBar = () => {
  const [currentLocation, setCurrentLocation] = React.useState<string[]>(["/"]);

  const location = useLocation();

  React.useEffect(() => {
    setCurrentLocation([`${location.pathname}${location.search}`]);
  }, [location]);

  return (
    <Affix offsetTop={64}>
      <Sider width={200} className="site-layout-background sidebar">
        <Menu
          mode="inline"
          className="sidebar__menu"
          selectedKeys={currentLocation}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Заявки">
            <Menu.Item key="/orders">
              <NavLink to="/orders">Все заявки</NavLink>
            </Menu.Item>
            <Menu.Item key="/orders?filter=active">
              <NavLink to="/orders?filter=active">Активные заявки</NavLink>
            </Menu.Item>
            <Menu.Item key="/orders?filter=archived">
              <NavLink to="/orders?filter=archived">Архивные заявки</NavLink>
            </Menu.Item>
            <Menu.Item key="/orders?filter=deleted">
              <NavLink to="/orders?filter=deleted">Удаленные заявки</NavLink>
            </Menu.Item>

            <Menu.Item key="/orders/create">
              <NavLink to="/orders/create">Создать заявку</NavLink>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" icon={<NotificationOutlined />} title="Заказчики">
            <Menu.Item key="/customers">
              <NavLink to="/customers">Все заказчики</NavLink>
            </Menu.Item>
            <Menu.Item key="/customers/create">
              <NavLink to="/customers/create">Создать заказчика</NavLink>
            </Menu.Item>
            <Menu.Item key="/customers?filter=banned">
              <NavLink to="/customers?filter=banned">Забаненные</NavLink>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Поставщики">
            <Menu.Item key="/suppliers">
              <NavLink to="/suppliers">Все поставщики</NavLink>
            </Menu.Item>
            <Menu.Item key="/suppliers/create">
              <NavLink to="/suppliers/create">Создать поставщика</NavLink>
            </Menu.Item>
            <Menu.Item key="/suppliers?filter=banned">
              <NavLink to="/suppliers?filter=banned">Забаненные</NavLink>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub4" icon={<NotificationOutlined />} title="Категории">
            <Menu.Item key="/categories">
              <NavLink to="/categories">Все категории</NavLink>
            </Menu.Item>
            <Menu.Item key="/categories/deleted">
              <NavLink to="/categories/deleted">Удаленные категории</NavLink>
            </Menu.Item>
            <Menu.Item key="/categories/create">
              <NavLink to="/categories/create">Создать категорию</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </Affix>
  );
};

export default AppSideBar;
