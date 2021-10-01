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

export type CategoryTreeItemType = {
  title: string;
  value: number;
  key: number;
  children:
    | {
        title: string;
        value: number;
        key: number;
      }[]
    | undefined;
};

export type CategoryTreeItemInputType = {
  value: number;
  label: string;
};
