import React from "react";

type ListProps = {
  children: React.ReactNode;
};

export const List = ({ children }: ListProps) => (
  <ul className="flex w-fit justify-center flex-col fade-in gap-4">
    {children}
  </ul>
);
