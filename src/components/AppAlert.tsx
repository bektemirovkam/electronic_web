import { Alert } from "antd";
import React from "react";
import { ActionStatusEnum } from "../types";

type AlertPropsType = {
  status: string;
  errorMessage?: string | null;
  successMessage?: string;
  onClose: () => void;
};

const AppAlert: React.FC<AlertPropsType> = ({
  status,
  errorMessage,
  successMessage,
  onClose,
}) => {
  if (status === ActionStatusEnum.NEVER) {
    return null;
  }

  return (
    <Alert
      className="error"
      message={
        status === ActionStatusEnum.ERROR ? errorMessage : successMessage
      }
      type={status === ActionStatusEnum.ERROR ? "error" : "success"}
      closable
      onClose={onClose}
    />
  );
};

export default AppAlert;
