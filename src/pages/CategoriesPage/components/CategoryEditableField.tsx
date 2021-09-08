import { Form, Input, Typography } from "antd";
import React, { ChangeEvent } from "react";

const { Text } = Typography;

type CategoryEditablePropsType = {
  editMode: boolean;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  currentValue?: string;
  error?: string;
};

const CategoryEditableField: React.FC<CategoryEditablePropsType> = ({
  placeholder,
  editMode,
  value,
  currentValue,
  error,
  onChange,
}) => {
  const handleInputClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  if (editMode) {
    return (
      <Form.Item
        validateStatus={error ? "error" : "success"}
        help={error}
        className="input"
      >
        <Input
          placeholder={placeholder}
          onClick={handleInputClick}
          value={currentValue}
          onChange={onChange}
        />
      </Form.Item>
    );
  }
  return <Text>{value}</Text>;
};

export default CategoryEditableField;
