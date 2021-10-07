import React from "react";
import { Card, Statistic, Typography } from "antd";
import { useSelector } from "react-redux";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import {
  getTodayArchivedCountState,
  getTodayOrdersCountState,
} from "../../../store/selectors/orders";

const { Text } = Typography;

const OrdersCounter = () => {
  const createdTodayCount = useSelector(getTodayOrdersCountState);
  const closedTodayCount = useSelector(getTodayArchivedCountState);

  return (
    <div className="statistic__counters">
      <div className="counters">
        <Card className="counters__item">
          <Statistic
            title="Заявок сегодня"
            value={createdTodayCount}
            prefix={<ArrowUpOutlined />}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
        <Card className="counters__item">
          <Statistic
            title="Сегодня закроются"
            value={closedTodayCount}
            prefix={<ArrowDownOutlined />}
            valueStyle={{ color: "#cf1322" }}
          />
        </Card>
      </div>
    </div>
  );
};

export default OrdersCounter;
