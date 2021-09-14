import { Card, Divider, TreeSelect, Image } from "antd";
import { DataNode } from "antd/lib/tree";
import React from "react";
import { Control, FieldError } from "react-hook-form";
import { UploadFileForm } from "../../../components";
import { DescriptionOrderFormData } from "../../../types";
import OrderEditableField from "./OrderEditableField";

const { SHOW_ALL } = TreeSelect;

type OrderInfoBodyPropsType = {
  selectedCategories: number[];
  handleSelectCategories: (value: number[]) => void;
  editMode: boolean;
  images: string[];
  control: Control<DescriptionOrderFormData, object>;
  categoriesTree?: DataNode[];
  defaultValue?: string;
  error?: FieldError;
};

const OrderInfoBody: React.FC<OrderInfoBodyPropsType> = ({
  categoriesTree,
  selectedCategories,
  handleSelectCategories,
  editMode,
  defaultValue,
  error,
  images,
  control,
}) => {
  return (
    <div className="order__body">
      <Card>
        <Divider>Описание</Divider>
        <OrderEditableField
          defaultValue={defaultValue}
          editMode={editMode}
          control={control}
          error={error}
          fieldName="description"
          placeholder="Описание"
          isTextArea
        />
        <Divider>Категории</Divider>
        {categoriesTree && (
          <TreeSelect
            treeData={categoriesTree}
            value={selectedCategories}
            onChange={handleSelectCategories}
            treeCheckable={true}
            showCheckedStrategy={SHOW_ALL}
            placeholder={editMode ? "Выберите категории заявки" : "Категории"}
            style={{ width: "100%", marginBottom: 10 }}
            // maxTagCount={5}
            disabled={!editMode}
          />
        )}
        <Divider>Фото</Divider>
        {editMode ? <UploadFileForm /> : <OrderImagesList images={images} />}
      </Card>
    </div>
  );
};

type OrderImagesListPropsType = {
  images: string[];
};

const OrderImagesList: React.FC<OrderImagesListPropsType> = React.memo(
  ({ images }) => {
    return (
      <div className="order__images">
        {images &&
          images.map((img, index) => (
            <Image key={index} width={200} src={img} className="order__image" />
          ))}
      </div>
    );
  }
);

export default React.memo(OrderInfoBody);
