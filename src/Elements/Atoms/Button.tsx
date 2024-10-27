import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Button = (props: ButtonProps) => (
  <button
    onClick={props.onClick}
    type={props.type}
    className={props.className}
    style={props.style}
  >
    {props.children}
  </button>
);
