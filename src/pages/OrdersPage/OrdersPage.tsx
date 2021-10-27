import React, { ChangeEvent } from "react";
import { Layout, Table, Tag, Button, Space, BackTop } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReloadOutlined } from "@ant-design/icons";

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
import { useHistory, useLocation } from "react-router-dom";
import {
  OrderNumberSortFieldsType,
  OrderResultEnum,
  OrdersQueryFilterType,
  OrderStatusEnum,
  OrderStringSortFieldsType,
  OrderType,
} from "../../models/Orders";
import { formatDate, truncateString } from "../../utils/formatter";

const { Content } = Layout;
const { Column } = Table;

//TODO: немного подправить адаптив

const getNumberSorter = (fieldName: OrderNumberSortFieldsType) => ({
  compare: (a: OrderType, b: OrderType) => a[fieldName] - b[fieldName],
});

const getStringSorter = (fieldName: OrderStringSortFieldsType) => ({
  compare: (a: OrderType, b: OrderType) =>
    a[fieldName].localeCompare(b[fieldName]),
});

const getResultText = (result: OrderResultEnum) => {
  switch (result) {
    case OrderResultEnum.FAIL: {
      return "Не удалось выполнить";
    }

    case OrderResultEnum.SUCCESS: {
      return "Удалось выполнить";
    }

    default: {
      return "Не выбрано";
    }
  }
};

const OrdersPage = () => {
  const [searchText, setSearchText] = React.useState<string>("");

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const orders = useSelector(
    getFilteredOrdersListState(
      searchText,
      query.get("filter") as OrdersQueryFilterType,
      query.get("category"),
      query.get("contractor")
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

  const fetchData = React.useCallback(() => {
    dispatch(getOrders());
  }, [dispatch]);

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
    history.push(`/orders/${order.id}`);
  };

  const addFilterByCategory = (categoryId: number) => {
    history.push({
      pathname: "/orders",
      search: `?category=${categoryId}`,
    });
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
      <div className="orders__header">
        <AppSearchField
          value={searchText}
          onChange={handleChangeSearchText}
          placeholder="Найти по заголовку"
        />

        <Button
          type="primary"
          icon={<ReloadOutlined />}
          size="large"
          onClick={fetchData}
        />
      </div>
      <Table
        pagination={{ position: ["topRight", "bottomRight"] }}
        showSorterTooltip={false}
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
          sorter={getStringSorter("orderStatus")}
        />
        <Column<OrderType>
          title="Заголовок"
          key="title"
          render={(_, order) => (
            <Space size="middle">
              <Button
                onClick={() => handleViewOrder(order)}
                type="link"
                key="title"
              >
                {truncateString(order.title, 40)}
              </Button>
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
                    <Button
                      onClick={() => addFilterByCategory(category.categoryId)}
                      type="link"
                      key={category.categoryId}
                    >
                      <Tag color="blue" className="order__tag">
                        {category.categoryName}
                      </Tag>
                    </Button>
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
        <Column<OrderType>
          title="Результат"
          dataIndex="results"
          key="results"
          sorter={getStringSorter("result")}
          render={(_, data) => {
            const colors = {
              [OrderResultEnum.NONE]: "geekblue",
              [OrderResultEnum.SUCCESS]: "green",
              [OrderResultEnum.FAIL]: "volcano",
            };

            return (
              <Tag color={colors[data.result]} className="order__tag">
                {getResultText(data.result)}
              </Tag>
            );
          }}
        />
      </Table>
      <BackTop />
    </Content>
  );
};

export default OrdersPage;
