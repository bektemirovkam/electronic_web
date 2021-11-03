import React from "react";
import { Card, Statistic } from "antd";
import { useSelector } from "react-redux";
import { ArrowUpOutlined } from "@ant-design/icons";

import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { getTodayContractorsCountState } from "../../../store/selectors/contractors";

const ContractorsCounter = () => {
  const createdTodayCount = useSelector(getTodayContractorsCountState);

  const { xl } = useBreakpoint();

  return (
    <div className="statistic__counters">
      <div className="counters">
        <Card className="counters__item" bodyStyle={{ padding: xl ? 20 : 10 }}>
          <Statistic
            title="Зарегистрировались сегодня"
            value={createdTodayCount}
            prefix={<ArrowUpOutlined />}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </div>
    </div>
  );
};

export default ContractorsCounter;
