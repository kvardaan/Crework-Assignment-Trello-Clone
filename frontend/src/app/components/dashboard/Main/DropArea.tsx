"use client";

import { useState } from "react";

export const DropArea = () => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      className={
        showDrop
          ? "mt-3 rounded-lg border py-[14px] px-[13px] flex flex-col gap-4 border-[#DEDEDE] bg-[#F9F9F9] hover:bg-sky-200 hover:ring-1 hover:shadow-md opacity-100 transition-all ease-in-out duration-200"
          : "hidden"
      }
    >
      <p className="text-center font-medium text-gray-300 group-hover:text-gray-500 ">Drop Here</p>
    </section>
  );
};
