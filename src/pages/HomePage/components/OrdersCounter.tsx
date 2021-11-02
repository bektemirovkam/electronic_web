import React from "react";
import { Card, Statistic, Typography } from "antd";
import { useSelector } from "react-redux";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import {
  getFailResultCount,
  getSuccessResultCount,
  getTodayArchivedCountState,
  getTodayOrdersCountState,
} from "../../../store/selectors/orders";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const OrdersCounter = () => {
  const createdTodayCount = useSelector(getTodayOrdersCountState);
  const closedTodayCount = useSelector(getTodayArchivedCountState);
  const successResultCount = useSelector(getSuccessResultCount);
  const failResultCount = useSelector(getFailResultCount);

  const { xl } = useBreakpoint();

  return (
    <div className="statistic__counters">
      <div className="counters">
        <Card className="counters__item" bodyStyle={{ padding: xl ? 20 : 10 }}>
          <Statistic
            title="Заявок сегодня"
            value={createdTodayCount}
            prefix={<ArrowUpOutlined />}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
        <Card className="counters__item" bodyStyle={{ padding: xl ? 20 : 10 }}>
          <Statistic
            title="Сегодня закроются"
            value={closedTodayCount}
            prefix={<ArrowDownOutlined />}
            valueStyle={{ color: "#cf1322" }}
          />
        </Card>
        <Card className="counters__item" bodyStyle={{ padding: xl ? 20 : 10 }}>
          <Statistic
            title="Удалось выполнить"
            value={successResultCount}
            prefix={<ArrowUpOutlined />}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
        <Card className="counters__item" bodyStyle={{ padding: xl ? 20 : 10 }}>
          <Statistic
            title="Не удалось выполнить"
            value={failResultCount}
            prefix={<ArrowDownOutlined />}
            valueStyle={{ color: "#cf1322" }}
          />
        </Card>
      </div>
    </div>
  );
};

export default OrdersCounter;
