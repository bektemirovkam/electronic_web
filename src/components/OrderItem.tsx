import React from "react";
import { Card, Menu, Dropdown, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const { Meta } = Card;

const menu = (
  <Menu className="dropmenu">
    <Menu.Item key="0">
      <Button block>Редактировать</Button>
    </Menu.Item>
    <Menu.Item key="1">
      <Button danger block>
        Удалить
      </Button>
    </Menu.Item>
    <Menu.Divider />
  </Menu>
);

const OrderItem = ({}) => {
  return (
    <>
      <Card
        className="orders__item"
        actions={[
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      >
        <Meta
          title="Card title This is the description This is the description This This is the description This is the description This is the description This is the description This is the description is the description This is the description This is the description This is the description This is the description This is the description This This is the description This is the description This is the description This is the description This is the description is the description This is the description This is the description This is the description  This is the description This is the description"
          description="This is the description This is the description This This is the description This is the description This is the description This is the description This is the description is the description This is the description This is the description This is the description This is the description This is the description This This is the description This is the description This is the description This is the description This is the description is the description This is the description This is the description This is the description This is the description This is the description This This is the description This is the description This is the description This is the description This is the description is the description This is the description This is the description This is the description This is the description This is the description This This is the description This is the description This is the description This is the description This is the description is the description This is the description This is the description This is the description This is the description This is the description This This is the description This is the description This is the description This is the description This is the description is the description This is the description This is the description This is the description"
        />
      </Card>
    </>
  );
};

export default OrderItem;
