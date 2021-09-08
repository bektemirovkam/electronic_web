import { axios } from "../api/axios";
import { CategoryType } from "../types";

export const categoriesApi = {
  //categories
  getAllCategories: async (): Promise<CategoryType[]> => {
    const { data } = await axios.get<CategoryType[]>("categories");
    return data;
  },
  deleteAllCategories: async (): Promise<Boolean> => {
    const { data } = await axios.delete<Boolean>("categories");
    return data;
  },
  addCategory: async (categoryList: CategoryType[]): Promise<Boolean> => {
    const { data } = await axios.post<Boolean>("categories", categoryList);
    return data;
  },

  //categories/${id}

  getCategoryById: async (id: number): Promise<CategoryType[]> => {
    const { data } = await axios.get<CategoryType[]>(`categories/${id}`);
    return data;
  },
  deleteCategoryById: async (id: number): Promise<Boolean> => {
    const { data } = await axios.delete<Boolean>(`categories/${id}`);
    return data;
  },
  updateCategoryById: async (category: CategoryType): Promise<Boolean> => {
    const { data } = await axios.patch<Boolean>(
      `categories/${category.id}`,
      category
    );
    return data;
  },
};
