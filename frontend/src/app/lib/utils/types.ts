export type FormDataSchema = {
  title: string;
  status: string;
  priority?: string;
  description?: string;
  deadline?: Date;
  userId: string | null;
};

export type FormData = {
  formData: FormDataSchema;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "To_do" | "In_progress" | "Under_review" | "Finished";
  priority: "Low" | "Medium" | "Urgent";
  deadline?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

export interface UserProps {
  user: User;
}

export interface TaskProps {
  task: Task;
}

export const Statuses = ["To_do", "In_progress", "Under_review", "Finished"];
