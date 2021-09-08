import React, { ChangeEvent } from "react";
import {
  Layout,
  Typography,
  Empty,
  Collapse,
  Button,
  List,
  Select,
  Alert,
} from "antd";
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
import { AppPreloader } from "../../components";
import { useLocation } from "react-router-dom";
import {
  ActionStatusEnum,
  CategoryQueryFilterType,
  CategoryType,
} from "../../types";
import { CategoryEditableField } from "./components";

const { Content } = Layout;
const { Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

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

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

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

  const clearState = () => {
    dispatch(
      categoriesActions.setCategoriesActionStatus(ActionStatusEnum.NEVER)
    );
  };

  if (categoriesLoading) {
    return <AppPreloader size="large" />;
  }

  return (
    <Content className="content">
      {categoriesActionStatus !== ActionStatusEnum.NEVER && (
        <Alert
          message={
            categoriesActionStatus === ActionStatusEnum.ERROR
              ? categoriesError
              : "Изменения сохранены"
          }
          type={
            categoriesActionStatus === ActionStatusEnum.ERROR
              ? "error"
              : "success"
          }
          closable
          onClose={clearState}
        />
      )}
      <Alert
        message={"Ошибка сети, попробуйте еще раз"}
        type={"error"}
        closable
        onClose={clearState}
      />
      {categoriesError && (
        <div className="error">
          <Text type="danger">{categoriesError}</Text>
        </div>
      )}
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
                  <div className="categories__actions">
                    {editableCategory?.id === mainCat.id ? (
                      <Button
                        onClick={onSave}
                        disabled={editableCategory?.name.length === 0}
                      >
                        Сохранить
                      </Button>
                    ) : (
                      <>
                        <Button
                          className="categories__btn"
                          onClick={(
                            e: React.MouseEvent<HTMLElement, MouseEvent>
                          ) => {
                            e.stopPropagation();
                            onEdit(mainCat);
                          }}
                        >
                          Редактировать
                        </Button>
                        <Button
                          className="categories__btn"
                          onClick={(
                            e: React.MouseEvent<HTMLElement, MouseEvent>
                          ) => {
                            e.stopPropagation();
                            onRemove(mainCat.id);
                          }}
                          danger
                        >
                          Удалить
                        </Button>
                      </>
                    )}
                  </div>
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
                                    <div className="categories__select-wrapper">
                                      <Text className="categories__select-title">
                                        Выберите родительскую категорию
                                      </Text>
                                      <Select
                                        defaultValue={item.id}
                                        onChange={handleChangeParentId}
                                        className="categories__select"
                                      >
                                        {mainCategories &&
                                          mainCategories.map((mainCat) => {
                                            return (
                                              <Option
                                                value={mainCat.id}
                                                key={mainCat.id}
                                              >
                                                {mainCat.name}
                                              </Option>
                                            );
                                          })}
                                      </Select>
                                    </div>
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
