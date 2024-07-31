import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from "@hello-pangea/dnd";

import { TopBar } from "./Main/TopBar";
import { TaskCard } from "./Main/TaskCard";
import { InfoCards } from "./Main/InfoCards";
import { Task } from "@/app/lib/utils/types";
import { TaskButton } from "./Main/TaskButton";
import { Filter } from "@/app/lib/icons/Filter";
import { useModal } from "@/app/context/Context";
import { cn, formatStatus } from "@/app/lib/utils/helpers";
import { updateTaskStatus } from "@/app/lib/utils/actions";
import { Statuses, UserProps } from "@/app/lib/utils/types";
import { FunctionalButtons } from "./Main/FunctionalButtons";

export const MainComponent: React.FC<UserProps> = ({ user }) => {
  const { tasks, setTasks } = useModal();
  const tasksGroupedByStatus: Record<string, Task[]> = groupTasksByStatus(tasks);

  function groupTasksByStatus(tasks: Task[]): Record<string, Task[]> {
    const groupedTasks: Record<string, Task[]> = {};

    Statuses.forEach((status) => {
      groupedTasks[status] = [];
    });

    if (tasks && tasks.length > 0) {
      tasks.forEach((task) => {
        if (!groupedTasks[task.status]) {
          groupedTasks[task.status] = [];
        }
        groupedTasks[task.status].push(task);
      });
    }

    return groupedTasks;
  }

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceTasks = [...tasksGroupedByStatus[source.droppableId]];
      const [removed] = sourceTasks.splice(source.index, 1);

      const destinationTasks = [...tasksGroupedByStatus[destination.droppableId]];
      removed.status = destination.droppableId as any;
      destinationTasks.splice(destination.index, 0, removed);

      const newTasks = tasks.map((task) =>
        task.id === removed.id ? { ...task, status: destination.droppableId as any } : task
      );

      setTasks(newTasks);

      try {
        await updateTaskStatus(removed, destination.droppableId);
      } catch (error) {
        // Revert state if API call fails
        setTasks(tasks);
        console.error("Reverted task status due to API error");
      }
    }
  };

  return (
    <div id="main-component" className="w-4/5 mt-6 mr-8 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <TopBar user={user} />
        <InfoCards />
        <FunctionalButtons />
      </div>

      <div className="grid grid-cols-4 h-fit bg-[#FFFFFF] gap-4 rounded-lg p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {Statuses.map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-4 p-2">
                  <div className="flex flex-row justify-between w-full">
                    <p className="font-normal text-[20px] leading-6 text-[#555555]">{formatStatus(status)}</p>
                    <Filter />
                  </div>

                  {tasksGroupedByStatus[status] &&
                    tasksGroupedByStatus[status].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(snapshot.isDragging && "rounded-md bg-gray-300 opacity-25")}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  <TaskButton status={status} />
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};
