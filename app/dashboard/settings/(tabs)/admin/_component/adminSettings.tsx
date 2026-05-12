"use client";

import AdminTable from "./adminTable";
import { useRouter, useSearchParams } from "next/navigation";
import { customToast } from "@/app/component/ui";
import { deleteUser, updateStatus } from "@/actions/user.action";
import { useState } from "react";
import { Dialog } from "@/app/component/ui";

type Props = {
  user: Pagination<User>;
};

export default function AdminPage({ user }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDeactivate = async (id: string, status: UserStatus) => {
    await updateStatus(id, status)
  };

  const handleDelete = async () => {
    if (!pendingDeleteId) return;
    setIsDeleting(true);
    const result = await deleteUser(pendingDeleteId);
    setIsDeleting(false);
    setPendingDeleteId(null);

    if (!result) {
      customToast.error("Failed to delete user. Please try again.");
      return;
    }

    setDeleteSuccess(true);
  };


  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <main className="font-cambay">
        <div className="bg-surface p-5">
          <AdminTable
            data={user.items}
            currentPage={currentPage}
            totalPages={user.metadata.totalPages}
            onPageChange={handlePageChange}
            onDeactivate={handleDeactivate}
            onDelete={(id) => setPendingDeleteId(id)}
          />
        </div>
      </main>

      <Dialog
        isOpen={!!pendingDeleteId}
        onClose={() => setPendingDeleteId(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        mode="confirm"
        variant="danger"
        title="Are you sure you want to delete this user?"
        confirmLabel="Yes"
        cancelLabel="No"
      />

      <Dialog
        isOpen={deleteSuccess}
        onClose={() => setDeleteSuccess(false)}
        onConfirm={() => {}}
        mode="success"
        title="User Deleted Successfully!"
        description="The user has been permanently removed."
        onContinue={() => {
          setDeleteSuccess(false);
          setTimeout(() => router.refresh(), 1000);
        }}
      />
    </>
  );
}