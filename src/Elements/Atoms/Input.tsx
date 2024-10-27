import React from "react";

type InputFieldProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      type,
      placeholder,
      required,
      className,
    }: InputFieldProps,
    ref,
  ) => (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={className}
    />
  ),
);
