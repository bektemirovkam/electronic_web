import { Form, Input, InputNumber, Typography } from "antd";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { DescriptionOrderFormData } from "../../../models/Orders";

const { Text } = Typography;

type OrderCreateFormPropsType = {
  control: Control<DescriptionOrderFormData, object>;
  errors: {
    title?: FieldError;
    description?: FieldError;
    comment?: FieldError;
    totalSum?: FieldError;
  };
};

const OrderCreateForm: React.FC<OrderCreateFormPropsType> = ({
  control,
  errors,
}) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Form.Item
            validateStatus={errors.title ? "error" : "success"}
            help={errors.title?.message}
            className="input order__title-input"
            required
          >
            <Text className="subtitle">Заголовок</Text>
            <Input
              placeholder="Заголовок заявки"
              value={value}
              onChange={onChange}
            />
          </Form.Item>
        )}
        name="title"
        defaultValue=""
      />
      <div className="order__numeric-fields">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.comment ? "error" : "success"}
              help={errors.comment?.message}
              className="order__comment-input input"
              required
            >
              <Text className="subtitle">Сроки</Text>
              <Input
                placeholder="Желаемые сроки"
                value={value}
                onChange={onChange}
              />
            </Form.Item>
          )}
          name="comment"
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              validateStatus={errors.totalSum ? "error" : "success"}
              help={errors.totalSum?.message}
              className="input order__totalsum-input"
              required
            >
              <div className="order__totalsum-field">
                <Text className="subtitle">Цена (тг)</Text>
                <InputNumber value={value} onChange={onChange} />
              </div>
            </Form.Item>
          )}
          name="totalSum"
          defaultValue={0}
        />
      </div>

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
    </>
  );
};

export default React.memo(OrderCreateForm);
