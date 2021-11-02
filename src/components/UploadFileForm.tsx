import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Spin } from "antd";

type UploadFileFormPropsType = {
  onChange: (e: Event) => void;
  isUploading: boolean;
  buttonText: string;
};

const UploadFileForm: React.FC<UploadFileFormPropsType> = ({
  onChange,
  isUploading,
  buttonText,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  React.useEffect(() => {
    const input = inputRef.current;
    if (inputRef) {
      input?.addEventListener("change", onChange);
    }
    return () => {
      input?.removeEventListener("change", onChange);
    };
  }, [onChange]);

  return (
    <div className="upload">
      <div className="upload__btn" onClick={handleClick}>
        <div className="upload__btn-body">
          {isUploading ? (
            <Spin />
          ) : (
            <>
              <PlusOutlined /> <div>{buttonText}</div>
            </>
          )}
        </div>
        <input ref={inputRef} type="file" hidden accept="image/*" />
      </div>
    </div>
  );
};

export default UploadFileForm;
