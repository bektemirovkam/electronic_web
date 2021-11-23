import axios from "axios";
import { AttachmentOutType } from "../models/Attachments";

export const attachmentsApi = {
  addAttachment: async (file: File): Promise<AttachmentOutType[]> => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axios.post<AttachmentOutType[]>(
      "attachments",
      formData
    );
    return data;
  },
  removeAttachment: async (id: number): Promise<boolean> => {
    const { data } = await axios.delete<boolean>(`attachments/${id}`);
    return data;
  },
};
