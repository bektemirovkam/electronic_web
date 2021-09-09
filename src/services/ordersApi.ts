import { AddOrderFormData, OrderFullInfoType, OrderType } from "./../types";
import { axios } from "../api/axios";

export const ordersApi = {
  // orders

  getOrders: async (): Promise<OrderType[]> => {
    const { data } = await axios.get<OrderType[]>("orders");
    return data;
  },
  createOrder: async (formData: AddOrderFormData): Promise<boolean> => {
    const { data } = await axios.post<boolean>("orders", formData);
    return data;
  },

  // orders/${id}

  getOrderById: async (orderId: number): Promise<OrderType[]> => {
    const { data } = await axios.get<OrderType[]>(`/orders/${orderId}`);
    return data;
  },
  deleteOrder: async (orderId: number): Promise<boolean> => {
    const { data } = await axios.delete(`/orders/${orderId}`);
    return data;
  },
  updateOrder: async (
    formData: AddOrderFormData,
    orderId: number
  ): Promise<boolean> => {
    const { data } = await axios.patch(`/orders/${orderId}`, formData);
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
