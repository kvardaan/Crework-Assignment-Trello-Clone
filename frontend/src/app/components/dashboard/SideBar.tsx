import axios from "axios";
import { useRouter } from "next/navigation";

import Download from "./SideBar/Download";
import NavLinks from "./SideBar/NavLinks";
import { UserInfo } from "./SideBar/UserInfo";
import Bell from "@/app/lib/icons/Bell";
import Star from "@/app/lib/icons/Star";
import ChevronsRight from "@/app/lib/icons/ChevronsRight";

export default function SideBar({ name }: any) {
  const { push } = useRouter();

  const logoutHandler = async () => {
    const response = await axios({
      method: "post",
      url: `${process.env.BACKEND_ENDPOINT}api/v1/auth/logout`,
      withCredentials: true,
    });
    if (response.status === 200) {
      localStorage.clear();
      push("/auth/login");
    }
  };

  return (
    <div id="side-bar" className="w-1/5 bg-[#FFFFFF] border-r flex flex-col justify-between px-4 pt-6 pb-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <UserInfo name={name} />
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-5 items-center text-[#666666]">
              <Bell />
              <Star />
              <ChevronsRight />
            </div>
            <button name="logout-button" onClick={logoutHandler} className="bg-[#F4F4F4] rounded-[4px] p-2 gap-[14px]">
              <p className="font-normal text-[16px] leading-5 text-[#797979]">Logout</p>
            </button>
          </div>
        </div>
        <NavLinks />
      </div>
      <Download />
    </div>
  );
}
