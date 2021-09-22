import { Card, Divider, TreeSelect } from "antd";
import { DataNode } from "antd/lib/tree";
import React from "react";
import { Control, FieldError } from "react-hook-form";

import { ImagesList, UploadFileForm } from "../../../components";
import { AttachmentOutType } from "../../../models/Attachments";
import { DescriptionOrderFormData } from "../../../models/Orders";
import OrderEditableField from "./OrderEditableField";

const { SHOW_ALL } = TreeSelect;

type OrderInfoBodyPropsType = {
  handleRemoveImage: (imageId: number) => void;
  handleSelectCategories: (value: number[]) => void;
  handleAddImage: (e: Event) => void;
  selectedCategories: number[];
  editMode: boolean;
  imageUploading: boolean;
  images: AttachmentOutType[];
  control: Control<DescriptionOrderFormData, object>;
  categoriesTree?: DataNode[];
  defaultValue?: string;
  error?: FieldError;
};

const OrderInfoBody: React.FC<OrderInfoBodyPropsType> = ({
  categoriesTree,
  selectedCategories,
  handleSelectCategories,
  handleRemoveImage,
  handleAddImage,
  editMode,
  defaultValue,
  error,
  images,
  control,
  imageUploading,
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
            disabled={!editMode}
          />
        )}
        <Divider>Фото</Divider>
        <div className="order__images">
          <ImagesList
            removeImage={handleRemoveImage}
            images={images}
            editMode={editMode}
          />
          {editMode && (
            <UploadFileForm
              onChange={handleAddImage}
              isUploading={imageUploading}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default React.memo(OrderInfoBody);
