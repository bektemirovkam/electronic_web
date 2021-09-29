import React, { ChangeEvent } from "react";
import { Layout, BackTop, Table, Tag, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  getOrderActionStatusState,
  getOrdersErrorMessageState,
  getFilteredOrdersListState,
  getOrdersLoadingState,
} from "../../store/selectors/orders";
import { ActionStatusEnum } from "../../models/types";
import {
  deleteOrder,
  getOrders,
  ordersActions,
} from "../../store/actions/orders";
import { AppAlert, AppPreloader, AppSearchField } from "../../components";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import {
  OrderNumberSortFieldsType,
  OrdersQueryFilterType,
  OrderStatusEnum,
  OrderStringSortFieldsType,
  OrderType,
} from "../../models/Orders";
import { formatDate } from "../../utils/formatter";

const { Content } = Layout;
const { Column } = Table;

const getNumberSorter = (fieldName: OrderNumberSortFieldsType) => ({
  compare: (a: OrderType, b: OrderType) => a[fieldName] - b[fieldName],
});

const getStringSorter = (fieldName: OrderStringSortFieldsType) => ({
  compare: (a: OrderType, b: OrderType) =>
    a[fieldName].localeCompare(b[fieldName]),
});

const OrdersPage = () => {
  const [searchText, setSearchText] = React.useState<string>("");

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const orders = useSelector(
    getFilteredOrdersListState(
      searchText,
      query.get("filter") as OrdersQueryFilterType
    )
  );
  const ordersLoading = useSelector(getOrdersLoadingState);
  const ordersError = useSelector(getOrdersErrorMessageState);
  const orderActionStatus = useSelector(getOrderActionStatusState);

  const dispatch = useDispatch();
  const history = useHistory();

  const clearState = React.useCallback(() => {
    dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.NEVER));
    dispatch(ordersActions.setOrdersErrorMessage(null));
  }, [dispatch]);

  // const fetchData = React.useCallback(() => {
  //   // для кнопки обновить
  //   dispatch(getOrders());
  // }, [dispatch]);

  React.useEffect(() => {
    dispatch(getOrders());
    return () => {
      clearState();
    };
  }, [dispatch, clearState]);

  const handleDeleteOrder = (id: number) => {
    const answer = window.confirm("Вы уверены что хотите удалить заявку?");
    if (answer) {
      dispatch(deleteOrder(id));
    }
  };

  const handleViewOrder = (order: OrderType) => {
    history.push(`orders/${order.id}`);
  };

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  if (ordersLoading) {
    return <AppPreloader size="large" />;
  }

  return (
    <Content className="content">
      <AppAlert
        onClose={clearState}
        errorMessage={ordersError}
        successMessage="Заявка успешно удалена"
        status={orderActionStatus}
      />
      <AppSearchField
        value={searchText}
        onChange={handleChangeSearchText}
        placeholder="Найти по заголовку"
      />
      <Table
        showSorterTooltip={false}
        // columns={columns}
        dataSource={orders}
        rowKey={"id"}
        expandable={{
          expandedRowRender: (order) => (
            <div className="order__expanded">
              <p className="order__tab-descr">{order.description}</p>
              <div className="order__expanded-action">
                <Button
                  className="order__expanded-btn"
                  onClick={() => handleViewOrder(order)}
                >
                  Посмотреть
                </Button>
                <Button
                  className="order__expanded-btn"
                  onClick={() => handleDeleteOrder(order.id)}
                  danger
                >
                  Удалить
                </Button>
              </div>
            </div>
          ),
        }}
      >
        <Column<OrderType>
          title="Статус"
          dataIndex="orderStatus"
          key="age"
          render={(status: OrderStatusEnum) => {
            const colors = {
              [OrderStatusEnum.NEW]: "green",
              [OrderStatusEnum.ARCHIVED]: "geekblue",
              [OrderStatusEnum.DELETED]: "volcano",
            };

            return (
              <Tag color={colors[status]} key={status}>
                {status}
              </Tag>
            );
          }}
        />
        <Column<OrderType>
          title="Заголовок"
          key="title"
          render={(_, order) => (
            <Space size="middle">
              <NavLink to={`orders/${order.id}`}>{order.title}</NavLink>
            </Space>
          )}
          sorter={getStringSorter("title")}
        />
        <Column<OrderType>
          title="Дата создания"
          dataIndex="creationDate"
          key="creationDate"
          render={(_, data) => formatDate(data.creationDate)}
          defaultSortOrder="descend"
          sorter={getNumberSorter("creationDate")}
        />
        <Column<OrderType>
          title="Дата закрытия"
          dataIndex="actualDate"
          key="actualDate"
          render={(_, data) => formatDate(data.actualDate)}
          sorter={getNumberSorter("actualDate")}
        />
        <Column<OrderType>
          title="Категории"
          dataIndex="categories"
          key="categories"
          render={(_, data) => {
            return (
              <>
                {data.categories
                  .filter((category) => category.parentId === 0)
                  .map((category) => (
                    <Tag
                      color="blue"
                      key={category.categoryId}
                      className="order__tag"
                    >
                      {category.categoryName}
                    </Tag>
                  ))}
              </>
            );
          }}
        />
        <Column<OrderType>
          title="Цена (тг)"
          dataIndex="totalSum"
          key="totalSum"
          sorter={getNumberSorter("totalSum")}
        />
        <Column<OrderType> title="Сроки" dataIndex="comment" key="comment" />
      </Table>
    </Content>
  );
};

export default OrdersPage;
