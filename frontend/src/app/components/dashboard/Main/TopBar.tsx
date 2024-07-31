import React from "react";

import { barlow } from "@/app/lib/utils/fonts";
import Question from "@/app/lib/icons/Question";
import { UserProps } from "@/app/lib/utils/types";
import { cn, generateGreeting } from "@/app/lib/utils/helpers";

const Greeting: React.FC<UserProps> = ({ user }) => {
  return (
    <h1 className={cn(`${barlow.variable} text-[48px] font-semibold leading-[57.6px]`)}>
      {generateGreeting()}, {user.name.split(" ")[0]}!
    </h1>
  );
};

export const TopBar: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      <Greeting user={user} />
      <div className="flex flex-row justify-center items-center gap-2">
        <p className="font-normal text-[16px] leading-5">Help & feedback</p>
        <Question />
      </div>
    </div>
  );
};
