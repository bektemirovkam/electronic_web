import { axios } from "../api/axios";
import { AddOrderFormData, OrderType } from "../models/Orders";

export const ordersApi = {
  // orders

  getOrders: async (): Promise<OrderType[]> => {
    const { data } = await axios.get<OrderType[]>("orders");
    return data;
  },
  createOrder: async (formData: AddOrderFormData): Promise<OrderType[]> => {
    const { data } = await axios.post<OrderType[]>("orders", formData);
    return data;
  },

  // orders/${id}

  getOrderById: async (orderId: number): Promise<OrderType[]> => {
    const { data } = await axios.get<OrderType[]>(`/orders/${orderId}`);
    return data;
  },
  deleteOrder: async (orderId: number): Promise<boolean> => {
    const { data } = await axios.delete<boolean>(`/orders/${orderId}`);
    return data;
  },
  updateOrder: async (
    order: AddOrderFormData,
    id: number
  ): Promise<OrderType[]> => {
    const { data } = await axios.patch<OrderType[]>(`/orders/${id}`, order);
    return data;
  },

  // orders/{orderId}/attachments/{attachmentId}

  removeOrderAttachment: async (
    orderId: number,
    attachmentId: number
  ): Promise<boolean> => {
    const { data } = await axios.delete<boolean>(
      `/orders/${orderId}/attachments/${attachmentId}`
    );
    return data;
  },
};
