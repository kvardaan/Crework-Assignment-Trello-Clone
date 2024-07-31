import axios from "axios";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

import { FormDataSchema, Task, User } from "@/app/lib/utils/types";
import { revalidatePath } from "next/cache";

interface ContextType {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;

  user: User | null;
  setUser: (user: User | null) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  title: string;
  setTitle: (title: string) => void;
  status: string;
  setStatus: (status: string) => void;
  activeCard: string;
  setActiveCard: (activeCard: string) => void;
  priority: string;
  setPriority: (priority: string) => void;
  description: string;
  setDescription: (description: string) => void;
  currentDate: string;
  setCurrentDate: (date: string) => void;
  fetchTasks: () => void;
  addTask: (task: FormDataSchema) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeCard, setActiveCard] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Not selected");
  const [priority, setPriority] = useState("Not selected");
  const [description, setDescription] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    if (openModal) {
      setTitle("");
      if (!status) setStatus("Not selected");
      setPriority("Not selected");
      setDescription("");
    }
  }, [openModal, status]);

  const handleSetOpenModal = (open: boolean) => {
    setOpenModal(open);
    if (!open) {
      setTitle("");
      setStatus("Not selected");
      setPriority("Not selected");
      setDescription("");
    }
  };

  const fetchTasks = async () => {
    if (user)
      try {
        const response: any = await axios({
          method: "get",
          url: `${process.env.BACKEND_ENDPOINT}api/v1/tasks`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) setTasks(response.data);
      } catch (error) {
        console.error(`Failed to fetch tasks: ${error}`);
      }
  };

  const addTask = async (task: FormDataSchema) => {
    try {
      const response: any = await axios({
        method: "post",
        url: `${process.env.BACKEND_ENDPOINT}api/v1/tasks`,
        data: task,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
      setOpenModal(false);
      alert(response.data.message);
      revalidatePath("/dashboard");
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const value = {
    openModal,
    setOpenModal: handleSetOpenModal,
    user,
    setUser,
    tasks,
    setTasks,
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
    fetchTasks,
    addTask,
    activeCard,
    setActiveCard,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useModal() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
