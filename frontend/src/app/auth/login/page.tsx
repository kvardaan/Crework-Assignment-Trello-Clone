"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import { Button } from "@/app/components/Button";
import { AuthHeading } from "@/app/components/AuthHeading";

export interface AuthSchema {
  email: string;
  password: string;
}

export default function Home() {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("VscEyeClosed");

  const loginHandler = async () => {
    const response: any = await axios({
      method: "post",
      url: `${process.env.BACKEND_ENDPOINT}api/v1/auth/login`,
      data: { email, password },
      withCredentials: true,
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      push("/dashboard");
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon("VscEye");
      setType("text");
    } else {
      setIcon("VscEyeClosed");
      setType("password");
    }
  };
  return (
    <div className="flex flex-col gap-8 text-center text-[20px]">
      <AuthHeading />
      <div className="flex flex-col justify-center text-center gap-[22px]">
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#EBEBEB] outline-0 rounded-lg px-3 py-4 text-[#999999] hover:border hover:border-[#999999]"
          />
          <div className="flex flex-row justify-between items-center bg-[#EBEBEB] rounded-lg hover:border hover:border-[#999999]">
            <input
              className="flex flex-row justify-between items-center bg-[#EBEBEB] outline-0 rounded-lg px-3 py-4 text-[#999999]"
              type={type}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div onClick={handleToggle}>
              {type === "text" ? (
                <VscEye className="mr-3 text-[#999999]" />
              ) : (
                <VscEyeClosed className="mr-3 text-[#999999]" />
              )}
            </div>
          </div>
        </div>
        <Button onClick={() => loginHandler()} className="opacity-50 hover:opacity-100">
          <p className="text-white z-10">Login</p>
        </Button>
      </div>
      <Link href="/auth/signup">
        <p className="text-[#606060]">
          Don&apos;t have an account? Create a <span className="text-[#0054A1]">new account.</span>
        </p>
      </Link>
    </div>
  );
}
