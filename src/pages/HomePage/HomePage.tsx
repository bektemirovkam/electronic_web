import React from "react";
import { Card, Layout, Typography } from "antd";
import { ContractorsStatistic, OrdersStatistic } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { AppPreloader } from "../../components";
import { getContractorsLoadingState } from "../../store/selectors/contractors";
import { getContractors } from "../../store/actions/contractors";
import { getOrders } from "../../store/actions/orders";

const { Title } = Typography;

const { Content } = Layout;

const HomePage = () => {
  const contractorsLoading = useSelector(getContractorsLoadingState);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getContractors());
    dispatch(getOrders());
  }, [dispatch]);

  if (contractorsLoading) {
    return <AppPreloader />;
  }

  return (
    <Content className="content">
      <Card>
        <Title className="title">Статистика</Title>
        <div className="statistic">
          <ContractorsStatistic />
          <OrdersStatistic />
        </div>
      </Card>
    </Content>
  );
};

export default HomePage;
