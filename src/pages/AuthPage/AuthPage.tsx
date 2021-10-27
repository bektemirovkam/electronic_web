import { Button, Form, Input } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";

type AuthPagePropsType = {
  auth: () => void;
};

const AuthPage: React.FC<AuthPagePropsType> = ({ auth }) => {
  const onFinishFailed = () => {};

  return (
    <Content className="auth__content">
      <Form
        name="basic"
        onFinish={auth}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="auth__form"
        layout="vertical"
      >
        <Form.Item
          label="Логин"
          name="username"
          rules={[{ required: true, message: "Пожалуйста введите логин!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default AuthPage;
