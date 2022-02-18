import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Card, Form, Input, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppPreloader } from "../../components";
import { AdministratorCredentialsType } from "../../models/Administrator";
import { auth } from "../../store/actions/admin";
import {
  getAuthErrorMessageState,
  getAuthLoadingState,
} from "../../store/selectors/admin";
import { authSchema } from "../../utils/validatorsSchemes";
import { AuthForm } from "./components";

type AuthPagePropsType = {};

const { Title } = Typography;

const AuthPage: React.FC<AuthPagePropsType> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdministratorCredentialsType>({
    resolver: yupResolver(authSchema),
  });

  const authLoading = useSelector(getAuthLoadingState);
  const authError = useSelector(getAuthErrorMessageState);

  const dispatch = useDispatch();

  const onSubmit = handleSubmit((formData) => {
    dispatch(
      auth({
        ...formData,
        phoneNumber: `7${String(formData.phoneNumber).slice(-10)}`,
      })
    );
  });

  if (authLoading) {
    return <AppPreloader />;
  }

  return (
    <Content className="auth__content">
      <Card className="form">
        {authError && (
          <Alert className="error" message={authError} type={"error"} />
        )}
        <Title level={3} className="title">
          Войти
        </Title>

        <AuthForm control={control} errors={errors} />
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

export default AuthPage;
