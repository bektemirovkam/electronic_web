export type CategoryInType = {
  categoryId: number;
};

export type CategoryType = {
  id: number;
  name: string;
  isDeleted: boolean;
  parentId: number;
};

export type AddCategoryFormData = {
  name: string;
  parentId: number;
  isDeleted?: boolean;
};

export type CategoryOutType = {
  categoryId: number;
  parentId: number;
  categoryName: string;
};
