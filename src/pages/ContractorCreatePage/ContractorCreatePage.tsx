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

const { Content } = Layout;
const { Text, Title } = Typography;
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
  const [showMap, setShowMap] = React.useState(true);

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
      history.push(`/orders/${currentContractor.id}`);
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
      phoneNumber: formData.phoneNumber,
      description: formData.description,
      location: formData.location,
      coordinates: {
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

  if (contractorLoading) {
    return <AppPreloader />;
  }

  if (showMap) {
    return (
      //TODO:
      <Content className="content">
        <Card className="map">
          <AppMap
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYTvteh7lIL_Ao008Wzl7csu9tj1DVYN8&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={
              <div style={{ height: `100%` }}>
                <AppPreloader />
              </div>
            }
            // defaultZoom={8}
            // defaultCenter={{ lat: 49.666145509191345, lng: 68.12397343852452 }}
          />
        </Card>
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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.name ? "error" : "success"}
              help={errors.name?.message}
              className="input"
              required
            >
              <Text className="subtitle">Название организации</Text>
              <Input
                placeholder="Заголовок заявки"
                value={value}
                onChange={onChange}
              />
            </Form.Item>
          )}
          name="name"
          defaultValue=""
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.contactName ? "error" : "success"}
              help={errors.contactName?.message}
              className="input"
              required
            >
              <Text className="subtitle">Контактное лицо</Text>
              <Input
                placeholder="Контактное лицо"
                value={value}
                onChange={onChange}
              />
            </Form.Item>
          )}
          name="contactName"
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.location ? "error" : "success"}
              help={errors.location?.message}
              className="input"
              required
            >
              <Text className="subtitle">Город</Text>
              <Input placeholder="Город" value={value} onChange={onChange} />
            </Form.Item>
          )}
          name="location"
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.address ? "error" : "success"}
              help={errors.address?.message}
              className="input"
              required
            >
              <Text className="subtitle">Адрес</Text>
              <Input placeholder="Адрес" value={value} onChange={onChange} />
            </Form.Item>
          )}
          name="address"
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.eMail ? "error" : "success"}
              help={errors.eMail?.message}
              className="input"
              required
            >
              <Text className="subtitle">Почта</Text>
              <Input placeholder="Почта" value={value} onChange={onChange} />
            </Form.Item>
          )}
          name="eMail"
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.webSite ? "error" : "success"}
              help={errors.webSite?.message}
              className="input"
              required
            >
              <Text className="subtitle">Сайт компании</Text>
              <Input
                placeholder="Сайт компании"
                value={value}
                onChange={onChange}
              />
            </Form.Item>
          )}
          name="webSite"
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.phoneNumber ? "error" : "success"}
              help={errors.phoneNumber?.message}
              className="input"
              required
            >
              <Text className="subtitle">Номер телефона</Text>
              <Input
                placeholder="Номер телефона"
                value={value}
                onChange={onChange}
                maxLength={12}
              />
            </Form.Item>
          )}
          name="phoneNumber"
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.description ? "error" : "success"}
              help={errors.description?.message}
              className="input order__descr-input"
              required
            >
              <Text className="subtitle">Описание</Text>
              <Input.TextArea
                placeholder="Описание"
                value={value}
                onChange={onChange}
              />
            </Form.Item>
          )}
          name="description"
          defaultValue=""
        />
        <TreeSelect
          treeData={categoriesTree}
          value={selectedCategories}
          onChange={handleSelectCategories}
          treeCheckable={true}
          showCheckedStrategy={SHOW_ALL}
          placeholder={"Выберите категории заявки"}
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
        <Button className="map-btn" type="default" block>
          Отметить на карте
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
