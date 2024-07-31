import "core-js/stable/atob";

import { jwtDecode } from "jwt-decode";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CSS } from "@dnd-kit/utilities";

export interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const getUserIdFromToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.id;
    }
  }
  return null;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatStatus = (status: string) => {
  return status.replace(/_/g, " ");
};

export const generateGreeting = (): string => {
  const currentTime = new Date().getHours();
  let greeting = "";
  if (currentTime < 12) {
    greeting = "Good morning";
  } else if (currentTime < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  return greeting;
};

export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "";

  const formattedDate = typeof date === "string" ? new Date(date) : date;
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(formattedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const calculateElapsedTime = (createdAt: string): string => {
  const createdTime = new Date(createdAt).getTime();
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - createdTime;

  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hr ago`;
  } else if (minutes > 0) {
    return `${minutes} min ago`;
  } else {
    return `${seconds} sec ago`;
  }
};
