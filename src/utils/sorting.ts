import {
  DescendingComparatorType,
  DirectionType,
  GetComparatorType,
  OrderType,
  SortByOrdersFieldsType,
  StableSortType,
} from "../types";

export const getOrderComparator: GetComparatorType<
  OrderType,
  DirectionType,
  SortByOrdersFieldsType
> = (direction, sortBy) => {
  // выбор сортировщика
  return direction === "desc"
    ? (a, b) => descendingOrderComparator(a, b, sortBy)
    : (a, b) => -descendingOrderComparator(a, b, sortBy);
};

export const descendingOrderComparator: DescendingComparatorType<
  OrderType,
  SortByOrdersFieldsType
> = (a, b, sortBy) => {
  // сортировщик
  if (sortBy === "totalSum" || sortBy === "creationDate") {
    //@ts-ignore
    if (b[sortBy] < a[sortBy]) {
      return -1;
    }
    //@ts-ignore
    if (b[sortBy] > a[sortBy]) {
      return 1;
    }
    return 0;
  } else {
    return a[sortBy].localeCompare(b[sortBy]);
  }
};

export const stableOrderSort: StableSortType<OrderType> = (
  array,
  comparator
) => {
  // конечная функция сортировки
  const sortedList = array.sort((a, b) => {
    const order = comparator(a, b);
    if (order !== 0) return order;
    return a.title.localeCompare(b.title);
  });
  return sortedList;
};
