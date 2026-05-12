import { Suspense } from "react";
import { getUsers } from "@/actions/user.action";
import Admin from "./_component/adminSettings";
import AdminSkeleton from "./_component/adminSkeleton";

interface AdminPageProps {
  searchParams: Promise<{ page?: string }>;
}

async function AdminList({ page }: { page: number }) {
  const users = await getUsers({ limit: 10, page } as PaginationParams);
  return <Admin user={users} />;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? Number(page) : 1;

  return (
    <Suspense key={currentPage} fallback={<AdminSkeleton />}>
      <AdminList page={currentPage} />
    </Suspense>
  );
}