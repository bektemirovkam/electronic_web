import { Input } from "antd";
import React, { ChangeEventHandler } from "react";

type AppSearchFieldPropsType = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
};

const AppSearchField: React.FC<AppSearchFieldPropsType> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="filter">
      <div className="filter__input">
        <Input placeholder={placeholder} value={value} onChange={onChange} />
      </div>
      <div className="filter__actions"></div>
    </div>
  );
};

export default AppSearchField;
