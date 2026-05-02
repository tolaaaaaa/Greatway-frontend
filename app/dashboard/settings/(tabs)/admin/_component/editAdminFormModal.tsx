// app/dashboard/settings/_component/editAdminModal.tsx
"use client";

import { Modal } from "@/app/component/ui";
import { Input } from "@/app/component/ui";
import { Button } from "@/app/component/ui";
import { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  adminId: string;
  initialData?: AdminFormData;
};

interface AdminFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  password?: string;
}

const options = [
  { label: "Admin", key: "admin" },
  { label: "Super Admin", key: "super admin" },
];

export default function EditAdmin({
  isOpen,
  onClose,
  adminId,
  initialData,
}: Props) {
  const [formData, setFormData] = useState<AdminFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "admin",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch admin data when modal opens
  useEffect(() => {
    if (isOpen && adminId) {
      fetchAdminData();
    }
  }, [isOpen, adminId]);

  const fetchAdminData = async () => {
    // If initialData is provided, use it
    if (initialData) {
      setFormData(initialData);
      return;
    }

    setIsFetching(true);
    try {
      // Fetch admin data from API
      const response = await fetch(`/api/admins/${adminId}`);
      const data = await response.json();

      setFormData({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role,
        password: "", // Don't populate password for security
      });
    } catch (error) {
      console.error("Error fetching admin:", error);
      // Show error message
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Only include password if it was changed
      const updateData = {
        ...formData,
        password: formData.password || undefined,
      };

      // Add your API call here
      const response = await fetch(`/api/admins/${adminId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error("Failed to update admin");

      // Close modal
      onClose();

      // Show success message
      console.log("Admin updated successfully");
    } catch (error) {
      console.error("Error updating admin:", error);
      // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isFetching) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Edit Admin" size="lg">
        <div className="flex items-center justify-center py-12">
          <div className="text-segment">Loading...</div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Admin" size="lg">
      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <div className="flex justify-between gap-6">
          <Input
            name="fullName"
            label="Full Name"
            placeholder="Enter full name"
            value={formData.fullName}
            labelClassName="font-medium text-[16px]"
          />

          <Input
            name="phoneNumber"
            label="Phone Number"
            type="number"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            labelClassName="font-medium text-[16px]"
          />
        </div>

        <Input
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          value={formData.email}
          labelClassName="font-medium text-[16px]"
        />

        <Input
          name="password"
          label="Password (leave blank to keep current)"
          type="password"
          placeholder="Enter new password"
          value={formData.password}
          labelClassName="font-medium text-[16px]"
        />

        <div className="space-y-2">
          <Input
            type="select"
            options={options}
            name="role"
            value={formData.role}
            labelClassName="font-medium text-[16px]"
            label="Assign Role"
          />
        </div>

        <div className="flex justify-between gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            className="border-red-700 text-red-700 border rounded-full w-full"
            onClick={onClose}
            isDisabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="w-full rounded-full"
            type="submit"
            isDisabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
