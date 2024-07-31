"use client";

import { Button } from "../../Button";
import Add from "@/app/lib/icons/AddRounded";
import { useModal } from "../../../context/Context";
import { HomeIcon, BoardsIcon, SettingsIcon, TeamsIcon, AnalyticsIcon } from "@/app/lib/icons/Icons";

export default function NavLinks() {
  const { openModal, setOpenModal } = useModal();

  return (
    <div className="gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-[#797979] font-normal text-[20px] leading-6">
          <button
            id="home"
            className="rounded-md border p-2 flex flex-row justify-start items-center gap-[14px] border-[#DEDEDE] bg-[#F4F4F4]"
          >
            <HomeIcon />
            <p>Home</p>
          </button>
          <button id="boards" className="rounded-md p-2 flex flex-row justify-start items-center gap-[14px] bg-[#FFFFFF]">
            <BoardsIcon />
            <p>Boards</p>
          </button>
          <button id="settings" className="rounded-md p-2 flex flex-row justify-start items-center gap-[14px] bg-[#FFFFFF]">
            <SettingsIcon />
            <p>Settings</p>
          </button>
          <button id="teams" className="rounded-md p-2 flex flex-row justify-start items-center gap-[14px] bg-[#FFFFFF]">
            <TeamsIcon />
            <p>Teams</p>
          </button>
          <button id="analytics" className="rounded-md p-2 flex flex-row justify-start items-center gap-[14px] bg-[#FFFFFF]">
            <AnalyticsIcon />
            <p>Analytics</p>
          </button>
        </div>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
          className="w-full h-[52px]"
        >
          <div className="text-white flex flex-row justify-center items-center gap-2">
            <p className="text-[20px]">Create new task</p>
            <Add />
          </div>
        </Button>
      </div>
    </div>
  );
}
