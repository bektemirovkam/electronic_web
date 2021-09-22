import { Button, Card, Empty, List, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppAlert } from "../../components";
import {
  categoriesActions,
  updateCategoryById,
} from "../../store/actions/categories";
import {
  getCategoriesActionStatusState,
  getCategoriesErrorMessageState,
  getCategoryInProcessEditState,
  getDeletedCategoriesState,
} from "../../store/selectors/categories";
import { ActionStatusEnum } from "../../models/types";
import { CategoryType } from "../../models/Categories";

const { Text } = Typography;

const DeletedCategoriesPage = () => {
  const deletedCategories = useSelector(getDeletedCategoriesState);
  const categoriesError = useSelector(getCategoriesErrorMessageState);
  const categoriesActionStatus = useSelector(getCategoriesActionStatusState);
  const categoryInEditProcess = useSelector(getCategoryInProcessEditState);

  const dispatch = useDispatch();

  const clearState = React.useCallback(() => {
    dispatch(
      categoriesActions.setCategoriesActionStatus(ActionStatusEnum.NEVER)
    );
    dispatch(categoriesActions.setCategoriesErrorMessage(null));
  }, [dispatch]);

  const onRestore = (category: CategoryType) => {
    const answer = window.confirm("Восстановить выбранную категорию?");
    if (answer) {
      const updateCategory = { ...category, isDeleted: false };
      dispatch(updateCategoryById(updateCategory));
    }
  };

  return (
    <Content className="content">
      <AppAlert
        onClose={clearState}
        errorMessage={categoriesError}
        successMessage={"Изменения сохранены"}
        status={categoriesActionStatus}
      />
      {deletedCategories && deletedCategories.length === 0 ? (
        <Empty />
      ) : (
        <Card>
          <List
            dataSource={deletedCategories}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button onClick={() => onRestore(item)}>Восстановить</Button>,
                ]}
              >
                <List.Item.Meta
                  description={
                    categoryInEditProcess === item.id ? (
                      <Text>Сохранение...</Text>
                    ) : (
                      <Text>{item.name}</Text>
                    )
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      )}
    </Content>
  );
};

export default DeletedCategoriesPage;
