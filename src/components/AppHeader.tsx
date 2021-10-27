import React from "react";
import { Affix, Layout, Menu, Avatar } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";

const { Header } = Layout;

type AppHeaderPropsType = {
  logout: () => void;
};

const AppHeader: React.FC<AppHeaderPropsType> = ({ logout }) => {
  const [currentLocation, setCurrentLocation] = React.useState<string[]>(["/"]);

  const location = useLocation();

  React.useEffect(() => {
    setCurrentLocation([location.pathname.split("/")[1]]);
  }, [location]);

  const handleLogout = () => {
    const answer = window.confirm("Вы уверены что хотите выйти?");
    if (answer) {
      logout();
    }
  };

  return (
    <Affix offsetTop={0}>
      <Header className="header">
        <div className="header__logo">
          <NavLink to="/">
            <Avatar src={logo} size="large" />
          </NavLink>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["/home"]}
          selectedKeys={currentLocation}
          className="header__menu"
        >
          <Menu.Item key="home">
            <NavLink to="/home">Главная</NavLink>
          </Menu.Item>
          <Menu.Item key="orders">
            <NavLink to="/orders">Заявки</NavLink>
          </Menu.Item>
          <Menu.Item key="contractors">
            <NavLink to="/contractors">Контрагенты</NavLink>
          </Menu.Item>
          <Menu.Item key="categories">
            <NavLink to="/categories">Категории</NavLink>
          </Menu.Item>
        </Menu>
        <div className="header__logout">
          <NavLink to="/suppliers" onClick={handleLogout}>
            Выйти
          </NavLink>
        </div>
      </Header>
    </Affix>
  );
};

export default AppHeader;
