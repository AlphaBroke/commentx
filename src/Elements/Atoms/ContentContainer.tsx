import React from "react";

type ContentContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const ContentContainer = ({
  children,
  className,
}: ContentContainerProps) => (
  <div
    className={`h-full w-full px-[16.67%] min-w-[500px] relative flex items-center flex-col box-border gap-4 overflow-y-scroll ${className}`}
  >
    {children}
  </div>
);
