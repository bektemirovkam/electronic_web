import { AddOrderFormData, OrderFullInfoType, OrderType } from "./../types";
import { axios } from "../api/axios";

export const ordersApi = {
  // orders

  getOrders: async (): Promise<OrderType[]> => {
    const { data } = await axios.get<OrderType[]>("orders");
    return data;
  },
  createOrder: async (
    formData: AddOrderFormData
  ): Promise<OrderFullInfoType[]> => {
    const { data } = await axios.post<OrderFullInfoType[]>("orders", formData);
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
  ): Promise<OrderFullInfoType[]> => {
    const { data } = await axios.patch<OrderFullInfoType[]>(
      `/orders/${id}`,
      order
    );
    return data;
  },

  // orders/{id}/full

  getFullOrderInfo: async (orderId: number): Promise<OrderFullInfoType[]> => {
    const { data } = await axios.get<OrderFullInfoType[]>(
      `/orders/${orderId}/full`
    );
    return data;
  },
};
