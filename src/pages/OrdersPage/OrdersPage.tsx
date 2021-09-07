import React from "react";
import { Layout, Typography, BackTop } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  getOrdersErrorState,
  getOrdersListState,
  getOrdersLoadingState,
} from "../../store/selectors/orders";
import {
  DirectionType,
  OrdersQueryFilterType,
  OrderType,
  SortByOrdersFieldsType,
} from "../../types";
import {
  deleteOrder,
  getOrders,
  ordersActions,
} from "../../store/actions/orders";
import { AppPreloader, OrderItem } from "../../components";
import { useHistory, useLocation } from "react-router-dom";

const { Content } = Layout;
const { Text } = Typography;

const OrdersPage = () => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [showFilter, setShowFilter] = React.useState<boolean>(false);

  const [direction, setDirection] = React.useState<DirectionType>("asc");
  const [sortBy, setSortBy] = React.useState<SortByOrdersFieldsType>("title");

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const orders = useSelector(
    getOrdersListState(searchText, query.get("filter") as OrdersQueryFilterType)
  );

  const ordersLoading = useSelector(getOrdersLoadingState);
  const ordersError = useSelector(getOrdersErrorState);

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchData = React.useCallback(() => {
    dispatch(getOrders());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleDeleteOrder = (id: number) => {
    const answer = window.confirm("Вы уверены что хотите удалить заявку?");
    if (answer) {
      dispatch(deleteOrder(id));
    }
  };

  const handleViewOrder = (order: OrderType) => {
    dispatch(ordersActions.setCurrentOrder(order));
    history.push(`orders/${order.id}`);
  };

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
        {orders &&
          orders.map((order) => {
            return (
              <OrderItem
                key={String(order.id)}
                onDelete={handleDeleteOrder}
                onView={handleViewOrder}
                order={order}
              />
            );
          })}
      </div>
      <BackTop />
    </Content>
  );
};

export default OrdersPage;
