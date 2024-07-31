import { Button } from "../../Button";
import Add from "@/app/lib/icons/AddRounded";
import Calendar from "@/app/lib/icons/Calendar";
import { useModal } from "@/app/context/Context";
import { ShareIcon } from "@/app/lib/icons/Icons";
import Automation from "@/app/lib/icons/Automation";
import SearchIcon from "@/app/lib/icons/SearchIcon";
import { FilterFunnel } from "@/app/lib/icons/Filter";

export const FunctionalButtons = () => {
  const { openModal, setOpenModal } = useModal();
  const buttonsContent = [
    {
      id: 1,
      title: "Calendar View",
      icon: <Calendar />,
    },
    {
      id: 2,
      title: "Automation",
      icon: <Automation />,
    },
    {
      id: 3,
      title: "Filter",
      icon: <FilterFunnel />,
    },
    {
      id: 4,
      title: "Share",
      icon: <ShareIcon />,
    },
  ];

  return (
    <div className="flex flex-row gap-2 justify-between items-center h-[40px]">
      <div className="w-[196px] rounded-lg border border-[#E9E9E9] p-2 flex flex-row justify-between items-center bg-[#FFFFFF]">
        <input className="font-normal text-[16px] leading-5 text-[#797979] outline-none w-4/5" placeholder="Search" />
        <SearchIcon />
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <div className="flex flex-row gap-4">
          {buttonsContent.map((button) => (
            <button className="rounded-sm p-2 flex flex-row justify-center items-center gap-[14px]" key={button.id}>
              <p className="font-normal text-[16px] leading-5 text-[#797979]">{button.title}</p>
              {button.icon}
            </button>
          ))}
        </div>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <div className="text-white flex flex-row justify-center items-center gap-2">
            <p className="text-[16px] font-medium leading-5">Create new</p>
            <Add />
          </div>
        </Button>
      </div>
    </div>
  );
};
