import React from "react";
import { Image } from "antd";

type OrderImagesListPropsType = {
  images: string[];
};

const OrderImagesList: React.FC<OrderImagesListPropsType> = ({ images }) => {
  return (
    <div className="order__images">
      {images &&
        images.map((img, index) => (
          <Image key={index} width={200} src={img} className="order__image" />
        ))}
    </div>
  );
};

export default OrderImagesList;
