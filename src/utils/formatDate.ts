import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

export const formatDate = (date: number) => {
  return moment(date * 1000).format("DD.MM.YYYY");
};

export const formatDateWithTime = (date: number) => {
  return moment(date * 1000).format("DD.MM.YYYY hh:mm");
};
