import React, { ReactElement } from "react";

interface CustomLabelProps {
  icon: ReactElement;
  title: string;
}

export const CustomLabel: React.FC<CustomLabelProps> = ({ icon, title }) => {
  return (
    <label htmlFor={title} className="flex gap-6 justify-start items-center">
      {icon}
      <p className="font-normal text-[16px] leading-5">{title}</p>
    </label>
  );
};
