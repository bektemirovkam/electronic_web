import { Button, TreeSelect } from "antd";
import { DataNode } from "antd/lib/tree";
import React from "react";
import { ContactsForm, UploadFileForm } from "../../../components";
import { CoordinatesType } from "../../../models/Contractors";
import { SaveContactsResponse } from "../../../models/types";

const { SHOW_ALL } = TreeSelect;

type SupplierSpecInfoPropsType = {
  categoriesTree: DataNode[];
  selectedCategories: number[];
  handleSelectCategories: (value: number[]) => void;
  toggleShowMap: () => void;
  latLng: CoordinatesType | null;
  handleUploadImage: (e: Event) => Promise<void>;
  contractorImageUploading: boolean;
  setOtherPhoneNumbers: React.Dispatch<React.SetStateAction<string[]>>;
};

const SupplierSpecInfo: React.FC<SupplierSpecInfoPropsType> = ({
  categoriesTree,
  selectedCategories,
  handleSelectCategories,
  toggleShowMap,
  latLng,
  handleUploadImage,
  contractorImageUploading,
  setOtherPhoneNumbers,
}) => {
  const onFinish = (values: SaveContactsResponse) => {
    const parsedPhones: string[] = values.contacts.map(
      (contact) => contact.phoneNumber
    );

    setOtherPhoneNumbers(parsedPhones);
  };

  return (
    <>
      <TreeSelect
        treeData={categoriesTree}
        value={selectedCategories}
        onChange={handleSelectCategories}
        treeCheckable={true}
        showCheckedStrategy={SHOW_ALL}
        placeholder={"Выберите категории контрагента"}
        style={{ width: "100%", marginBottom: 10 }}
        maxTagCount={5}
      />
      <Button className="map-btn" type="default" onClick={toggleShowMap} block>
        {latLng ? "Изменить координаты" : "Отметить на карте"}
      </Button>
      <UploadFileForm
        onChange={handleUploadImage}
        isUploading={contractorImageUploading}
        buttonText="Фото"
      />
      <ContactsForm onFinish={onFinish} />
    </>
  );
};

export default SupplierSpecInfo;
