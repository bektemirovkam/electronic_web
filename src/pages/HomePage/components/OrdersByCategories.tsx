import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { getOrdersByCategoriesState } from "../../../store/selectors/orders";

const { Text } = Typography;

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-categories__tooltip">
        <p className="chart-categories__tooltip-label">{`${label} : ${payload[0].value} шт`}</p>
      </div>
    );
  }

  return null;
};

const OrdersByCategories = () => {
  const ordersByCategories = useSelector(getOrdersByCategoriesState);

  return (
    <div className="statistic__chart-categories chart-categories">
      <Text className="statistic__title">Заявки по категориям</Text>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={ordersByCategories}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoryName" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="ordersCount"
            name="Категории"
            barSize={20}
            fill="#8884d8"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersByCategories;
