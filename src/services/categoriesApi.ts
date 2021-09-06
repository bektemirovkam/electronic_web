import { axios } from "../api/axios";
import { CategoryType } from "../types";

export const categoriesApi = {
  getAllCategories: async (): Promise<CategoryType[]> => {
    const { data } = await axios.get<CategoryType[]>("categories");
    return data;
  },
};
