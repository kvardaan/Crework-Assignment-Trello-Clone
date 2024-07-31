import { cn } from "@/app/lib/utils/helpers";
import { barlow } from "@/app/lib/utils/fonts";

export const AuthHeading = () => {
  return (
    <h1 className={cn(`${barlow.variable} text-[48px] font-semibold leading-[57.6px]`)}>
      Welcome to
      <span className="text-[#4534AC]"> Workflo</span>!
    </h1>
  );
};
