import React from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadFile } from "antd/lib/upload/interface";

function getBase64(file: RcFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const beforeUpload = (file: RcFile) => {
  if (file.type !== "image/png" && file.type !== "image/jpeg") {
    message.error(`${file.name} не является картинкой`);
  }

  switch (file.type) {
    case "image/png":
    case "image/jpeg":
    case "image/jpg":
      return true;

    default:
      return Upload.LIST_IGNORE;
  }
};

const UploadButton = () => (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const UploadFileForm = () => {
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");

  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      //@ts-ignore
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview || "");
    setPreviewVisible(true);
    setPreviewTitle(
      file.name ||
        (file.url
          ? file.url.substring(file.url.lastIndexOf("/") + 1)
          : "Новое вложение")
    );
  };

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    console.log(fileList);

    // setFileList(fileList);
  };

  return (
    <>
      <Upload
        accept="image/*"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={() => {}}
        beforeUpload={beforeUpload}
      >
        {fileList.length >= 4 ? null : <UploadButton />}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadFileForm;
