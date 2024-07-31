"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import TaskModal from "./TaskModal";
import SideBar from "./dashboard/SideBar";
import { useModal } from "@/app/context/Context";
import { getUser } from "@/app/lib/utils/actions";
import { MainComponent } from "./dashboard/MainComponent";

export const Dashboard = () => {
  const { push } = useRouter();
  const { user, setUser, setTasks } = useModal();

  useEffect(() => {
    const userData = getUser();
    userData.then((response: any) => {
      if (response === undefined) push("/auth/login");
      setUser(response);
      setTasks(response.tasks);
    });
  }, [push, setUser, setTasks]);

  if (user) {
    return (
      <>
        <SideBar name={user.name} />
        <MainComponent user={user} />
        <TaskModal />
      </>
    );
  }
};
