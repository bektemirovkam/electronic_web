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
import { ordersActions } from "../../store/actions/orders";
import { ActionStatusEnum, AddOrderFormData } from "../../types";
import {
  getOrderActionStatusState,
  getOrdersErrorMessageState,
  getOrdersLoadingState,
} from "../../store/selectors/orders";
import { orderSchema } from "../../utils/validatorsSchemes";
import { getCategoriesTreeDataState } from "../../store/selectors/categories";
import {
  categoriesActions,
  getAllCategories,
} from "../../store/actions/categories";

const { Content } = Layout;
const { Text, Title } = Typography;
const { SHOW_ALL } = TreeSelect;

const OrderCreatePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddOrderFormData>({
    resolver: yupResolver(orderSchema),
  });

  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const orderActionStatus = useSelector(getOrderActionStatusState);
  const orderError = useSelector(getOrdersErrorMessageState);
  const orderLoadingState = useSelector(getOrdersLoadingState);
  const categoriesTree = useSelector(getCategoriesTreeDataState);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const clearOrderState = () => {
    dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.NEVER));
    dispatch(ordersActions.setOrdersErrorMessage(null));
  };
  const clearCategoriesState = () => {
    dispatch(
      categoriesActions.setCategoriesActionStatus(ActionStatusEnum.NEVER)
    );
    dispatch(categoriesActions.setCategoriesErrorMessage(null));
  };

  const handleSelectCategories = (value: never[]) => {
    setSelectedCategories(value);
  };

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    console.log(selectedCategories);
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
        errorMessage={orderError}
        successMessage={"Заявка сохранена"}
        status={orderActionStatus}
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
                validateStatus={errors.deadline ? "error" : "success"}
                help={errors.deadline?.message}
                className="order__deadline-input input"
                required
              >
                <Text className="subtitle">Сроки</Text>
                <Input placeholder="Сроки" value={value} onChange={onChange} />
              </Form.Item>
            )}
            name="deadline"
            defaultValue=""
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Form.Item
                validateStatus={errors.price ? "error" : "success"}
                help={errors.price?.message}
                className="input order__price-input"
                required
              >
                <div className="order__price-field">
                  <Text className="subtitle">Цена (тг)</Text>
                  <InputNumber value={value} onChange={onChange} />
                </div>
              </Form.Item>
            )}
            name="price"
            defaultValue=""
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
