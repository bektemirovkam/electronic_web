import React from "react";
import MinusCircleOutlined from "@ant-design/icons/lib/icons/MinusCircleOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { Button, Form, Input, Space, Typography } from "antd";
import { Store } from "antd/lib/form/interface";
import { SaveContactsResponse } from "../models/types";

const { Title } = Typography;

type ContactsFormPropsType = {
  onFinish: (values: SaveContactsResponse) => void;
  initialValues?: Store;
};

const ContactsForm: React.FC<ContactsFormPropsType> = ({
  onFinish,
  initialValues,
}) => {
  return (
    <>
      <Title level={4} className="title">
        Контакты
      </Title>
      <Form
        name="contacts-form"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={initialValues}
      >
        <Form.List name="contacts">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: "flex" }} align="baseline">
                    <Form.Item
                      {...restField}
                      // initialValue={
                      //   initialValues ? initialValues[fieldKey] : "+7"
                      // }
                      name={[name, "phoneNumber"]}
                      fieldKey={[fieldKey, "phoneNumber"]}
                      rules={[
                        {
                          required: true,
                          message: "Значение не может быть пустым",
                        },
                        {
                          max: 12,
                          message: "Максимальная длина телефона 12 символов",
                        },
                      ]}
                    >
                      <Input placeholder="Номер телефона" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Добавить контакты
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="dashed" htmlType="submit">
            Сохранить контакты
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ContactsForm;
