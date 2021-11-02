import { Card, Divider, TreeSelect, Image, Typography } from "antd";
import { DataNode } from "antd/lib/tree";
import React from "react";
import { Control, FieldError } from "react-hook-form";
import { baseURL } from "../../../api/axios";
import { ContactsForm, ImagesList, UploadFileForm } from "../../../components";
import { AttachmentOutType } from "../../../models/Attachments";
import {
  ContractorTypesEnum,
  CustomerDescrFormDataType,
  SupplierDescrFormDataType,
} from "../../../models/Contractors";
import { SaveContactsResponse } from "../../../models/types";

import ContractorEditableField from "./ContractorEditableField";

const { Text } = Typography;

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
  handleRemoveAvatar: (imageId: number) => void;
  handleAddImage: (e: Event) => void;
  handleAddAvatar: (e: Event) => void;
  imageUploading: boolean;
  images: AttachmentOutType[];
  registeringType: ContractorTypesEnum;
  avatars?: AttachmentOutType[];
  otherPhones: string[];
  avatarUploading: boolean;
  setOtherPhone: (values: SaveContactsResponse) => void;
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
  handleRemoveAvatar,
  imageUploading,
  images,
  registeringType,
  avatars,
  handleAddAvatar,
  avatarUploading,
  otherPhones,
  setOtherPhone,
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
        {avatars && (
          <>
            <Divider>Аватар</Divider>
            <div className="contractor__images">
              <ImagesList
                removeImage={handleRemoveAvatar}
                images={avatars}
                editMode={editMode}
              />
              {editMode && (
                <UploadFileForm
                  onChange={handleAddAvatar}
                  isUploading={avatarUploading}
                  buttonText="Аватар"
                />
              )}
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
              buttonText="Фото"
            />
          )}
        </div>
        <Divider>Контактные номера</Divider>
        {editMode ? (
          <ContactsForm
            onFinish={setOtherPhone}
            initialValues={{
              contacts: otherPhones.map((phone) => ({ phoneNumber: phone })),
            }}
          />
        ) : (
          otherPhones.map((phone, index) => (
            <div key={`${phone}_${index}`}>
              <Text>{phone}</Text>
            </div>
          ))
        )}
      </Card>
    </div>
  );
};

export default React.memo(ContractorInfoBody);
