"use client"
import { useState } from "react";
import AdminTable, { Admin } from "./adminTable";

const mockAdmins: Admin[] = [
  {
    id: "1",
    fullName: "John Doe",
    emailAddress: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    role: "Super Admin",
    status: "active",
    date: "2024-01-15",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    emailAddress: "jane.smith@example.com",
    phoneNumber: "+1 (555) 987-6543",
    role: "Admin",
    status: "active",
    date: "2024-02-20",
  },
  {
    id: "3",
    fullName: "Bob Johnson",
    emailAddress: "bob.johnson@example.com",
    phoneNumber: "+1 (555) 456-7890",
    role: "Moderator",
    status: "inactive",
    date: "2023-11-10",
  },
  {
    id: "4",
    fullName: "Alice Williams",
    emailAddress: "alice.williams@example.com",
    phoneNumber: "+1 (555) 234-5678",
    role: "Admin",
    status: "active",
    date: "2024-03-05",
  },
];

export default function AdminPage() {
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Replace with actual total pages from your API

  const handleEdit = (id: string) => {
    console.log("Edit admin:", id);
    // Navigate to edit page or open modal
    // router.push(`/dashboard/admin/${id}/edit`);
  };

  const handleDeactivate = (id: string) => {
    setAdmins((prevAdmins) =>
      prevAdmins.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: admin.status === "active" ? "inactive" : "active",
            }
          : admin,
      ),
    );
    // Call your API to update status
    console.log(`Toggle status for admin: ${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
      // Call your API to delete
      console.log("Delete admin:", id);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Fetch new page data from your API
    console.log("Page changed to:", page);
  };
  return (
    <main className="font-cambay">
      <div className="bg-surface p-5">
        <AdminTable
          data={admins}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
         
          onDeactivate={handleDeactivate}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}
