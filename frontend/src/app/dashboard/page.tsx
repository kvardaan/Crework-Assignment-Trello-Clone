"use client";

import { useAuthRedirect } from "../lib/utils/hooks";

import { Dashboard } from "@/app/components/Dashboard";
import { ContextProvider } from "@/app/context/Context";

export default function Home() {
  useAuthRedirect();

  return (
    <div className="flex flex-row justify-between h-screen gap-4 bg-[#F7F7F7]">
      <ContextProvider>
        <Dashboard />
      </ContextProvider>
    </div>
  );
}
