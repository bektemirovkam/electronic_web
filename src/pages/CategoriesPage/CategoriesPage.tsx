import React, { ChangeEvent } from "react";
import { Layout, Typography, Empty, Collapse, Button, List } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  getCategoriesActionStatusState,
  getCategoriesErrorMessageState,
  getCategoriesLoadingState,
  getCategoryInProcessEditState,
  getMainCategoriesState,
  getSubCategoriesState,
} from "../../store/selectors/categories";
import {
  categoriesActions,
  deleteCategoryById,
  getAllCategories,
  updateCategoryById,
} from "../../store/actions/categories";
import { AppAlert, AppPreloader, SelectParentCategory } from "../../components";
import { ActionStatusEnum, CategoryType } from "../../types";
import { MainCategoryActions, CategoryEditableField } from "./components";

const { Content } = Layout;
const { Text } = Typography;
const { Panel } = Collapse;

const CategoriesPage = () => {
  const [editableCategory, setEditableCategory] =
    React.useState<CategoryType | null>(null);

  const dispatch = useDispatch();

  const mainCategories = useSelector(getMainCategoriesState);
  const subCategories = useSelector(getSubCategoriesState);
  const categoriesLoading = useSelector(getCategoriesLoadingState);
  const categoriesError = useSelector(getCategoriesErrorMessageState);
  const categoryInEditProcess = useSelector(getCategoryInProcessEditState);
  const categoriesActionStatus = useSelector(getCategoriesActionStatusState);

  const clearState = React.useCallback(() => {
    dispatch(
      categoriesActions.setCategoriesActionStatus(ActionStatusEnum.NEVER)
    );
    dispatch(categoriesActions.setCategoriesErrorMessage(null));
  }, [dispatch]);

  React.useEffect(() => {
    return () => clearState();
  }, [clearState]);

  const onRemove = (id: number) => {
    const answer = window.confirm("Вы действительно хотите удалить категорию?");
    if (answer) {
      dispatch(deleteCategoryById(id));
    }
  };

  const onEdit = (category: CategoryType) => {
    setEditableCategory(category);
  };

  const onSave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (editableCategory) {
      dispatch(updateCategoryById(editableCategory));
    }
    setEditableCategory(null);
  };

  const onCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableCategory((prev) => {
      if (prev) {
        return { ...prev, name: e.target.value };
      }
      return prev;
    });
  };

  const handleChangeParentId = (id: number) => {
    setEditableCategory((prev) => {
      if (prev) {
        return { ...prev, parentId: id };
      }
      return prev;
    });
  };

  if (categoriesLoading) {
    return <AppPreloader size="large" />;
  }

  return (
    <Content className="content">
      <AppAlert
        onClose={clearState}
        errorMessage={categoriesError}
        successMessage={"Изменения сохранены"}
        status={categoriesActionStatus}
      />
      {mainCategories && mainCategories.length > 0 ? (
        <Collapse accordion>
          {mainCategories.map((mainCat) => {
            return (
              <Panel
                header={
                  <div className="categories__header">
                    {categoryInEditProcess === mainCat.id ? (
                      <Text>Сохранение...</Text>
                    ) : (
                      <CategoryEditableField
                        editMode={editableCategory?.id === mainCat.id}
                        value={mainCat.name}
                        currentValue={editableCategory?.name}
                        onChange={onCategoryNameChange}
                      />
                    )}
                  </div>
                }
                key={mainCat.id}
                extra={
                  <MainCategoryActions
                    editMode={editableCategory?.id === mainCat.id}
                    disabledBtn={editableCategory?.name.length === 0}
                    onSave={onSave}
                    onEdit={onEdit}
                    category={mainCat}
                    onRemove={onRemove}
                  />
                }
              >
                {subCategories && (
                  <List
                    dataSource={subCategories.filter(
                      (subCat) => subCat.parentId === mainCat.id
                    )}
                    renderItem={(item) => (
                      <List.Item
                        actions={
                          editableCategory?.id === item.id
                            ? [
                                <Button
                                  onClick={onSave}
                                  disabled={editableCategory?.name.length === 0}
                                >
                                  Сохранить
                                </Button>,
                              ]
                            : [
                                <Button
                                  size="small"
                                  onClick={(
                                    e: React.MouseEvent<HTMLElement, MouseEvent>
                                  ) => {
                                    e.stopPropagation();
                                    onEdit(item);
                                  }}
                                >
                                  Редактировать
                                </Button>,
                                <Button
                                  size="small"
                                  onClick={(
                                    e: React.MouseEvent<HTMLElement, MouseEvent>
                                  ) => {
                                    e.stopPropagation();
                                    onRemove(item.id);
                                  }}
                                  danger
                                >
                                  Удалить
                                </Button>,
                              ]
                        }
                      >
                        <List.Item.Meta
                          description={
                            <>
                              {categoryInEditProcess === item.id ? (
                                <Text>Сохранение...</Text>
                              ) : (
                                <>
                                  <CategoryEditableField
                                    editMode={editableCategory?.id === item.id}
                                    value={item.name}
                                    currentValue={editableCategory?.name}
                                    onChange={onCategoryNameChange}
                                  />
                                  {editableCategory?.id === item.id && (
                                    <SelectParentCategory
                                      mainCategories={mainCategories}
                                      handleChangeParentId={
                                        handleChangeParentId
                                      }
                                      item={item}
                                    />
                                  )}
                                </>
                              )}
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Panel>
            );
          })}
        </Collapse>
      ) : (
        <Empty description="Данных нет" />
      )}
    </Content>
  );
};

export default CategoriesPage;
