export type CategoryInType = {
  categoryId: number;
};

export type CategoryOutType = {
  categoryId: number;
  categoryName: string;
  parentId: number;
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
};
