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
  TreeSelect,
} from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ActionStatusEnum,
  AddOrderFormData,
  DescriptionOrderFormData,
  OrderStatusEnum,
} from "../../types";
import { orderSchema } from "../../utils/validatorsSchemes";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import {
  getCurrentOrderState,
  getOrderActionStatusState,
  getOrdersErrorMessageState,
  getOrdersLoadingState,
} from "../../store/selectors/orders";
import {
  deleteOrder,
  getFullOrderInfo,
  ordersActions,
  updateOrder,
} from "../../store/actions/orders";
import { AppAlert, AppPreloader, UploadFileForm } from "../../components";

import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
import img5 from "../../assets/images/5.jpg";
import { OrderEditableField, OrderImagesList } from "./components";
import { getCategoriesTreeDataState } from "../../store/selectors/categories";
import { getAllCategories } from "../../store/actions/categories";

const images = [img1, img2, img3, img4, img5];

const { Content } = Layout;
const { SHOW_ALL } = TreeSelect;

const OrderPage = () => {
  const [editMode, setEditMode] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DescriptionOrderFormData>({
    resolver: yupResolver(orderSchema),
  });

  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    []
  );

  const order = useSelector(getCurrentOrderState);
  const orderActionStatus = useSelector(getOrderActionStatusState);
  const orderError = useSelector(getOrdersErrorMessageState);
  const orderLoadingState = useSelector(getOrdersLoadingState);

  const categoriesTree = useSelector(getCategoriesTreeDataState);

  const { id }: { id?: string } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const clearState = React.useCallback(() => {
    dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.NEVER));
    dispatch(ordersActions.setCurrentOrder(null));
  }, [dispatch]);

  const toggleEditMode = () => {
    setEditMode((prev) => {
      dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.NEVER));
      return !prev;
    });
  };

  React.useEffect(() => {
    dispatch(getFullOrderInfo(Number(id)));
    return () => {
      clearState();
    };
  }, [clearState, dispatch, id]);

  React.useEffect(() => {
    if (order) {
      setSelectedCategories(
        order.categories?.map((category) => category.categoryId)
      );
    }
  }, [order]);

  React.useEffect(() => {
    // ВО ВРЕМЯ УДАЛЕНИЯ
    if (!order && orderActionStatus === ActionStatusEnum.SUCCESS) {
      history.push("/orders");
    }
  }, [history, order, orderActionStatus]);

  const onSubmit = handleSubmit((formData) => {
    if (order) {
      const categories = selectedCategories.map((categoryId) => ({
        categoryId,
      }));
      const updatedOrder = {
        id: order.id,
        creationDate: order.creationDate,
        actualDate: order.actualDate,
        title: formData.title,
        description: formData.description,
        orderStatus: OrderStatusEnum.NEW,
        totalSum: formData.totalSum,
        comment: formData.comment,
        contractors: order.contractors,
        attachments: order.attachments,
        customerId: 1,
        categories,
      };
      setEditMode(false);
      dispatch(updateOrder(updatedOrder, order.id));
    }
  });

  const goBack = () => window.history.back();

  const handleSelectCategories = (value: number[]) => {
    setSelectedCategories(value);
  };

  const handleDeleteOrder = () => {
    const answer = window.confirm("Вы уверены что хотите удалить заявку?");
    if (answer && order) {
      dispatch(deleteOrder(order.id));
    }
  };

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
      <Button
        key="4"
        onClick={() => {
          alert("В разработке");
        }}
      >
        Восстановить
      </Button>
    ),
    <Button key="5" onClick={handleDeleteOrder} danger>
      Удалить
    </Button>,
  ];

  if (orderLoadingState) {
    return <AppPreloader />;
  }

  return (
    <Content className="content">
      <AppAlert
        onClose={() =>
          dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.NEVER))
        }
        errorMessage={orderError}
        status={orderActionStatus}
        successMessage="Изменения успешно сохранены"
      />
      {order && (
        <>
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
                  {order.creationDate}
                </Descriptions.Item>
                <Descriptions.Item label="Автор">
                  <NavLink to="/customers">
                    {order.contractors?.length > 0
                      ? order.contractors[0].contractorName
                      : "Не известный заказчик"}
                  </NavLink>
                </Descriptions.Item>
                <Descriptions.Item label="Сроки">
                  <OrderEditableField
                    defaultValue={order.comment}
                    editMode={editMode}
                    control={control}
                    error={errors.title}
                    fieldName="comment"
                    placeholder="Сроки"
                  />
                </Descriptions.Item>

                <Descriptions.Item label="Закроется">
                  {order.actualDate}
                </Descriptions.Item>
                <Descriptions.Item label="Чаты">
                  <NavLink to="/">Чаты</NavLink>
                </Descriptions.Item>
                <Descriptions.Item label="Цена">
                  <OrderEditableField
                    isNumberInput
                    defaultValue={order.totalSum}
                    editMode={editMode}
                    control={control}
                    error={errors.totalSum}
                    fieldName="totalSum"
                    placeholder="Цена"
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Номер заявки">
                  {order.id}
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </div>
          <div className="order__body">
            <Card>
              <Divider>Описание</Divider>
              <OrderEditableField
                defaultValue={order.description}
                editMode={editMode}
                control={control}
                error={errors.description}
                fieldName="description"
                placeholder="Описание"
                isTextArea
              />
              <Divider>Категории</Divider>
              {categoriesTree && (
                <TreeSelect
                  treeData={categoriesTree}
                  value={selectedCategories}
                  onChange={handleSelectCategories}
                  treeCheckable={true}
                  showCheckedStrategy={SHOW_ALL}
                  placeholder={
                    editMode ? "Выберите категории заявки" : "Категории"
                  }
                  style={{ width: "100%", marginBottom: 10 }}
                  // maxTagCount={5}
                  disabled={!editMode}
                />
              )}
              <Divider>Фото</Divider>
              {editMode ? (
                <UploadFileForm />
              ) : (
                <OrderImagesList images={images} />
              )}
            </Card>
          </div>
        </>
      )}
    </Content>
  );
};

export default OrderPage;
