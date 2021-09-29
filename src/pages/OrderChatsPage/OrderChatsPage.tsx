import { Empty, Card } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { AppPreloader } from "../../components";
import { getOrderChats } from "../../store/actions/orders";
import {
  getOrderChatsState,
  getOrdersLoadingState,
} from "../../store/selectors/orders";

const OrderChatsPage = () => {
  const { orderId }: { orderId?: string } = useParams();

  const orderChats = useSelector(getOrderChatsState);
  const chatsLoading = useSelector(getOrdersLoadingState);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getOrderChats(Number(orderId)));
  }, [dispatch, orderId]);

  if (chatsLoading) {
    return <AppPreloader />;
  }

  return (
    <Content className="content">
      {orderChats ? (
        orderChats.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <>
            {orderChats.map((chat) => (
              <Card
                title={`Чат №${chat.id}`}
                bodyStyle={{ display: "flex" }}
                key={chat.id}
              >
                <Card.Grid>
                  Поставщик:{" "}
                  {
                    <NavLink to={`/contractors/${chat.supplierId}`}>
                      {chat.supplierName}
                    </NavLink>
                  }
                </Card.Grid>
                <Card.Grid>
                  Заказчик:{" "}
                  {
                    <NavLink to={`/contractors/${chat.customerId}`}>
                      {chat.customerName}
                    </NavLink>
                  }
                </Card.Grid>
                <Card.Grid>
                  {
                    <NavLink to={`/orders/${chat.orderId}/chats/${chat.id}`}>
                      Сообщения
                    </NavLink>
                  }
                </Card.Grid>
              </Card>
            ))}
          </>
        )
      ) : null}
    </Content>
  );
};

export default OrderChatsPage;
