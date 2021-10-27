import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

export const formatDate = (date: number) => {
  return moment(date).format("DD.MM.YYYY");
};

export const formatDateWithTime = (date: number) => {
  return moment(date).format("DD.MM.YYYY hh:mm");
};

export const truncateString = (str: string, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};
export const getDateFromNow = (date: number) => {
  return moment(date).fromNow();
};
