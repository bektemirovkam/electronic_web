import React, { ChangeEvent } from "react";
import { Layout, BackTop, Table, Tag, Button } from "antd";
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
import { useHistory, useLocation } from "react-router-dom";
import {
  OrdersQueryFilterType,
  OrderStatusEnum,
  OrderType,
} from "../../models/Orders";
import { formatDate } from "../../utils/formatter";
import { ColumnsType } from "antd/lib/table";
import { CategoryOutType } from "../../models/Categories";

const { Content } = Layout;

const columns: ColumnsType<OrderType> = [
  {
    title: "Статус",
    dataIndex: "orderStatus",
    render: (status: OrderStatusEnum) => {
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
    },
  },
  {
    title: "Заголовок",
    dataIndex: "title",
    sorter: {
      compare: (a, b) => a.title.localeCompare(b.title),
    },
  },
  {
    title: "Дата создания",
    dataIndex: "creationDate",
    sorter: {
      compare: (a, b) => a.creationDate - b.creationDate,
    },
    render: (data: number) => formatDate(data),
    defaultSortOrder: "descend",
  },
  {
    title: "Дата закрытия",
    dataIndex: "actualDate",
    sorter: {
      compare: (a, b) => a.actualDate - b.actualDate,
    },
    render: (data: number) => formatDate(data),
  },
  {
    title: "Категории",
    dataIndex: "categories",
    render: (categories: CategoryOutType[]) => {
      return (
        <>
          {categories
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
    },
  },
  {
    title: "Цена (тг)",
    dataIndex: "totalSum",
    sorter: {
      compare: (a, b) => a.totalSum - b.totalSum,
    },
  },
  {
    title: "Сроки",
    dataIndex: "comment",
  },
];

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
        columns={columns}
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
      />
      <BackTop />
    </Content>
  );
};

export default OrdersPage;
