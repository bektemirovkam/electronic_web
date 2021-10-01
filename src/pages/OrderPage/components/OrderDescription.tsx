import { Descriptions } from "antd";
import React from "react";
import { Control, FieldError } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { DescriptionOrderFormData, OrderType } from "../../../models/Orders";
import { formatDate } from "../../../utils/formatter";
import OrderEditableField from "./OrderEditableField";

type OrderDescriptionPropsType = {
  order: OrderType;
  editMode: boolean;
  errors: {
    title?: FieldError;
    totalSum?: FieldError;
  };
  control: Control<DescriptionOrderFormData, object>;
};

const OrderDescription: React.FC<OrderDescriptionPropsType> = ({
  order,
  editMode,
  errors,
  control,
}) => {
  return (
    <Descriptions size="small" column={3}>
      <Descriptions.Item label="Дата создания">
        {formatDate(order.creationDate)}
      </Descriptions.Item>
      <Descriptions.Item label="Автор">
        <NavLink to={`/contractors/${order.customerId}`}>Заказчик</NavLink>
      </Descriptions.Item>
      <Descriptions.Item label="Сроки">
        <OrderEditableField
          defaultValue={order.comment}
          editMode={editMode}
          control={control}
          error={errors.title}
          fieldName="comment"
          placeholder="Сроки"
        />
      </Descriptions.Item>

      <Descriptions.Item label="Дата закрытия">
        {formatDate(order.actualDate)}
      </Descriptions.Item>
      <Descriptions.Item label="Чаты">
        <NavLink to={`/orders/${order.id}/chats`}>Чаты</NavLink>
      </Descriptions.Item>
      <Descriptions.Item label="Цена (тг)">
        <OrderEditableField
          isNumberInput
          defaultValue={order.totalSum}
          editMode={editMode}
          control={control}
          error={errors.totalSum}
          fieldName="totalSum"
          placeholder="Цена"
        />
      </Descriptions.Item>
      <Descriptions.Item label="Номер заявки">{order.id}</Descriptions.Item>
    </Descriptions>
  );
};

export default OrderDescription;
