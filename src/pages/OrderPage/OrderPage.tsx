import React from "react";
import { Layout, PageHeader, Button, message } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { orderSchema } from "../../utils/validatorsSchemes";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ActionStatusEnum } from "../../models/types";
import {
  getCurrentOrderState,
  getOrderActionStatusState,
  getOrderImagesLoadingState,
  getOrderImagesState,
  getOrdersErrorMessageState,
  getOrdersLoadingState,
} from "../../store/selectors/orders";
import {
  addOrderImage,
  createOrder,
  deleteOrder,
  getOrderById,
  ordersActions,
  removeOrderImage,
  updateOrder,
} from "../../store/actions/orders";
import { AppAlert, AppPreloader } from "../../components";

import {
  OrderDescription,
  OrderEditableField,
  OrderInfoBody,
} from "./components";
import { getCategoriesTreeDataState } from "../../store/selectors/categories";

import {
  AddOrderFormData,
  DescriptionOrderFormData,
  OrderStatusEnum,
} from "../../models/Orders";

const { Content } = Layout;

const OrderPage = () => {
  const [editMode, setEditMode] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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

  const orderImages = useSelector(getOrderImagesState);
  const orderImageUploading = useSelector(getOrderImagesLoadingState);

  const categoriesTree = useSelector(getCategoriesTreeDataState);

  const { orderId }: { orderId?: string } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const clearState = React.useCallback(() => {
    dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.NEVER));
    dispatch(ordersActions.setCurrentOrder(null));
    dispatch(ordersActions.clearOrderImages());
  }, [dispatch]);

  const toggleEditMode = () => {
    setEditMode((prev) => {
      dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.NEVER));
      return !prev;
    });
  };

  React.useEffect(() => {
    dispatch(getOrderById(Number(orderId)));
    return () => {
      clearState();
    };
  }, [clearState, dispatch, orderId]);

  React.useEffect(() => {
    if (order) {
      setSelectedCategories(
        order.categories?.map((category) => category.categoryId)
      );
      dispatch(ordersActions.setOrderImages(order.attachments));
    }
  }, [order, dispatch]);

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
      const updatedOrder: AddOrderFormData = {
        ...order,
        title: formData.title,
        description: formData.description,
        totalSum: formData.totalSum,
        comment: formData.comment,
        contractors: order.contractors,
        attachments: orderImages.map((image) => ({ attachmentId: image.id })),
        customerId: 1,
        categories,
      };
      setEditMode(false);
      dispatch(updateOrder(updatedOrder, order.id));
    }
  });

  const goBack = () => window.history.back();

  const handleSelectCategories = React.useCallback((value: number[]) => {
    setSelectedCategories(value);
  }, []);

  const handleDeleteOrder = () => {
    const answer = window.confirm("Вы уверены что хотите удалить заявку?");
    if (answer && order) {
      dispatch(deleteOrder(order.id));
    }
  };

  const handleCancelEdit = () => {
    toggleEditMode();
    if (order) {
      setSelectedCategories(
        order.categories?.map((category) => category.categoryId)
      );
      dispatch(ordersActions.clearOrderImages());
      dispatch(ordersActions.setOrderImages(order.attachments));
      reset({
        title: order.title,
        description: order.description,
        comment: order.comment,
        totalSum: order.totalSum,
      });
    }
  };

  const handleUploadImage = async (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg"
      ) {
        return message.error(`${file.name} не является картинкой`);
      } else {
        dispatch(addOrderImage(file));
      }
    }
  };

  const handleRemoveImage = (imageId: number) => {
    if (order) {
      dispatch(removeOrderImage(order.id, imageId));
    }
  };

  const restoreOrder = () => {
    const answer = window.confirm("Вы уверены что хотите повторить заявку?");
    if (answer && order) {
      const restoredOrder: AddOrderFormData = {
        title: order.title,
        comment: order.comment,
        totalSum: order.totalSum,
        contractors: [],
        customerId: order.customerId,
        description: order.description,
        attachments: order.attachments.map((image) => ({
          attachmentId: image.id,
        })),
        categories: order.categories.map((category) => ({
          categoryId: Number(category.categoryId),
        })),
        orderStatus: OrderStatusEnum.NEW,
      };
      dispatch(createOrder(restoredOrder));
    }
  };

  const editActionsButtons = [
    <Button
      key="1"
      onClick={onSubmit}
      disabled={
        Object.keys(errors).length !== 0 || selectedCategories.length === 0
      }
    >
      Сохранить
    </Button>,
    <Button key="2" onClick={handleCancelEdit} danger>
      Отменить
    </Button>,
  ];

  const actionsButtons = [
    order?.orderStatus === OrderStatusEnum.NEW && (
      <Button key="3" onClick={toggleEditMode}>
        Редактировать
      </Button>
    ),

    (order?.orderStatus === "ARCHIVED" || order?.orderStatus === "DELETED") && (
      <Button key="4" onClick={restoreOrder}>
        Повторить
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
              <OrderDescription
                order={order}
                editMode={editMode}
                errors={errors}
                control={control}
              />
            </PageHeader>
          </div>
          <OrderInfoBody
            categoriesTree={categoriesTree}
            selectedCategories={selectedCategories}
            handleSelectCategories={handleSelectCategories}
            handleRemoveImage={handleRemoveImage}
            handleAddImage={handleUploadImage}
            editMode={editMode}
            defaultValue={order.description}
            error={errors.description}
            images={orderImages}
            control={control}
            imageUploading={orderImageUploading}
          />
        </>
      )}
    </Content>
  );
};

export default OrderPage;
