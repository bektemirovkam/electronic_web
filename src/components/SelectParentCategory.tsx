import { Select, Typography } from "antd";
import React from "react";
import classNames from "classnames";
import { CategoryType } from "../models/Categories";

const { Option } = Select;
const { Text } = Typography;

type SelectParentCategoryPropsType = {
  mainCategories: CategoryType[] | null;
  handleChangeParentId: (id: number) => void;
  item?: CategoryType;
  error?: string;
};

const SelectParentCategory: React.FC<SelectParentCategoryPropsType> = ({
  mainCategories,
  handleChangeParentId,
  item,
  error,
}) => {
  return (
    <div
      className={classNames("categories__select-wrapper", {
        "categories__select-error": error,
      })}
    >
      <Text className="subtitle">Выберите родительскую категорию</Text>
      <Select
        defaultValue={item ? item.parentId : 0}
        onChange={handleChangeParentId}
        className="categories__select"
      >
        {mainCategories &&
          [{ id: 0, name: "ОСНОВНАЯ КАТЕГОРИЯ" }, ...mainCategories].map(
            (mainCat) => {
              return (
                <Option value={mainCat.id} key={mainCat.id}>
                  {mainCat.name}
                </Option>
              );
            }
          )}
      </Select>
      <Text className="error-text">{error}</Text>
    </div>
  );
};

export default SelectParentCategory;
