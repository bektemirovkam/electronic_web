import React from "react";
import { Button, Card, Layout, Typography } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { AppAlert, AppPreloader } from "../../components";
import { changePasswordSchema } from "../../utils/validatorsSchemes";

import { AdminFormDataType } from "../../models/Administrator";
import { AdminForm } from "./components";
import {
  getAdminActionStatusState,
  getAdminErrorMessageState,
  getAdminLoadingState,
  getCurrentAdminState,
} from "../../store/selectors/admin";
import { clearAdminState, updateAdmin } from "../../store/actions/admin";
import { ActionStatusEnum } from "../../models/types";

const { Content } = Layout;
const { Title } = Typography;

const ChangePasswordPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Exclude<AdminFormDataType, "phoneNumber">>({
    resolver: yupResolver(changePasswordSchema),
  });

  const adminLoading = useSelector(getAdminLoadingState);
  const adminErrorMessage = useSelector(getAdminErrorMessageState);
  const adminActionStatus = useSelector(getAdminActionStatusState);
  const currentAdmin = useSelector(getCurrentAdminState);

  const dispatch = useDispatch();

  const onSubmit = handleSubmit((formData) => {
    if (currentAdmin) {
      const password = formData.password;
      const { id, phoneNumber, isBlocked } = currentAdmin;
      dispatch(updateAdmin(id, { password, phoneNumber, isBlocked }));
    }
  });

  const handleCloseAlert = () => {
    dispatch(clearAdminState());
  };

  React.useEffect(() => {
    if (adminActionStatus === ActionStatusEnum.SUCCESS) {
      reset();
    }
  }, [adminActionStatus, reset]);

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
          Смена пароля
        </Title>

        <AdminForm errors={errors} control={control} />

        <Button
          className="order__save-btn"
          onClick={onSubmit}
          disabled={Object.keys(errors).length > 0 || !currentAdmin}
        >
          Сохранить
        </Button>
      </Card>
    </Content>
  );
};

export default ChangePasswordPage;
