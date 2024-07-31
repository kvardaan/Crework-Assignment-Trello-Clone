import axios from "axios";

import { Task, User } from "./types";
import { getUserIdFromToken } from "./helpers";

export const getUser = async (): Promise<User | unknown> => {
  const id = getUserIdFromToken();
  if (id === null) return null;

  const response = await axios({
    method: "get",
    url: `${process.env.BACKEND_ENDPOINT}api/v1/users/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });

  return response.data;
};

export const updateTaskStatus = async (task: Task, newStatus: string) => {
  const { id, title, description, priority, deadline } = task;
  try {
    const response: any = await axios({
      method: "PATCH",
      url: `${process.env.BACKEND_ENDPOINT}api/v1/tasks/${id}`,
      data: JSON.stringify({ title, description, status: newStatus, priority, deadline }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      throw new Error("Failed to update task status");
    }

    const updatedTask = await response.data.task;
    return updatedTask;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response: any = await axios({
      method: "DELETE",
      url: `${process.env.BACKEND_ENDPOINT}api/v1/tasks/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("Failed to delete task");
    }

    alert("Task successfully deleted");
    return response.data.task.id;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
