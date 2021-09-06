import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

export const formatDate = (date: moment.Moment) => {
  return date.format("DD.MM.YYYY");
};

export const formatDateWithTime = (date: moment.Moment) => {
  return date.format("DD.MM.YYYY hh:mm");
};

export const formatStringToDate = (value: string) => {
  const [day, month, year] = value.split(" ")[0].split("-");
  const [hours, minutes] = value.split(" ")[1].split(":");

  return moment(`${year}-${month}-${day}T${hours}:${minutes}`);
};
