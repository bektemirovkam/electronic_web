import React from "react";
import {
  Button,
  Card,
  Radio,
  Layout,
  Typography,
  TreeSelect,
  RadioChangeEvent,
  message,
} from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import {
  AppAlert,
  AppMap,
  AppPreloader,
  ImagesList,
  UploadFileForm,
} from "../../components";
import { ActionStatusEnum } from "../../models/types";
import { customerSchema, supplierSchema } from "../../utils/validatorsSchemes";
import {
  getCategoriesActionStatusState,
  getCategoriesErrorMessageState,
  getCategoriesTreeDataState,
} from "../../store/selectors/categories";
import { categoriesActions } from "../../store/actions/categories";
import { useHistory } from "react-router-dom";
import {
  addContractorImage,
  contractorActions,
  createContractorProfile,
  removeNewContractorImage,
} from "../../store/actions/contractors";
import {
  getContractorImagesState,
  getContractorImageUploadingState,
  getContractorsActionStatusState,
  getContractorsErrorMessage,
  getContractorsLoadingState,
  getCurrentContractorState,
} from "../../store/selectors/contractors";
import { SupplierDescrForm } from "./components";
import CustomerDescrForm from "./components/CustomerDescrForm";
import getBase64 from "../../utils/getBase64";
import { AttachmentType } from "../../models/Attachments";
import {
  AddContractorFormDataType,
  ContractorTypesEnum,
  CoordinatesType,
  CustomerDescrFormDataType,
  SupplierDescrFormDataType,
} from "../../models/Contractors";

const { Content } = Layout;
const { Title } = Typography;
const { SHOW_ALL } = TreeSelect;

const ContractorCreatePage = () => {
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    []
  );
  const [registeringType, setRegisteringType] =
    React.useState<ContractorTypesEnum>(ContractorTypesEnum.SUPPLIER);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierDescrFormDataType | CustomerDescrFormDataType>({
    resolver: yupResolver(
      registeringType === ContractorTypesEnum.SUPPLIER
        ? supplierSchema
        : customerSchema
    ),
  });

  const [showMap, setShowMap] = React.useState(false);
  const [latLng, setLatLng] = React.useState<CoordinatesType | null>(null);

  const contractorActionStatus = useSelector(getContractorsActionStatusState);
  const contractorError = useSelector(getContractorsErrorMessage);
  const contractorLoading = useSelector(getContractorsLoadingState);
  const currentContractor = useSelector(getCurrentContractorState);

  const contractorImages = useSelector(getContractorImagesState);
  const contractorImageUploading = useSelector(
    getContractorImageUploadingState
  );

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
    dispatch(contractorActions.clearContractorImages());
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

    const newContractor: AddContractorFormDataType = {
      name: formData.name,
      contactName: formData.contactName,
      phoneNumber: `7${String(formData.phoneNumber).slice(-10)}`,
      //@ts-ignore
      description: formData.description ? formData.description : "",
      location: formData.location,
      coordinates: latLng
        ? latLng
        : {
            coordinatesLatitude: "",
            coordinatesLongitude: "",
          },
      contacts: {
        //@ts-ignore
        address: formData.address ? formData.address : "",
        //@ts-ignore
        webSite: formData.webSite ? formData.webSite : "",
        //@ts-ignore
        eMail: formData.eMail ? formData.eMail : "",
      },
      contractorType: registeringType,
      categories,
      attachments: contractorImages.map((image) => ({
        attachmentId: image.id,
      })),
    };
    dispatch(createContractorProfile(newContractor));
  });

  const handleSelectRegType = (e: RadioChangeEvent) => {
    reset();
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

  const handleRemoveImage = (imageId: number) => {
    dispatch(removeNewContractorImage(imageId));
  };

  const handleUploadImage = async (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg"
      ) {
        return message.error(`${file.name} не является картинкой`);
      } else {
        const base64 = await getBase64(file);
        const ext = file.name.split(".").pop();
        const name = file.name;

        if (base64 && ext && name) {
          const image: AttachmentType = {
            name: name,
            ext: ext,
            content: base64.split(",")[1],
          };
          dispatch(addContractorImage(image));
        }
      }
    }
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
        {registeringType === ContractorTypesEnum.SUPPLIER ? (
          <SupplierDescrForm control={control} errors={errors} />
        ) : (
          <CustomerDescrForm control={control} errors={errors} />
        )}
        {registeringType === ContractorTypesEnum.SUPPLIER && (
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
        )}

        <Radio.Group
          onChange={handleSelectRegType}
          value={registeringType}
          className="radio-group"
        >
          <Radio value={ContractorTypesEnum.SUPPLIER}>Поставщик</Radio>
          <Radio value={ContractorTypesEnum.CUSTOMER}>Заказчик</Radio>
        </Radio.Group>
        {registeringType === ContractorTypesEnum.SUPPLIER && (
          <Button
            className="map-btn"
            type="default"
            onClick={toggleShowMap}
            block
          >
            {latLng ? "Изменить координаты" : "Отметить на карте"}
          </Button>
        )}
        <ImagesList
          removeImage={handleRemoveImage}
          images={contractorImages}
          editMode={true}
        />
        <UploadFileForm
          onChange={handleUploadImage}
          isUploading={contractorImageUploading}
        />
        <Button
          className="order__save-btn"
          onClick={onSubmit}
          disabled={
            Object.keys(errors).length > 0 ||
            (registeringType === ContractorTypesEnum.SUPPLIER &&
              selectedCategories.length === 0)
          }
        >
          Сохранить
        </Button>
      </Card>
    </Content>
  );
};

export default ContractorCreatePage;
