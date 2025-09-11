import React from "react";
import { DatePicker, type DatePickerProps } from "antd";

type CommonDatePickerProps = DatePickerProps & {
  className?: string;
  icon?: React.ReactNode; // allows passing a custom icon
  ariaLabel?: string;
};

const CommonDatePicker: React.FC<CommonDatePickerProps> = ({
  className = "",
  icon = <i className="ti ti-calendar text-dark" aria-hidden="true" />,
  format = "D MMMM, YYYY", // <-- add this line
  ariaLabel = "Date picker",
  ...props
}) => {
  return (
    <div className={`common-datePicker ${className}`}>
      <DatePicker
        className="form-control"
        suffixIcon={icon}
        format={format}
        aria-label={ariaLabel}
        {...props}
      />
    </div>
  );
};

export default CommonDatePicker;
