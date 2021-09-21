export type AttachmentType = {
  name: string;
  ext: string;
  content: string;
};

export type AttachmentOutType = {
  id: number;
  name: string;
  ext: string;
  attachmentLink: string;
};

export type AttachmentInType = {
  attachmentId: number;
};
