import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";

type MultipleSelectProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  options: SelectProps['options'];
  placeholder?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Please select",
  style = { width: "100%" },
  ariaLabel = "Multiple select",
}) => {
  return (
    <div className="common-multiSelect">
    <Select
      mode="multiple"
      allowClear
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      style={style}
      aria-label={ariaLabel}
    />
    </div>
  );
};

export default MultipleSelect;
