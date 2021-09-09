import React from "react";

import { Button, Card, Form, Input, Layout, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  getCategoriesActionStatusState,
  getCategoriesErrorMessageState,
  getCategoriesLoadingState,
  getMainCategoriesState,
} from "../../store/selectors/categories";
import { AppAlert, AppPreloader, SelectParentCategory } from "../../components";
import {
  categoriesActions,
  createCategory,
  getAllCategories,
} from "../../store/actions/categories";
import { ActionStatusEnum, AddCategoryFormData } from "../../types";
import { categorySchema } from "../../utils/validatorsSchemes";

const { Content } = Layout;
const { Text, Title } = Typography;

const CategoryCreatePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCategoryFormData>({
    resolver: yupResolver(categorySchema),
  });

  const categoriesError = useSelector(getCategoriesErrorMessageState);
  const categoriesActionStatus = useSelector(getCategoriesActionStatusState);
  const mainCategories = useSelector(getMainCategoriesState);
  const categoriesLoading = useSelector(getCategoriesLoadingState);

  const dispatch = useDispatch();

  const clearState = React.useCallback(() => {
    dispatch(
      categoriesActions.setCategoriesActionStatus(ActionStatusEnum.NEVER)
    );
    dispatch(categoriesActions.setCategoriesErrorMessage(null));
  }, [dispatch]);

  const onSubmit = handleSubmit((formData) => {
    dispatch(createCategory(formData));
  });

  React.useEffect(() => {
    dispatch(getAllCategories());

    return () => clearState();
  }, [clearState, dispatch]);

  if (categoriesLoading) {
    return <AppPreloader />;
  }

  return (
    <Content className="content">
      <AppAlert
        onClose={clearState}
        errorMessage={categoriesError}
        successMessage={"Категория сохранена"}
        status={categoriesActionStatus}
      />
      <Card className="form">
        <Title level={3} className="title">
          Создание категории
        </Title>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.name ? "error" : "success"}
              help={errors.name?.message}
              className="input"
              required
            >
              <Text className="subtitle">Название категории</Text>
              <Input
                placeholder="Название категории"
                value={value}
                onChange={onChange}
              />
            </Form.Item>
          )}
          name="name"
          defaultValue=""
        />
        {mainCategories && (
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <SelectParentCategory
                mainCategories={mainCategories}
                handleChangeParentId={onChange}
                error={errors.parentId?.message}
              />
            )}
            name="parentId"
            defaultValue={0}
          />
        )}
        <Button
          className="categories__save-btn"
          onClick={onSubmit}
          disabled={categoriesLoading || Object.keys(errors).length > 0}
        >
          Сохранить
        </Button>
      </Card>
    </Content>
  );
};

export default CategoryCreatePage;
