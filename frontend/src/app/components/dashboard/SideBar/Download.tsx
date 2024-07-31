import { TfiDownload } from "react-icons/tfi";

export default function Download() {
  return (
    <div className="flex flex-row justify-around gap-2 items-center bg-[#F3F3F3] rounded-lg p-2 text-[#666666]">
      <TfiDownload className="text-right w-6 h-6" />
      <div className="flex flex-col gap-1">
        <p className="font-medium text-[20px] leading-[24.2px]">Download the app</p>
        <p className="font-normal text-[14px] leading-[16.94px]">Get the full experience</p>
      </div>
    </div>
  );
}
