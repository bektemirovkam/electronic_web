import React from "react";
import { Layout, Typography, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  getOrdersErrorState,
  getOrdersListState,
  getOrdersLoadingState,
} from "../../store/selectors/orders";
import { DirectionType, SortByOrdersFieldsType } from "../../types";
import { getOrders } from "../../store/actions/orders";
import { AppPreloader, OrderItem } from "../../components";

const { Content } = Layout;
const { Text } = Typography;
const { Meta } = Card;

const OrdersPage = () => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [showFilter, setShowFilter] = React.useState<boolean>(false);

  const [direction, setDirection] = React.useState<DirectionType>("asc");
  const [sortBy, setSortBy] = React.useState<SortByOrdersFieldsType>("title");

  const orders = useSelector(getOrdersListState(searchText));
  const ordersLoading = useSelector(getOrdersLoadingState);
  const ordersError = useSelector(getOrdersErrorState);

  const dispatch = useDispatch();

  const fetchData = React.useCallback(() => {
    dispatch(getOrders());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (ordersLoading) {
    return <AppPreloader size="large" />;
  }
  return (
    <Content className="content">
      {ordersError && (
        <div className="error">
          <Text type="danger">{ordersError}</Text>
        </div>
      )}
      <div className="orders">
        {true &&
          [
            1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3,
            4, 5, 1, 2, 3, 4, 5,
          ].map((order) => {
            return <OrderItem />;
          })}
      </div>
    </Content>
  );
};

export default OrdersPage;
