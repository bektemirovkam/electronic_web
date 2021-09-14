import React from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Radio,
  Layout,
  Typography,
  TreeSelect,
  RadioChangeEvent,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import {
  AppAlert,
  AppMap,
  AppPreloader,
  UploadFileForm,
} from "../../components";
import {
  ActionStatusEnum,
  AddContractorFormDataType,
  ContractorStatusEnum,
  ContractorTypesEnum,
  CoordinatesType,
  SupplierDescrFormDataType,
} from "../../types";
import { supplierSchema } from "../../utils/validatorsSchemes";
import {
  getCategoriesActionStatusState,
  getCategoriesErrorMessageState,
  getCategoriesTreeDataState,
} from "../../store/selectors/categories";
import { categoriesActions } from "../../store/actions/categories";
import { useHistory } from "react-router-dom";
import {
  contractorActions,
  createContractorProfile,
} from "../../store/actions/contractors";
import {
  getContractorsActionStatusState,
  getContractorsErrorMessage,
  getContractorsLoadingState,
  getCurrentContractorState,
} from "../../store/selectors/contractors";
import { ContractorDescrForm } from "./components";

const { Content } = Layout;
const { Title } = Typography;
const { SHOW_ALL } = TreeSelect;

const ContractorCreatePage = () => {
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
  const [registeringType, setRegisteringType] =
    React.useState<ContractorTypesEnum>(ContractorTypesEnum.SUPPLIER);
  const [showMap, setShowMap] = React.useState(false);
  const [latLng, setLatLng] = React.useState<CoordinatesType | null>(null);

  const contractorActionStatus = useSelector(getContractorsActionStatusState);
  const contractorError = useSelector(getContractorsErrorMessage);
  const contractorLoading = useSelector(getContractorsLoadingState);
  const currentContractor = useSelector(getCurrentContractorState);

  const categoriesTree = useSelector(getCategoriesTreeDataState);
  const categoriesError = useSelector(getCategoriesErrorMessageState);
  const categoriesActionStatus = useSelector(getCategoriesActionStatusState);

  const dispatch = useDispatch();
  const history = useHistory();

  const clearContractorsState = React.useCallback(() => {
    dispatch(
      contractorActions.setContractorsActionstatus(ActionStatusEnum.NEVER)
    );
    dispatch(contractorActions.setContractorsErrorMessage(null));
  }, [dispatch]);

  const clearCategoriesState = React.useCallback(() => {
    dispatch(
      categoriesActions.setCategoriesActionStatus(ActionStatusEnum.NEVER)
    );
    dispatch(categoriesActions.setCategoriesErrorMessage(null));
  }, [dispatch]);

  React.useEffect(() => {
    return () => {
      clearContractorsState();
      clearCategoriesState();
    };
  }, [clearCategoriesState, clearContractorsState]);

  React.useEffect(() => {
    if (
      currentContractor &&
      contractorActionStatus === ActionStatusEnum.SUCCESS
    ) {
      history.push(`/contractors/${currentContractor.id}`);
    }
  }, [currentContractor, history, contractorActionStatus]);

  const handleSelectCategories = (value: number[]) => {
    setSelectedCategories(value);
  };

  const onSubmit = handleSubmit((formData) => {
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
    dispatch(
      createContractorProfile(newContractor as AddContractorFormDataType)
    );
  });

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

  if (contractorLoading) {
    return <AppPreloader />;
  }

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

  return (
    <Content className="content">
      <AppAlert
        onClose={clearContractorsState}
        errorMessage={contractorError}
        successMessage={"Контрагент сохранен"}
        status={contractorActionStatus}
      />
      <AppAlert
        onClose={clearCategoriesState}
        errorMessage={categoriesError}
        status={categoriesActionStatus}
      />
      <Card className="form">
        <Title level={3} className="title">
          Создание контрагента
        </Title>
        <ContractorDescrForm control={control} errors={errors} />
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

        <Radio.Group
          onChange={handleSelectRegType}
          value={registeringType}
          className="radio-group"
        >
          <Radio value={ContractorTypesEnum.SUPPLIER}>Поставщик</Radio>
          <Radio value={ContractorTypesEnum.CUSTOMER}>Заказчик</Radio>
        </Radio.Group>
        <Button
          className="map-btn"
          type="default"
          onClick={toggleShowMap}
          block
        >
          {latLng ? "Изменить координаты" : "Отметить на карте"}
        </Button>
        <UploadFileForm />
        <Button
          className="order__save-btn"
          onClick={onSubmit}
          disabled={Object.keys(errors).length > 0}
        >
          Сохранить
        </Button>
      </Card>
    </Content>
  );
};

export default ContractorCreatePage;
