import { message } from "antd";
import moment from "moment";
import "moment/locale/ru";
import { AttachmentType } from "../models/Attachments";
import getBase64 from "./getBase64";
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

export const convertingImage = async (e: Event) => {
  const target = e.currentTarget as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg"
    ) {
      return message.error(`${file.name} не является картинкой`);
    } else {
      const base64 = await getBase64(file);
      const ext = file.name.split(".").pop();
      const name = file.name;

      if (base64 && ext && name) {
        const image: AttachmentType = {
          name: name,
          ext: ext,
          content: base64.split(",")[1],
        };
        return image;
      }
    }
  }
};
