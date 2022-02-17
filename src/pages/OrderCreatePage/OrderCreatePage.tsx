import React from "react";
import {
  Button,
  Card,
  Layout,
  Typography,
  TreeSelect,
  message,
  Select,
} from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  AppAlert,
  AppPreloader,
  ImagesList,
  UploadFileForm,
} from "../../components";
import {
  addOrderImage,
  createOrder,
  ordersActions,
  removeNewOrderImage,
} from "../../store/actions/orders";
import { ActionStatusEnum } from "../../models/types";
import {
  getCurrentOrderState,
  getOrderActionStatusState,
  getOrderImagesLoadingState,
  getOrderImagesState,
  getOrdersErrorMessageState,
  getOrdersLoadingState,
} from "../../store/selectors/orders";
import { orderSchema } from "../../utils/validatorsSchemes";
import {
  getCategoriesActionStatusState,
  getCategoriesErrorMessageState,
  getCategoriesTreeDataState,
} from "../../store/selectors/categories";
import { categoriesActions } from "../../store/actions/categories";
import { OrderCreateForm } from "./components";
import {
  AddOrderFormData,
  DescriptionOrderFormData,
} from "../../models/Orders";
import {
  getContractorsListState,
  getContractorsLoadingState,
} from "../../store/selectors/contractors";
import { ContractorTypesEnum } from "../../models/Contractors";
import { getContractors } from "../../store/actions/contractors";

const { Content } = Layout;
const { Title } = Typography;
const { SHOW_ALL } = TreeSelect;
const { Option } = Select;

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

  const [customerId, setCustomerId] = React.useState<number | null>(null);

  const orderActionStatus = useSelector(getOrderActionStatusState);
  const orderError = useSelector(getOrdersErrorMessageState);
  const orderLoadingState = useSelector(getOrdersLoadingState);
  const currentOrder = useSelector(getCurrentOrderState);
  const orderImages = useSelector(getOrderImagesState);
  const orderUploading = useSelector(getOrderImagesLoadingState);

  const categoriesTree = useSelector(getCategoriesTreeDataState);
  const categoriesError = useSelector(getCategoriesErrorMessageState);
  const categoriesActionStatus = useSelector(getCategoriesActionStatusState);

  const contractors = useSelector(getContractorsListState);
  const contractorsLoading = useSelector(getContractorsLoadingState);

  const dispatch = useDispatch();
  const history = useHistory();

  const clearOrderState = React.useCallback(() => {
    dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.NEVER));
    dispatch(ordersActions.setOrdersErrorMessage(null));
    dispatch(ordersActions.clearOrderImages());
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
    if (!contractors) {
      dispatch(getContractors());
    }
  }, [contractors, dispatch]);

  React.useEffect(() => {
    if (currentOrder && orderActionStatus === ActionStatusEnum.SUCCESS) {
      history.push(`/orders/${currentOrder.id}`);
    }
  }, [currentOrder, history, orderActionStatus]);

  const handleChangeCategories = (value: number[]) => {
    setSelectedCategories(value);
  };

  const handleRemoveImage = (imageId: number) => {
    dispatch(removeNewOrderImage(imageId));
  };

  const handleSelectCustomerId = (value: string) =>
    setCustomerId(Number(value));

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

  const onSubmit = handleSubmit((formData) => {
    const categories = selectedCategories.map((categoryId) => ({
      categoryId,
    }));

    if (customerId) {
      const newOrder: AddOrderFormData = {
        title: formData.title,
        description: formData.description,
        comment: formData.comment,
        totalSum: formData.totalSum,
        contractors: [],
        attachments: orderImages.map((image) => ({
          attachmentId: image.id,
        })),
        customerId,
        categories,
      };

      dispatch(createOrder(newOrder));
      reset();
    }
  });

  const suppliers = React.useMemo(() => {
    return contractors?.filter(
      (contractor) => contractor.contractorType === ContractorTypesEnum.SUPPLIER
    );
  }, [contractors]);

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

        <OrderCreateForm control={control} errors={errors} />
        <TreeSelect
          treeData={categoriesTree}
          value={selectedCategories}
          onChange={handleChangeCategories}
          treeCheckable={true}
          showCheckedStrategy={SHOW_ALL}
          placeholder={"Выберите категории заявки"}
          style={{ width: "100%", marginBottom: 10 }}
          maxTagCount={5}
        />
        <Select
          showSearch
          style={{ width: "100%", marginBottom: 10 }}
          placeholder="Выберите автора заявки"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          onChange={handleSelectCustomerId}
          loading={contractorsLoading}
        >
          {suppliers &&
            suppliers.map((contractor) => {
              return <Option value={contractor.id}>{contractor.name}</Option>;
            })}
        </Select>
        <ImagesList
          removeImage={handleRemoveImage}
          images={orderImages}
          editMode={true}
        />
        <UploadFileForm
          onChange={handleUploadImage}
          isUploading={orderUploading}
          buttonText="Фото"
        />
        <Button
          className="order__save-btn"
          onClick={onSubmit}
          disabled={
            Object.keys(errors).length > 0 ||
            selectedCategories.length === 0 ||
            !customerId
          }
        >
          Сохранить
        </Button>
      </Card>
    </Content>
  );
};

export default OrderCreatePage;
