import { Card, Divider, TreeSelect, Image } from "antd";
import { DataNode } from "antd/lib/tree";
import React from "react";
import { Control, FieldError } from "react-hook-form";
import { UploadFileForm } from "../../../components";
import { SupplierDescrFormDataType } from "../../../types";
import ContractorEditableField from "./ContractorEditableField";

type ContractorInfoBodyPropsType = {
  defaultValue: string;
  editMode: boolean;
  control: Control<SupplierDescrFormDataType, object>;
  error?: FieldError;
  categoriesTree: DataNode[];
  selectedCategories: number[];
  handleSelectCategories: (value: number[]) => void;
  images: string[];
};

const { SHOW_ALL } = TreeSelect;

const ContractorInfoBody: React.FC<ContractorInfoBodyPropsType> = ({
  defaultValue,
  editMode,
  control,
  error,
  categoriesTree,
  selectedCategories,
  handleSelectCategories,
  images,
}) => {
  return (
    <div className="contractor__body">
      <Card>
        <Divider>Описание</Divider>
        <ContractorEditableField
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
            placeholder={
              editMode ? "Выберите категории контрагента" : "Категории"
            }
            style={{ width: "100%", marginBottom: 10 }}
            // maxTagCount={5}
            disabled={!editMode}
          />
        )}
        <Divider>Фото</Divider>
        {editMode ? (
          <UploadFileForm />
        ) : (
          <ContractorImageList images={images} />
        )}
      </Card>
    </div>
  );
};

type ContractorImageListPropsType = {
  images: string[];
};

const ContractorImageList: React.FC<ContractorImageListPropsType> = React.memo(
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

export default React.memo(ContractorInfoBody);
