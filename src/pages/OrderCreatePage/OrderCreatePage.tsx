import React from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Layout,
  Typography,
  TreeSelect,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { AppAlert, AppPreloader, UploadFileForm } from "../../components";
import { createOrder, ordersActions } from "../../store/actions/orders";
import {
  ActionStatusEnum,
  DescriptionOrderFormData,
  OrderStatusEnum,
} from "../../types";
import {
  getCurrentOrderState,
  getOrderActionStatusState,
  getOrdersErrorMessageState,
  getOrdersLoadingState,
} from "../../store/selectors/orders";
import { orderSchema } from "../../utils/validatorsSchemes";
import {
  getCategoriesActionStatusState,
  getCategoriesErrorMessageState,
  getCategoriesTreeDataState,
} from "../../store/selectors/categories";
import {
  categoriesActions,
  getAllCategories,
} from "../../store/actions/categories";
import { useHistory } from "react-router-dom";

const { Content } = Layout;
const { Text, Title } = Typography;
const { SHOW_ALL } = TreeSelect;

const OrderCreatePage = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DescriptionOrderFormData>({
    resolver: yupResolver(orderSchema),
  });

  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    []
  );

  const orderActionStatus = useSelector(getOrderActionStatusState);
  const orderError = useSelector(getOrdersErrorMessageState);
  const orderLoadingState = useSelector(getOrdersLoadingState);
  const currentOrder = useSelector(getCurrentOrderState);

  const categoriesTree = useSelector(getCategoriesTreeDataState);
  const categoriesError = useSelector(getCategoriesErrorMessageState);
  const categoriesActionStatus = useSelector(getCategoriesActionStatusState);

  const dispatch = useDispatch();
  const history = useHistory();

  const clearOrderState = React.useCallback(() => {
    dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.NEVER));
    dispatch(ordersActions.setOrdersErrorMessage(null));
  }, [dispatch]);
  const clearCategoriesState = React.useCallback(() => {
    dispatch(
      categoriesActions.setCategoriesActionStatus(ActionStatusEnum.NEVER)
    );
    dispatch(categoriesActions.setCategoriesErrorMessage(null));
  }, [dispatch]);

  React.useEffect(() => {
    return () => {
      clearOrderState();
      clearCategoriesState();
    };
  }, [clearCategoriesState, clearOrderState]);

  React.useEffect(() => {
    if (currentOrder && orderActionStatus === ActionStatusEnum.SUCCESS) {
      history.push(`/orders/${currentOrder.id}`);
    }
  }, [currentOrder, history, orderActionStatus]);

  const handleSelectCategories = (value: number[]) => {
    setSelectedCategories(value);
  };

  const onSubmit = handleSubmit((formData) => {
    const categories = selectedCategories.map((categoryId) => ({
      categoryId,
    }));

    const newOrder = {
      title: formData.title,
      description: formData.description,
      comment: formData.comment,
      totalSum: formData.totalSum,
      orderStatus: OrderStatusEnum.NEW,
      contractors: [],
      attachments: [] as [],
      customerId: 1,
      categories,
    };

    dispatch(createOrder(newOrder));
    reset();
  });

  if (orderLoadingState) {
    return <AppPreloader />;
  }

  return (
    <Content className="content">
      <AppAlert
        onClose={clearOrderState}
        errorMessage={orderError}
        successMessage={"Заявка сохранена"}
        status={orderActionStatus}
      />
      <AppAlert
        onClose={clearCategoriesState}
        errorMessage={categoriesError}
        status={categoriesActionStatus}
      />
      <Card className="form">
        <Title level={3} className="title">
          Создание заявки
        </Title>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.title ? "error" : "success"}
              help={errors.title?.message}
              className="input order__title-input"
              required
            >
              <Text className="subtitle">Заголовок</Text>
              <Input
                placeholder="Заголовок заявки"
                value={value}
                onChange={onChange}
              />
            </Form.Item>
          )}
          name="title"
          defaultValue=""
        />
        <div className="order__numeric-fields">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Form.Item
                validateStatus={errors.comment ? "error" : "success"}
                help={errors.comment?.message}
                className="order__comment-input input"
                required
              >
                <Text className="subtitle">Сроки</Text>
                <Input placeholder="Сроки" value={value} onChange={onChange} />
              </Form.Item>
            )}
            name="comment"
            defaultValue=""
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Form.Item
                validateStatus={errors.totalSum ? "error" : "success"}
                help={errors.totalSum?.message}
                className="input order__totalsum-input"
                required
              >
                <div className="order__totalsum-field">
                  <Text className="subtitle">Цена (тг)</Text>
                  <InputNumber value={value} onChange={onChange} />
                </div>
              </Form.Item>
            )}
            name="totalSum"
            defaultValue={0}
          />
        </div>

        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.description ? "error" : "success"}
              help={errors.description?.message}
              className="input order__descr-input"
              required
            >
              <Text className="subtitle">Описание</Text>
              <Input.TextArea
                placeholder="Описание"
                value={value}
                onChange={onChange}
              />
            </Form.Item>
          )}
          name="description"
          defaultValue=""
        />
        <TreeSelect
          treeData={categoriesTree}
          value={selectedCategories}
          onChange={handleSelectCategories}
          treeCheckable={true}
          showCheckedStrategy={SHOW_ALL}
          placeholder={"Выберите категории заявки"}
          style={{ width: "100%", marginBottom: 10 }}
          maxTagCount={5}
        />
        <UploadFileForm />
        <Button
          className="order__save-btn"
          onClick={onSubmit}
          disabled={Object.keys(errors).length > 0}
        >
          Сохранить
        </Button>
      </Card>
    </Content>
  );
};

export default OrderCreatePage;
