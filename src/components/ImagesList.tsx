import React from "react";
import { baseURL } from "../api/axios";
import { AttachmentOutType } from "../models/Attachments";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";

type ImagesListPropsType = {
  images: AttachmentOutType[];
  editMode: boolean;
};

const ImagesList: React.FC<ImagesListPropsType> = ({ images, editMode }) => {
  return (
    <div className="order__images-list">
      {images &&
        images.map((img) => (
          <div key={String(img.id)} className="order__image-wrapper">
            {editMode && (
              <Button
                type="default"
                shape="circle"
                icon={<DeleteOutlined />}
                size="middle"
                className="order__image-delete"
              />
            )}
            <Image
              width={200}
              src={`${baseURL}${img.attachmentLink}`}
              className="order__image"
            />
          </div>
        ))}
    </div>
  );
};
export default ImagesList;
