import React from "react";
import { Card, Menu, Dropdown, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { OrderType } from "../types";
import { formatDate } from "../utils/formatDate";
import classNames from "classnames";

type DropMenuPropsType = {
  handleDelete: () => void;
  handleView: () => void;
};

const DropMenu: React.FC<DropMenuPropsType> = ({
  handleDelete,
  handleView,
}) => (
  <Menu className="order__dropdown">
    <Menu.Item key="0">
      <Button onClick={handleView} block>
        Посмотреть
      </Button>
    </Menu.Item>
    <Menu.Item key="1">
      <Button onClick={handleDelete} danger block>
        Удалить
      </Button>
    </Menu.Item>
    <Menu.Divider />
  </Menu>
);

type OrderItemPropsType = {
  onDelete: (id: number) => void;
  onView: (order: OrderType) => void;
  order: OrderType;
};

const OrderItem: React.FC<OrderItemPropsType> = ({
  onDelete,
  onView,
  order,
}) => {
  const handleDelete = () => {
    onDelete(order.id);
  };
  const handleView = () => {
    onView(order);
  };

  return (
    <>
      <Card
        className={classNames("orders__item", "order", {
          [`order__${order.orderStatus}`]: true,
        })}
        extra={
          <Dropdown
            overlay={
              <DropMenu handleDelete={handleDelete} handleView={handleView} />
            }
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              type="link"
              className="order__dropbtn"
              icon={
                <EllipsisOutlined
                  className="order__dropicon"
                  style={{ color: "#000" }}
                />
              }
            />
          </Dropdown>
        }
        title={order.title}
      >
        <p className="order__date">
          {formatDate(Number(order.creationDate))} -{" "}
          {formatDate(Number(order.actualDate))}
        </p>
        <p className="order__descr">{order.description}</p>
      </Card>
    </>
  );
};

export default OrderItem;
