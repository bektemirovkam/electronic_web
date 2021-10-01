import React from "react";
import { Button, Card, Layout, Typography, TreeSelect, message } from "antd";
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
import getBase64 from "../../utils/getBase64";
import { AttachmentType } from "../../models/Attachments";
import { OrderCreateForm } from "./components";
import {
  AddOrderFormData,
  DescriptionOrderFormData,
} from "../../models/Orders";
import {
  CategoryTreeItemInputType,
  CategoryTreeItemType,
} from "../../models/Categories";

const { Content } = Layout;
const { Title } = Typography;
const { SHOW_ALL } = TreeSelect;

const valueMap: { [key: number]: any } = {};

const getPath = (selectedCategories: CategoryTreeItemInputType[]) => {
  const path: CategoryTreeItemInputType[] = [];

  for (let category of selectedCategories) {
    let currentCategory = valueMap[category.value];
    while (currentCategory) {
      if (
        // eslint-disable-next-line no-loop-func
        path.some((category) => category.value === currentCategory?.value)
      ) {
        currentCategory = currentCategory.parent;
        continue;
      }

      path.unshift({
        value: currentCategory.value,
        label: currentCategory.title,
      });
      currentCategory = currentCategory.parent;
    }
  }

  return path;
};

const loops = (list?: CategoryTreeItemType[], parent?: any) => {
  return (list || []).map(({ children, value, title }) => {
    const node = (valueMap[value] = {
      parent,
      value,
      title,
    });
    //@ts-ignore
    node.children = loops(children, node);
    return node;
  });
};

const OrderCreatePage = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DescriptionOrderFormData>({
    resolver: yupResolver(orderSchema),
  });

  const [selectedCategories, setSelectedCategories] = React.useState<
    CategoryTreeItemInputType[]
  >([]);

  const orderActionStatus = useSelector(getOrderActionStatusState);
  const orderError = useSelector(getOrdersErrorMessageState);
  const orderLoadingState = useSelector(getOrdersLoadingState);
  const currentOrder = useSelector(getCurrentOrderState);
  const orderImages = useSelector(getOrderImagesState);
  const orderUploading = useSelector(getOrderImagesLoadingState);

  const categoriesTree = useSelector(getCategoriesTreeDataState);
  const categoriesError = useSelector(getCategoriesErrorMessageState);
  const categoriesActionStatus = useSelector(getCategoriesActionStatusState);

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
    if (currentOrder && orderActionStatus === ActionStatusEnum.SUCCESS) {
      history.push(`/orders/${currentOrder.id}`);
    }
  }, [currentOrder, history, orderActionStatus]);

  const handleChangeCategories = (value: CategoryTreeItemInputType[]) => {
    const path = getPath(value);
    setSelectedCategories(path);
  };

  const handleRemoveImage = (imageId: number) => {
    dispatch(removeNewOrderImage(imageId));
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
        const base64 = await getBase64(file);
        const ext = file.name.split(".").pop();
        const name = file.name;

        if (base64 && ext && name) {
          const image: AttachmentType = {
            name: name,
            ext: ext,
            content: base64.split(",")[1],
          };
          dispatch(addOrderImage(image));
        }
      }
    }
  };

  const onSubmit = handleSubmit((formData) => {
    const newOrder: AddOrderFormData = {
      title: formData.title,
      description: formData.description,
      comment: formData.comment,
      totalSum: formData.totalSum,
      contractors: [],
      attachments: orderImages.map((image) => ({
        attachmentId: image.id,
      })),
      customerId: 1,
      categories: selectedCategories.map((category) => ({
        categoryId: category.value,
      })),
    };

    dispatch(createOrder(newOrder));
    reset();
  });

  React.useMemo(() => loops(categoriesTree), [categoriesTree]);

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
          // onChange={handleChangeCategories}
          onChange={handleChangeCategories}
          // onSelect={handleSelectCategories}
          treeCheckable={true}
          treeCheckStrictly={true}
          showCheckedStrategy={SHOW_ALL}
          placeholder={"Выберите категории заявки"}
          style={{ width: "100%", marginBottom: 10 }}
          maxTagCount={5}
        />
        <ImagesList
          removeImage={handleRemoveImage}
          images={orderImages}
          editMode={true}
        />
        <UploadFileForm
          onChange={handleUploadImage}
          isUploading={orderUploading}
        />
        <Button
          className="order__save-btn"
          onClick={onSubmit}
          disabled={
            Object.keys(errors).length > 0 || selectedCategories.length === 0
          }
        >
          Сохранить
        </Button>
      </Card>
    </Content>
  );
};

export default OrderCreatePage;