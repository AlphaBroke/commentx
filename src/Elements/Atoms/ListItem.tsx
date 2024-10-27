import React from "react";

type ListItemProps = {
  children: React.ReactNode;
  className?: string;
};

export const ListItem = ({ children, className }: ListItemProps) => (
  <li className={`row flex flex-col gap-4 ${className}`}>{children}</li>
);
