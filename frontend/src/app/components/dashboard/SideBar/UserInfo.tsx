import React from "react";
import Image from "next/image";

export const UserInfo: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Image
        src="/User_Image_Figma.jpg"
        alt={`${name}'s Image`}
        className="rounded-lg w-8 h-8 object-cover"
        width={31}
        height={31}
      />
      <p className="text-[#080808] font-medium text-xl leading-6">{name}</p>
    </div>
  );
};
