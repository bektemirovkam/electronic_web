import { Button } from "antd";
import React from "react";
import { CategoryType } from "../../../types";

type CategoryActionsPropsType = {
  editMode: boolean;
  disabledBtn: boolean;
  onSave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onEdit: (category: CategoryType) => void;
  category: CategoryType;
  onRemove: (id: number) => void;
};

const CategoryActions: React.FC<CategoryActionsPropsType> = ({
  editMode,
  disabledBtn,
  onSave,
  onEdit,
  category,
  onRemove,
}) => {
  return (
    <div className="categories__actions">
      {editMode ? (
        <Button onClick={onSave} disabled={disabledBtn}>
          Сохранить
        </Button>
      ) : (
        <>
          <Button
            className="categories__btn"
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              e.stopPropagation();
              onEdit(category);
            }}
          >
            Редактировать
          </Button>
          <Button
            className="categories__btn"
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              e.stopPropagation();
              onRemove(category.id);
            }}
            danger
          >
            Удалить
          </Button>
        </>
      )}
    </div>
  );
};

export default CategoryActions;
