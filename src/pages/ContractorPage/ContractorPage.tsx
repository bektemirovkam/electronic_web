import React from "react";
import {
  Layout,
  PageHeader,
  Button,
  Card,
  RadioChangeEvent,
  message,
} from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ActionStatusEnum } from "../../models/types";
import { customerSchema, supplierSchema } from "../../utils/validatorsSchemes";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppAlert, AppMap, AppPreloader } from "../../components";

import { getCategoriesTreeDataState } from "../../store/selectors/categories";
import {
  getContractorImagesState,
  getContractorImageUploadingState,
  getContractorsActionStatusState,
  getContractorsErrorMessage,
  getContractorsLoadingState,
  getCurrentContractorState,
} from "../../store/selectors/contractors";
import {
  addContractorImage,
  contractorActions,
  deleteContractor,
  getContractorById,
  removeContractorImage,
  updateContractor,
} from "../../store/actions/contractors";
import {
  ContractorDescription,
  ContractorEditableField,
  ContractorInfoBody,
} from "./components";
import { AttachmentType } from "../../models/Attachments";
import getBase64 from "../../utils/getBase64";
import {
  AddContractorFormDataType,
  ContractorTypesEnum,
  CoordinatesType,
  CustomerDescrFormDataType,
  SupplierDescrFormDataType,
} from "../../models/Contractors";

const { Content } = Layout;

const ContractorPage = () => {
  const [editMode, setEditMode] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    []
  );
  const [latLng, setLatLng] = React.useState<CoordinatesType | null>(null);
  const [registeringType, setRegisteringType] =
    React.useState<ContractorTypesEnum>(ContractorTypesEnum.SUPPLIER);
  const [showMap, setShowMap] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierDescrFormDataType | CustomerDescrFormDataType>({
    resolver: yupResolver(
      registeringType === ContractorTypesEnum.SUPPLIER
        ? supplierSchema
        : customerSchema
    ),
  });

  const contractor = useSelector(getCurrentContractorState);
  const contractorActionStatus = useSelector(getContractorsActionStatusState);
  const contractorError = useSelector(getContractorsErrorMessage);
  const contractorLoadingState = useSelector(getContractorsLoadingState);

  const contractorImages = useSelector(getContractorImagesState);
  const contractorImageUploading = useSelector(
    getContractorImageUploadingState
  );

  const categoriesTree = useSelector(getCategoriesTreeDataState);

  const { contractorId }: { contractorId?: string } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const clearState = React.useCallback(() => {
    dispatch(
      contractorActions.setContractorsActionstatus(ActionStatusEnum.NEVER)
    );
    dispatch(contractorActions.setCurrentContractor(null));
    dispatch(contractorActions.clearContractorImages());
  }, [dispatch]);

  const toggleEditMode = React.useCallback(() => {
    setEditMode((prev) => {
      dispatch(
        contractorActions.setContractorsActionstatus(ActionStatusEnum.NEVER)
      );
      return !prev;
    });
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getContractorById(Number(contractorId)));
    return () => {
      clearState();
    };
  }, [clearState, dispatch, contractorId]);

  React.useEffect(() => {
    if (contractor) {
      setSelectedCategories(
        contractor.categories?.map((category) => category.categoryId)
      );
      setRegisteringType(contractor.contractorType);
      setLatLng({
        coordinatesLatitude: contractor.coordinates.coordinatesLatitude,
        coordinatesLongitude: contractor.coordinates.coordinatesLongitude,
      });
      dispatch(contractorActions.setContractorImages(contractor.attachments));
    }
  }, [contractor, dispatch]);

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
      setEditMode(false);
      dispatch(updateContractor(newContractor, contractor.id));
    }
  });

  const goBack = () => window.history.back();

  const handleSelectCategories = React.useCallback((value: number[]) => {
    setSelectedCategories(value);
  }, []);

  const handleDeleteContractor = React.useCallback(() => {
    const answer = window.confirm("Вы уверены что хотите удалить контрагента?");
    if (answer && contractor) {
      dispatch(deleteContractor(contractor.id));
    }
  }, [contractor, dispatch]);

  const handleSelectRegType = React.useCallback((e: RadioChangeEvent) => {
    setRegisteringType(e.target.value);
  }, []);

  const handleCancelEdit = React.useCallback(() => {
    toggleEditMode();
    if (contractor) {
      setSelectedCategories(
        contractor.categories?.map((category) => category.categoryId)
      );
      dispatch(contractorActions.clearContractorImages());
      dispatch(contractorActions.setContractorImages(contractor.attachments));
    }
  }, [contractor, dispatch, toggleEditMode]);

  const toggleShowMap = React.useCallback(() => {
    setShowMap(!showMap);
  }, [showMap]);

  const handleSelectCoords = React.useCallback(
    (latLng: google.maps.LatLng | null) => {
      if (editMode) {
        setLatLng({
          coordinatesLatitude: String(latLng?.lat()),
          coordinatesLongitude: String(latLng?.lng()),
        });
      }
    },
    [editMode]
  );

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

  const handleRemoveImage = (imageId: number) => {
    if (contractor) {
      dispatch(removeContractorImage(contractor.id, imageId));
    }
  };

  const checkDisabledBtn = React.useCallback(() => {
    if (registeringType === ContractorTypesEnum.SUPPLIER) {
      return (
        Object.keys(errors).length !== 0 || selectedCategories.length === 0
      );
    }
    return Object.keys(errors).length !== 0;
  }, [errors, registeringType, selectedCategories.length]);

  const getEditActionsButtons = () => {
    return [
      <Button key="1" onClick={onSubmit} disabled={checkDisabledBtn()}>
        Сохранить
      </Button>,
      <Button key="2" onClick={handleCancelEdit} danger>
        Отменить
      </Button>,
    ];
  };

  const getActionsButtons = () => {
    return [
      <Button key="3" onClick={toggleEditMode}>
        Редактировать
      </Button>,
      <Button key="5" onClick={handleDeleteContractor} danger>
        Удалить
      </Button>,
    ];
  };

  const editActionsButtons = React.useMemo(getEditActionsButtons, [
    checkDisabledBtn,
    handleCancelEdit,
    onSubmit,
  ]);
  const actionButtons = React.useMemo(getActionsButtons, [
    handleDeleteContractor,
    toggleEditMode,
  ]);

  if (showMap) {
    return (
      <Content className="content">
        <div className="map__header">
          <Button className="map-btn" type="default" onClick={toggleShowMap}>
            Назад
          </Button>
          {latLng && editMode && (
            <Button onClick={toggleShowMap}>Сохранить</Button>
          )}
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
              extra={editMode ? editActionsButtons : actionButtons}
            >
              <ContractorDescription
                editMode={editMode}
                handleSelectRegType={handleSelectRegType}
                registeringType={registeringType}
                contractor={contractor}
                control={control}
                errors={errors}
                toggleShowMap={toggleShowMap}
              />
            </PageHeader>
          </div>
          <ContractorInfoBody
            defaultValue={contractor.description}
            editMode={editMode}
            control={control}
            //@ts-ignore
            error={errors.description}
            categoriesTree={categoriesTree}
            selectedCategories={selectedCategories}
            handleSelectCategories={handleSelectCategories}
            images={contractorImages}
            registeringType={registeringType}
            handleRemoveImage={handleRemoveImage}
            handleAddImage={handleUploadImage}
            imageUploading={contractorImageUploading}
          />
        </>
      )}
    </Content>
  );
};

export default ContractorPage;