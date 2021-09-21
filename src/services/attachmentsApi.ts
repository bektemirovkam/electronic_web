import axios from "axios";
import { AttachmentOutType, AttachmentType } from "../models/Attachments";

export const attachmentsApi = {
  addAttachment: async (
    attachment: AttachmentType
  ): Promise<AttachmentOutType[]> => {
    const { data } = await axios.post<AttachmentOutType[]>(
      "attachments",
      attachment
    );
    return data;
  },
  removeAttachment: async (id: number): Promise<boolean> => {
    const { data } = await axios.delete<boolean>(`attachments/${id}`);
    return data;
  },
};
