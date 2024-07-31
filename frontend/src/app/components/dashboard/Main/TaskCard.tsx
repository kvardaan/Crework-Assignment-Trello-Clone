"use client";

import { useEffect, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

import Clock from "@/app/lib/icons/Clock";
import { TaskProps } from "@/app/lib/utils/types";
import { calculateElapsedTime, cn, formatDate } from "@/app/lib/utils/helpers";
import { deleteTask } from "@/app/lib/utils/actions";
import { useModal } from "@/app/context/Context";
import { LuTrash2 } from "react-icons/lu";

const priorityShades = {
  Low: "#0ECC5A",
  Medium: "#FFA235",
  Urgent: "#FF6B6B",
};

export const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const { tasks, setTasks } = useModal();
  const formattedDeadline = formatDate(task.deadline);
  const [elapsedSinceCreation, setElapsedSinceCreation] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedSinceCreation(calculateElapsedTime(task.createdAt));
    }, 60000); // updates every 60 sec

    return () => clearInterval(intervalId);
  }, [task.createdAt]);

  const handleTaskDelete = async (id: string) => {
    try {
      const deletedTaskId: string = await deleteTask(id);
      const updatedTasks = tasks.filter((task) => task.id !== deletedTaskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Draggable draggableId={task.id} index={0} key={task.id}>
      {(provided, snapshot) => (
        <div
          id="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "rounded-lg border py-[14px] px-[13px] flex flex-col gap-4 border-[#DEDEDE] bg-[#F9F9F9]",
            snapshot.isDragging && "hidden"
          )}
        >
          <div className="group flex flex-col gap-[13px]">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-[16px] leading-5 text-[#606060]">{task.title}</h3>
                {task.description && (
                  <p className="break-words font-normal text-[14px] leading-4 text-[#797979]">{task.description}</p>
                )}
              </div>
            </div>
            {task.priority && (
              <div className="flex justify-between ">
                <p
                  style={{ backgroundColor: priorityShades[task.priority] }}
                  className="rounded-lg px-2 py-[6px] font-normal text-[12px] leading-[14.2px] text-[#FFFFFF]"
                >
                  {task.priority}
                </p>
                <button
                  onClick={() => handleTaskDelete(task.id)}
                  className="hidden group-hover:text-right group-hover:align-top group-hover:w-6 group-hover:h-6 group-hover:flex group-hover:items-center group-hover:justify-center group-hover:bg-red-400 group-hover:rounded-sm group-hover:p-1"
                >
                  <LuTrash2 size="2em" color="white" />
                </button>
              </div>
            )}
            {task.deadline && (
              <div className="flex gap-2 justify-start items-center text-[#606060]">
                <Clock />
                <p className="font-semibold text-[14px] leading-4">{formattedDeadline}</p>
              </div>
            )}
          </div>
          <div id="time">
            <p className="font-medium text-[14px] leading-4 text-[#797979]">{elapsedSinceCreation}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
