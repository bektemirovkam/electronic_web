import React from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import {
  getContractorsCountState,
  getCustomersCountState,
  getDeletedContractorCountState,
  getSuppliersCountState,
} from "../../../store/selectors/contractors";

const { Text } = Typography;

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.name} ${value} шт`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Процент ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const ContractorsStatistic = () => {
  const [activeIndex, setActiveIndex] = React.useState<
    number | number[] | undefined
  >();

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const allContractorsCount = useSelector(getContractorsCountState);
  const customersCount = useSelector(getCustomersCountState);
  const suppliersCount = useSelector(getSuppliersCountState);
  const deletedContractorsCount = useSelector(getDeletedContractorCountState);

  const data = React.useMemo(() => {
    return [
      { name: "Заказчиков", value: customersCount ? customersCount : 0 },
      { name: "Поставщиков", value: suppliersCount ? suppliersCount : 0 },
      {
        name: "Удаленные",
        value: deletedContractorsCount ? deletedContractorsCount : 0,
      },
    ];
  }, [customersCount, deletedContractorsCount, suppliersCount]);

  return (
    <div className="statistic__pie">
      <Text className="statistic__pie-title">Контрагенты</Text>
      <Text className="statistic__pie-subtitle">
        Всего контрагентов: {allContractorsCount}
      </Text>
      {data && (
        <ResponsiveContainer>
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ContractorsStatistic;
