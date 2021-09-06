import { Spin } from "antd";
import React from "react";

type AppPreloaderPropsType = {
  size?: "small" | "large" | "default";
};

const AppPreloader: React.FC<AppPreloaderPropsType> = ({
  size = "default",
}) => {
  return (
    <div className="preloader">
      <Spin size={size} />
    </div>
  );
};

export default AppPreloader;
