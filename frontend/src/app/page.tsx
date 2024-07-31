import { redirect } from "next/navigation";

export default function Layout() {
  return <>{redirect("/auth/login")}</>;
}
