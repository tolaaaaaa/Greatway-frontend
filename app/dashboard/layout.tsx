import { DashboardLayoutClient } from "./_component/dashboardLayout";

;

type Props = Readonly<{
   children: React.ReactNode;
}>

export default async function DashboardLayout({ children }: Props) {
    return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}