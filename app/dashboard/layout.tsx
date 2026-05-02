"use server"
import { redirect } from "next/navigation";
import { DashboardLayoutClient } from "./_component/dashboardLayout";
import { getAuthUser } from "@/actions/auth.actions";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function DashboardLayout({ children }: Props) {
  const user = await getAuthUser();

  if (!user) redirect("/login");
  return <DashboardLayoutClient user={user}>{children}</DashboardLayoutClient>;
}
