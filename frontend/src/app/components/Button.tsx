import React from "react";

import { cn } from "@/app/lib/utils/helpers";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick}>
      <div className="flex items-center justify-center p-[2px] rounded-lg bg-gradient-to-b from-[#9c93d4] to-[#4b36cc] hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]">
        <div
          className={cn(
            className,
            `p-2 w-full h-full bg-gradient-to-b from-[#4C38C2] to-[#2F2188] rounded-[calc(.5rem-2px)] hover:shadow-[inset 0px_12px_16px_0px_rgba(186,186,186,.20)]`
          )}
        >
          {children}
        </div>
      </div>
    </button>
  );
};
