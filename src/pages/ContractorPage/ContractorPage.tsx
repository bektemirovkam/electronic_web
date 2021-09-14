import React from "react";
import {
  Layout,
  PageHeader,
  Button,
  Descriptions,
  Divider,
  Card,
  TreeSelect,
  RadioChangeEvent,
  Radio,
} from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ActionStatusEnum,
  AddContractorFormDataType,
  ContractorStatusEnum,
  ContractorTypesEnum,
  CoordinatesType,
  SupplierDescrFormDataType,
} from "../../types";
import { supplierSchema } from "../../utils/validatorsSchemes";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppAlert, AppMap, AppPreloader } from "../../components";

import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
import img5 from "../../assets/images/5.jpg";
import { getCategoriesTreeDataState } from "../../store/selectors/categories";
import {
  getContractorsActionStatusState,
  getContractorsErrorMessage,
  getContractorsLoadingState,
  getCurrentContractorState,
} from "../../store/selectors/contractors";
import {
  contractorActions,
  deleteContractor,
  getFullContractorInfo,
  updateContractor,
} from "../../store/actions/contractors";
import { ContractorEditableField, ContractorInfoBody } from "./components";

const images = [img1, img2, img3, img4, img5];

const { Content } = Layout;

const ContractorPage = () => {
  const [editMode, setEditMode] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierDescrFormDataType>({
    resolver: yupResolver(supplierSchema),
  });
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    []
  );
  // const [latLng, setLatLng] = React.useState<google.maps.LatLng | null>(null);
  const [latLng, setLatLng] = React.useState<CoordinatesType | null>(null);
  const [registeringType, setRegisteringType] =
    React.useState<ContractorTypesEnum>(ContractorTypesEnum.SUPPLIER);
  const [showMap, setShowMap] = React.useState(false);

  const contractor = useSelector(getCurrentContractorState);
  const contractorActionStatus = useSelector(getContractorsActionStatusState);
  const contractorError = useSelector(getContractorsErrorMessage);
  const contractorLoadingState = useSelector(getContractorsLoadingState);

  const categoriesTree = useSelector(getCategoriesTreeDataState);

  const { id }: { id?: string } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const clearState = React.useCallback(() => {
    dispatch(
      contractorActions.setContractorsActionstatus(ActionStatusEnum.NEVER)
    );
    dispatch(contractorActions.setCurrentContractor(null));
  }, [dispatch]);

  const toggleEditMode = () => {
    setEditMode((prev) => {
      dispatch(
        contractorActions.setContractorsActionstatus(ActionStatusEnum.NEVER)
      );
      return !prev;
    });
  };

  React.useEffect(() => {
    dispatch(getFullContractorInfo(Number(id)));
    return () => {
      clearState();
    };
  }, [clearState, dispatch, id]);

  React.useEffect(() => {
    if (contractor) {
      setSelectedCategories(
        contractor.categories?.map((category) => category.categoryId)
      );
      setRegisteringType(contractor.contractorType);
    }
  }, [contractor]);

  React.useEffect(() => {
    // ВО ВРЕМЯ УДАЛЕНИЯ
    if (!contractor && contractorActionStatus === ActionStatusEnum.SUCCESS) {
      history.push("/contractors");
    }
  }, [history, contractor, contractorActionStatus]);

  const onSubmit = handleSubmit((formData) => {
    if (contractor) {
      const categories = selectedCategories.map((categoryId) => ({
        categoryId,
      }));

      const newContractor = {
        // id: userId,
        name: formData.name,
        contactName: formData.contactName,
        phoneNumber: `7${String(formData.phoneNumber).slice(-10)}`,
        description: formData.description,
        location: formData.location,
        coordinates: latLng
          ? latLng
          : {
              coordinatesLatitude: "",
              coordinatesLongitude: "",
            },
        contacts: {
          address: formData.address,
          webSite: formData.webSite,
          eMail: formData.eMail,
        },
        contractorType: registeringType,
        contractorStatus: ContractorStatusEnum.NEW, //TODO: мне указывать?
        categories,
        photos: [],
        rating: 0,
      };
      setEditMode(false);
      dispatch(
        updateContractor(
          newContractor as AddContractorFormDataType,
          contractor.id
        )
      );
    }
  });

  const goBack = () => window.history.back();

  const handleSelectCategories = React.useCallback((value: number[]) => {
    setSelectedCategories(value);
  }, []);

  const handleDeleteContractor = () => {
    const answer = window.confirm("Вы уверены что хотите удалить контрагента?");
    if (answer && contractor) {
      dispatch(deleteContractor(contractor.id));
    }
  };

  const handleSelectRegType = (e: RadioChangeEvent) => {
    setRegisteringType(e.target.value);
  };

  const toggleShowMap = () => {
    setShowMap(!showMap);
  };

  const handleSelectCoords = (latLng: google.maps.LatLng | null) => {
    setLatLng({
      coordinatesLatitude: String(latLng?.lat()),
      coordinatesLongitude: String(latLng?.lng()),
    });
  };

  const editActionsButtons = [
    <Button key="1" onClick={onSubmit}>
      Сохранить
    </Button>,
    <Button key="2" onClick={toggleEditMode} danger>
      Отменить
    </Button>,
  ];

  const actionsButtons = [
    <Button key="3" onClick={toggleEditMode}>
      Редактировать
    </Button>,
    <Button key="5" onClick={handleDeleteContractor} danger>
      Удалить
    </Button>,
  ];

  if (showMap) {
    return (
      <Content className="content">
        <div className="map__header">
          <Button className="map-btn" type="default" onClick={toggleShowMap}>
            Назад
          </Button>
          {latLng && <Button onClick={toggleShowMap}>Сохранить</Button>}
        </div>

        <AppMap
          containerElement={<Card className="map" />}
          mapElement={<div className="map-element" />}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCxdk4gpLGO1qZLBP8yN54kfA5wm35HWXQ&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<AppPreloader />}
          handleSelectCoords={handleSelectCoords}
          marker={latLng}
        />
      </Content>
    );
  }

  if (contractorLoadingState) {
    return <AppPreloader />;
  }

  return (
    <Content className="content">
      <AppAlert
        onClose={() =>
          dispatch(
            contractorActions.setContractorsActionstatus(ActionStatusEnum.NEVER)
          )
        }
        errorMessage={contractorError}
        status={contractorActionStatus}
        successMessage="Изменения успешно сохранены"
      />
      {contractor && (
        <>
          <div className="page-header">
            <PageHeader
              ghost={false}
              onBack={goBack}
              title={
                <ContractorEditableField
                  defaultValue={contractor.name}
                  editMode={editMode}
                  control={control}
                  error={errors.name}
                  fieldName="name"
                  placeholder="Название"
                />
              }
              extra={editMode ? editActionsButtons : actionsButtons}
            >
              <Descriptions size="small" column={4}>
                <Descriptions.Item label="Тип контрагента">
                  {editMode ? (
                    <Radio.Group
                      onChange={handleSelectRegType}
                      value={registeringType}
                    >
                      <Radio value={ContractorTypesEnum.SUPPLIER}>
                        Поставщик
                      </Radio>
                      <Radio value={ContractorTypesEnum.CUSTOMER}>
                        Заказчик
                      </Radio>
                    </Radio.Group>
                  ) : contractor.contractorType ===
                    ContractorTypesEnum.CUSTOMER ? (
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
                    error={errors.address}
                    fieldName="address"
                    placeholder="Адрес"
                  />
                </Descriptions.Item>

                <Descriptions.Item label="Телефон">
                  <ContractorEditableField
                    defaultValue={contractor.phoneNumber}
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
            </PageHeader>
          </div>
          <ContractorInfoBody
            defaultValue={contractor.description}
            editMode={editMode}
            control={control}
            error={errors.description}
            categoriesTree={categoriesTree}
            selectedCategories={selectedCategories}
            handleSelectCategories={handleSelectCategories}
            images={images}
          />
        </>
      )}
    </Content>
  );
};

export default ContractorPage;
