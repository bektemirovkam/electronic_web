import { addOrderFormData, OrderType } from "./../types";
import { axios } from "../api/axios";

export const ordersApi = {
  getOrders: async (): Promise<OrderType[]> => {
    const { data } = await axios.get<OrderType[]>("orders");
    return data;
  },
  createOrder: async (formData: addOrderFormData): Promise<boolean> => {
    const { data } = await axios.post<boolean>("orders", formData);
    return data;
  },
  updateOrder: async (
    formData: addOrderFormData,
    id: number
  ): Promise<boolean> => {
    const { data } = await axios.patch(`/orders/${id}`, formData);
    return data;
  },
  deleteOrder: async (id: number): Promise<boolean> => {
    const { data } = await axios.delete(`/orders/${id}`);
    return data;
  },
};
