import React, { ChangeEvent } from "react";
import { Layout, Typography, Empty, Collapse, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  getCategoriesErrorMessageState,
  getCategoriesLoadingState,
  getMainCategoriesState,
  getSubCategoriesState,
} from "../../store/selectors/categories";
import { getAllCategories } from "../../store/actions/categories";
import { AppPreloader } from "../../components";
import { useLocation } from "react-router-dom";
import { CategoryQueryFilterType, CategoryType } from "../../types";
import { CategoryEditableField } from "./components";

const { Content } = Layout;
const { Text } = Typography;
const { Panel } = Collapse;

const CategoriesPage = () => {
  const [editableCategory, setEditableCategory] =
    React.useState<CategoryType | null>(null);

  const dispatch = useDispatch();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const mainCategories = useSelector(
    getMainCategoriesState(query.get("filter") as CategoryQueryFilterType)
  );
  const subCategories = useSelector(
    getSubCategoriesState(query.get("filter") as CategoryQueryFilterType)
  );
  const isLoading = useSelector(getCategoriesLoadingState);
  const categoriesError = useSelector(getCategoriesErrorMessageState);

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const onRemove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const onEdit = (category: CategoryType) => {
    setEditableCategory(category);
  };

  const onSave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setEditableCategory(null);
    console.log(editableCategory);
  };

  const onCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableCategory((prev) => {
      if (prev) {
        return { ...prev, name: e.target.value };
      }
      return prev;
    });
  };

  if (isLoading) {
    return <AppPreloader />;
  }

  return (
    <Content className="content">
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
                    <CategoryEditableField
                      editMode={editableCategory?.id === mainCat.id}
                      value={mainCat.name}
                      currentValue={editableCategory?.name}
                      onChange={onCategoryNameChange}
                    />
                  </div>
                }
                key={mainCat.id}
                extra={
                  <div className="categories__actions">
                    {editableCategory?.id === mainCat.id ? (
                      <Button onClick={onSave}>Сохранить</Button>
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
                          onClick={onRemove}
                          danger
                        >
                          Удалить
                        </Button>
                      </>
                    )}
                  </div>
                }
              >
                {subCategories &&
                  subCategories
                    .filter((subCat) => subCat.parentId === mainCat.id)
                    .map((_subCat) => {
                      return <p key={_subCat.id}>{_subCat.name}</p>;
                    })}
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
