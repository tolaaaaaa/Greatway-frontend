"use client";

import { useState } from "react";
import CareerTable from "./careerTable";
import { Dialog } from "@/app/component/ui";
import { useRouter } from "next/navigation";
import { deleteCareer, updateCareerStatus } from "@/actions/career.action";

type Props = {
  career: Pagination<Career>;
};

export default function Career({ career }: Props) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Delete states
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [careerToDelete, setCareerToDelete] = useState<string | null>(null);

  // Status change states
  const [showStatusModal, setStatusModal] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<{
    id: string;
    newStatus: "open" | "closed";
  } | null>(null);

  const paginatedData = career.items as Career[];

  // Delete handlers
  const handleDeleteClick = (id: string) => {
    setCareerToDelete(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!careerToDelete) return;
    
    setIsDeleting(true);
    try {
      // Add your API call here to delete
      await deleteCareer(careerToDelete);
      
      setDeleteModal(false);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Failed to delete career:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Status change handlers
  const handleStatusUpdateClick = (id: string, newStatus: "open" | "closed") => {
    setSelectedCareer({ id, newStatus });
    setStatusModal(true);
  };

  const handleStatusChange = async () => {
    if (!selectedCareer) return;

    setIsUpdatingStatus(true);
    try {
      // Add your API call here to update status
      await updateCareerStatus(selectedCareer.id, selectedCareer.newStatus);

      setStatusModal(false);
      setStatusSuccess(true);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <>
      <div className="bg-surface p-6">
        <CareerTable
          data={paginatedData}
          currentPage={currentPage}
          totalPages={career.metadata.totalPages}
          onPageChange={setCurrentPage}
          onDeleteClick={handleDeleteClick}
          onStatusChange={handleStatusUpdateClick}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={showDeleteModal}
        onClose={() => {
          setDeleteModal(false);
          setCareerToDelete(null);
        }}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        mode="confirm"
        title="Are you sure you want to delete this job?"
        description="This action cannot be undone."
        confirmLabel="Yes"
        cancelLabel="No"
      />

      {/* Delete Success Dialog */}
      <Dialog
        isOpen={deleteSuccess}
        onClose={() => setDeleteSuccess(false)}
        onConfirm={() => {}}
        mode="success"
        title="Job Deleted Successfully!"
        description="This job has been permanently deleted."
        onContinue={() => {
          setDeleteSuccess(false);
          setCareerToDelete(null);
          router.refresh();
        }}
      />

      {/* Status Update Confirmation Dialog */}
      <Dialog
        isOpen={showStatusModal}
        onClose={() => {
          setStatusModal(false);
          setSelectedCareer(null);
        }}
        onConfirm={handleStatusChange}
        isLoading={isUpdatingStatus}
        mode="confirm"
        title={
          selectedCareer?.newStatus === "closed"
            ? "Are you sure you want to close this job?"
            : "Are you sure you want to open this job?"
        }
        description={
          selectedCareer?.newStatus === "closed"
            ? "This job will no longer accept applications."
            : "This job will be visible and accept applications again."
        }
        confirmLabel="Yes"
        cancelLabel="No"
      />

      {/* Status Update Success Dialog */}
      <Dialog
        isOpen={statusSuccess}
        onClose={() => setStatusSuccess(false)}
        onConfirm={() => {}}
        mode="success"
        title={
          selectedCareer?.newStatus === "closed"
            ? "Job Closed Successfully!"
            : "Job Opened Successfully!"
        }
        description={
          selectedCareer?.newStatus === "closed"
            ? "This job is now closed and no longer accepting applications."
            : "This job is now open and accepting applications."
        }
        onContinue={() => {
          setStatusSuccess(false);
          setSelectedCareer(null);
          router.refresh();
        }}
      />
    </>
  );
}