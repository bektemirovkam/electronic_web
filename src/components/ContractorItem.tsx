import React from "react";
import { Card, Menu, Dropdown, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { ContractorType, OrderType } from "../types";
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

type ContractorItemPropsType = {
  onDelete: (id: number) => void;
  onView: (contractor: ContractorType) => void;
  contractor: ContractorType;
};

const ContractorItem: React.FC<ContractorItemPropsType> = ({
  onDelete,
  onView,
  contractor,
}) => {
  const handleDelete = () => {
    onDelete(contractor.id);
  };
  const handleView = () => {
    onView(contractor);
  };

  return (
    <>
      <Card
        className={classNames("contractor", {
          contractor__deleted: contractor.isDeleted,
          [`contractor__${contractor.contractorType}`]: true,
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
        title={contractor.name}
      >
        <p>{contractor.description}</p>
      </Card>
    </>
  );
};

export default ContractorItem;
