import { Button, Descriptions, Radio, RadioChangeEvent } from "antd";
import React from "react";
import { Control, FieldError } from "react-hook-form";
import { NavLink } from "react-router-dom";
import {
  ContractorType,
  ContractorTypesEnum,
  CustomerDescrFormDataType,
  SupplierDescrFormDataType,
} from "../../../models/Contractors";
import ContractorEditableField from "./ContractorEditableField";

type ContractorDescriptionPropsType = {
  editMode: boolean;
  handleSelectRegType: (e: RadioChangeEvent) => void;
  toggleShowMap: () => void;
  registeringType: ContractorTypesEnum;
  contractor: ContractorType;
  control: Control<
    SupplierDescrFormDataType | CustomerDescrFormDataType,
    object
  >;
  errors:
    | {
        name?: FieldError;
        phoneNumber?: FieldError;
        contactName?: FieldError;
        location?: FieldError;
        webSite?: FieldError;
        eMail?: FieldError;
        address?: FieldError;
        description?: FieldError;
      }
    | {
        name?: FieldError;
        phoneNumber?: FieldError;
        contactName?: FieldError;
        location?: FieldError;
      };
};
//TODO: сделать фильтр для заявок конкретного контрагента

const ContractorDescription: React.FC<ContractorDescriptionPropsType> = ({
  editMode,
  handleSelectRegType,
  registeringType,
  contractor,
  control,
  errors,
  toggleShowMap,
}) => {
  return (
    <>
      <Descriptions size="small" column={4}>
        <Descriptions.Item label="Тип контрагента">
          {editMode ? (
            <Radio.Group onChange={handleSelectRegType} value={registeringType}>
              <Radio value={ContractorTypesEnum.SUPPLIER}>Поставщик</Radio>
              <Radio value={ContractorTypesEnum.CUSTOMER}>Заказчик</Radio>
            </Radio.Group>
          ) : contractor.contractorType === ContractorTypesEnum.CUSTOMER ? (
            "Заказчик"
          ) : (
            "Поставщик"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Заявки контрагента">
          <NavLink to="/orders">Посмотреть</NavLink>
        </Descriptions.Item>
        <Descriptions.Item label="Контактное лицо">
          <ContractorEditableField
            defaultValue={contractor.contactName}
            editMode={editMode}
            control={control}
            error={errors.contactName}
            fieldName="contactName"
            placeholder="Контактное лицо"
          />
        </Descriptions.Item>

        <Descriptions.Item label="Город">
          <ContractorEditableField
            defaultValue={contractor.location}
            editMode={editMode}
            control={control}
            error={errors.location}
            fieldName="location"
            placeholder="Город"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Координаты">
          <Button size="small" type="link" onClick={toggleShowMap}>
            Посмотреть на карте
          </Button>
        </Descriptions.Item>

        <Descriptions.Item label="Сайт">
          <ContractorEditableField
            defaultValue={contractor.contacts.webSite}
            editMode={editMode}
            control={control}
            //@ts-ignore
            error={errors.webSite}
            fieldName="webSite"
            placeholder="Сайт"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Почта">
          <ContractorEditableField
            defaultValue={contractor.contacts.eMail}
            editMode={editMode}
            control={control}
            //@ts-ignore
            error={errors.eMail}
            fieldName="eMail"
            placeholder="Почта"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Адрес">
          <ContractorEditableField
            defaultValue={contractor.contacts.address}
            editMode={editMode}
            control={control}
            //@ts-ignore
            error={errors.address}
            fieldName="address"
            placeholder="Адрес"
          />
        </Descriptions.Item>

        <Descriptions.Item label="Телефон">
          <ContractorEditableField
            defaultValue={`+${contractor.phoneNumber}`}
            editMode={editMode}
            control={control}
            error={errors.phoneNumber}
            fieldName="phoneNumber"
            placeholder="Телефон"
            maxLength={12}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Идентификатор контрагента">
          {contractor.id}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default React.memo(ContractorDescription);
