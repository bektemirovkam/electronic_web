import React from "react";
import {
  Layout,
  PageHeader,
  Button,
  Descriptions,
  Divider,
  Card,
  Image,
  Alert,
} from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ActionStatusEnum,
  addOrderFormData,
  OrderStatusEnum,
} from "../../types";
import { orderSchema } from "../../utils/validatorsSchemes";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import {
  getCurrentOrderState,
  getOrderActionStatusState,
  getOrdersErrorState,
  getOrdersLoadingState,
} from "../../store/selectors/orders";
import { ordersActions, updateOrder } from "../../store/actions/orders";
import { AppPreloader, UploadFileForm } from "../../components";
import { formatDate, formatStringToDate } from "../../utils/formatDate";

import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
import img5 from "../../assets/images/5.jpg";
import { OrderEditableField, OrderImagesList } from "./components";

const images = [img1, img2, img3, img4, img5];

const { Content } = Layout;

const OrderPage = () => {
  const [editMode, setEditMode] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<addOrderFormData>({
    resolver: yupResolver(orderSchema),
  });

  const order = useSelector(getCurrentOrderState);
  const orderActionStatus = useSelector(getOrderActionStatusState);
  const orderError = useSelector(getOrdersErrorState);
  const orderLoadingState = useSelector(getOrdersLoadingState);

  const dispatch = useDispatch();

  const clearState = () => {
    dispatch(ordersActions.setActionStatusSuccess(ActionStatusEnum.NEVER));
  };

  const toggleEditMode = () => {
    setEditMode((prev) => {
      clearState();
      return !prev;
    });
  };

  React.useEffect(() => {
    return () => {
      clearState();
    };
  }, []);

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    // if (order) {
    //   const updatedOrder = {
    //     title: formData.title,
    //     description: formData.description,
    //     orderStatus: OrderStatusEnum.NEW,
    //     price: formData.price,
    //     deadline: formData.deadline,
    //     customerId: 1,
    //     id: order.id,
    //     number: order.number,
    //     creationDate: order.creationDate,
    //     actualDate: order.actualDate,
    //   };
    //   setEditMode(false);
    //   dispatch(updateOrder(updatedOrder, order.id));
    //   dispatch(ordersActions.setCurrentOrder(updatedOrder));
    // }
  });

  const goBack = () => window.history.back();

  const editActionsButtons = [
    <Button key="1" onClick={onSubmit}>
      Сохранить
    </Button>,
    <Button key="2" onClick={toggleEditMode} danger>
      Отменить
    </Button>,
  ];

  const actionsButtons = [
    <Button key="3" onClick={toggleEditMode}>
      Редактировать
    </Button>,

    (order?.orderStatus === "ARCHIVED" || order?.orderStatus === "DELETED") && (
      <Button key="4" onClick={() => {}}>
        Восстановить
      </Button>
    ),
    <Button key="5" onClick={() => {}} danger>
      Удалить
    </Button>,
  ];

  if (orderLoadingState || !order) {
    return <AppPreloader />;
  }

  return (
    <Content className="content">
      {orderActionStatus !== ActionStatusEnum.NEVER && (
        <Alert
          message={
            orderActionStatus === ActionStatusEnum.ERROR
              ? orderError
              : "Изменения сохранены"
          }
          type={
            orderActionStatus === ActionStatusEnum.ERROR ? "error" : "success"
          }
          closable
          onClose={clearState}
        />
      )}
      <div className="page-header">
        <PageHeader
          ghost={false}
          onBack={goBack}
          title={
            <OrderEditableField
              defaultValue={order.title}
              editMode={editMode}
              control={control}
              error={errors.title}
              fieldName="title"
              placeholder="Заголовок"
            />
          }
          extra={editMode ? editActionsButtons : actionsButtons}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Создана">
              {formatDate(formatStringToDate(order.creationDate))}
            </Descriptions.Item>
            <Descriptions.Item label="Автор">
              <NavLink to="/">Создатель</NavLink>
            </Descriptions.Item>
            <Descriptions.Item label="Сроки">
              <OrderEditableField
                defaultValue={order.deadline}
                editMode={editMode}
                control={control}
                error={errors.title}
                fieldName="deadline"
                placeholder="Сроки"
              />
            </Descriptions.Item>

            <Descriptions.Item label="Закроется">
              {formatDate(formatStringToDate(order.actualDate))}
            </Descriptions.Item>
            <Descriptions.Item label="Номер заявки">
              {order.number}
            </Descriptions.Item>
            <Descriptions.Item label="Чаты">
              <NavLink to="/">Чаты</NavLink>
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>
      <div className="order__body">
        <Card>
          <Divider>Описание</Divider>
          <p>
            <OrderEditableField
              defaultValue={order.description}
              editMode={editMode}
              control={control}
              error={errors.description}
              fieldName="description"
              placeholder="Описание"
              isTextArea
            />
          </p>
          <Divider>Категории</Divider>
          <p></p>
          <Divider>Фото</Divider>
          {editMode ? <UploadFileForm /> : <OrderImagesList images={images} />}
        </Card>
      </div>
    </Content>
  );
};

export default OrderPage;
