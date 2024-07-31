import {
  AddIcon,
  ShareIcon,
  CloseIcon,
  ResizeIcon,
  PencilIcon,
  WarningIcon,
  CalendarIcon,
  DisappearIcon,
  HollowStarIcon,
} from "@/app/lib/icons/Icons";

import { barlow } from "@/app/lib/utils/fonts";
import { useModal } from "@/app/context/Context";
import { CustomLabel } from "./dashboard/Modal/CustomLabel";
import { getUserIdFromToken } from "@/app/lib/utils/helpers";

export default function TaskModal() {
  const {
    openModal,
    setOpenModal,
    title,
    setTitle,
    status,
    setStatus,
    priority,
    setPriority,
    description,
    setDescription,
    currentDate,
    setCurrentDate,
    addTask,
  } = useModal();

  const handleAddTask = () => {
    const formData = {
      title,
      status,
      priority,
      description,
      deadline: new Date(currentDate),
      userId: getUserIdFromToken(),
    };
    addTask(formData);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/2 bg-[#FFFFFF] shadow-lg transition-transform duration-300 ${
        openModal ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div id="416" className="flex flex-col gap-8 mt-4 px-6">
        <div id="415" className="flex flex-col gap-[27px]">
          <div id="398" className="flex flex-row justify-between text-[#797979]">
            <div className="flex flex-row justify-between items-center gap-4">
              <button onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </button>
              <button>
                <ResizeIcon />
              </button>
            </div>
            <div className="flex flex-row justify-between items-center gap-4">
              <button
                onClick={handleAddTask}
                className="rounded-[4px] p-2 flex flex-row items-center gap-[14px] bg-[#F4F4F4]"
              >
                <p className="font-normal text-[16px] leading-5">Add Task</p>
                <AddIcon stroke="#797979" />
              </button>
              <button className="rounded-[4px] p-2 flex flex-row items-center gap-[14px] bg-[#F4F4F4]">
                <p className="font-normal text-[16px] leading-5">Share</p>
                <ShareIcon />
              </button>
              <button className="rounded-[4px] p-2 flex flex-row items-center gap-[14px] bg-[#F4F4F4]">
                <p className="font-normal text-[16px] leading-5">Favorite</p>
                <HollowStarIcon />
              </button>
            </div>
          </div>
          <div id="414" className="flex flex-col gap-[38px] space-x-0">
            <div id="412" className="flex flex-col gap-8">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className={`${barlow.variable} font-semibold text-[#CCCCCC] placeholder-[#C1BDBD] text-[48px] leading-[58px] outline-none`}
              />
              <div id="411" className="flex flex-row gap-[60px]">
                <div id="404" className="flex flex-col gap-8 text-[#666666] font-normal text-[16px] leading-5">
                  <CustomLabel icon={<DisappearIcon />} title="Status" />
                  <CustomLabel icon={<WarningIcon />} title="Priority" />
                  <CustomLabel icon={<CalendarIcon />} title="Deadline" />
                  <CustomLabel icon={<PencilIcon />} title="Description" />
                </div>
                <div id="410" className="flex flex-col gap-8 text-[#C1BDBD] outline-none font-normal text-[16px] leading-5">
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="font-normal text-[16px] leading-[24px] placeholder-[#C1BDBD] outline-none appearance-none"
                  >
                    <option value="Not selected">Not Selected</option>
                    <option value="To_do">To-Do</option>
                    <option value="In_progress">In Progress</option>
                    <option value="Under_review">Under Review</option>
                    <option value="Finished">Finished</option>
                  </select>
                  <select
                    name="priority"
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="font-normal text-[16px] leading-[24px] placeholder-[#C1BDBD] outline-none appearance-none"
                  >
                    <option value="Not selected">Not Selected</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="font-normal text-[16px] leading-[24px] placeholder-[#C1BDBD] outline-none appearance-none"
                  />
                  <input
                    type="text"
                    id="description"
                    value={description}
                    placeholder="Not Selected"
                    onChange={(e) => setDescription(e.target.value)}
                    className="font-normal text-[16px] leading-[24px] placeholder-[#C1BDBD] outline-none"
                  />
                </div>
              </div>
            </div>
            <button id="403" className="flex flex-row gap-6 items-center">
              <AddIcon />
              <p className="font-normal text-[16px] leading-5">Add custom property</p>
            </button>
          </div>
        </div>
        <div id="413" className="text-[#DEDEDE] flex justify-center">
          <svg width="622" height="1" viewBox="0 0 622 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="622" height="1" fill="#DEDEDE" />
          </svg>
        </div>
        <p id="text" className="font-normal text-[16px] leading-5 text-[#C0BDBD]">
          Start writing, or drag your own files here.
        </p>
      </div>
    </div>
  );
}
