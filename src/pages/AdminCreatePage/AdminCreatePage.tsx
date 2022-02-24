import React from "react";
import { Button, Card, Layout, Typography } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { AppAlert, AppPreloader } from "../../components";
import { adminSchema } from "../../utils/validatorsSchemes";

import { AdminFormDataType } from "../../models/Administrator";
import { AdminForm } from "./components";
import {
  getAdminActionStatusState,
  getAdminErrorMessageState,
  getAdminLoadingState,
} from "../../store/selectors/admin";
import { clearAdminState, createAdmin } from "../../store/actions/admin";

const { Content } = Layout;
const { Title } = Typography;

const AdminCreatePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminFormDataType>({
    resolver: yupResolver(adminSchema),
  });

  const adminLoading = useSelector(getAdminLoadingState);
  const adminErrorMessage = useSelector(getAdminErrorMessageState);
  const adminActionStatus = useSelector(getAdminActionStatusState);

  const dispatch = useDispatch();

  const onSubmit = handleSubmit((formData) => {
    dispatch(
      createAdmin({
        ...formData,
        phoneNumber: `7${String(formData.phoneNumber).slice(-10)}`,
        isBlocked: false,
      })
    );
  });

  const handleCloseAlert = () => {
    dispatch(clearAdminState());
  };

  if (adminLoading) {
    return <AppPreloader />;
  }

  return (
    <Content className="content">
      <AppAlert
        onClose={handleCloseAlert}
        errorMessage={adminErrorMessage}
        successMessage={"Администратор сохранен"}
        status={adminActionStatus}
      />

      <Card className="form">
        <Title level={3} className="title">
          Создание администратора
        </Title>

        <AdminForm errors={errors} control={control} />

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

export default AdminCreatePage;
