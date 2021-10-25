import { Card, Divider, TreeSelect, Image } from "antd";
import { DataNode } from "antd/lib/tree";
import React from "react";
import { Control, FieldError } from "react-hook-form";
import { baseURL } from "../../../api/axios";
import { ImagesList, UploadFileForm } from "../../../components";
import { AttachmentOutType } from "../../../models/Attachments";
import {
  ContractorTypesEnum,
  CustomerDescrFormDataType,
  SupplierDescrFormDataType,
} from "../../../models/Contractors";

import ContractorEditableField from "./ContractorEditableField";

type ContractorInfoBodyPropsType = {
  defaultValue: string;
  editMode: boolean;
  control: Control<
    SupplierDescrFormDataType | CustomerDescrFormDataType,
    object
  >;
  error?: FieldError;
  categoriesTree: DataNode[];
  selectedCategories: number[];
  handleSelectCategories: (value: number[]) => void;
  handleRemoveImage: (imageId: number) => void;
  handleAddImage: (e: Event) => void;
  imageUploading: boolean;
  images: AttachmentOutType[];
  registeringType: ContractorTypesEnum;
  avatar?: AttachmentOutType;
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
  handleRemoveImage,
  handleAddImage,
  imageUploading,
  images,
  registeringType,
  avatar,
}) => {
  return (
    <div className="contractor__body">
      <Card>
        {registeringType === ContractorTypesEnum.SUPPLIER && (
          <>
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
          </>
        )}
        {avatar && (
          <>
            <Divider>Аватар</Divider>
            <div className="avatar">
              <Image
                src={`${baseURL}${avatar.attachmentLink}`}
                className="avatar__image"
              />
            </div>
          </>
        )}
        <Divider>Фото</Divider>
        <div className="contractor__images">
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

export default React.memo(ContractorInfoBody);
