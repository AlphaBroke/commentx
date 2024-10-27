import React from "react";

type FormProps = {
  children: React.ReactNode;
  className?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export const Form = (props: FormProps) => (
  <form onSubmit={props.onSubmit} className={props.className}>
    {props.children}
  </form>
);
