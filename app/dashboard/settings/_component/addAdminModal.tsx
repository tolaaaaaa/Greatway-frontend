// app/dashboard/settings/_component/addAdminModal.tsx
"use client";

import { Modal } from "@/app/component/ui";
import { Input } from "@/app/component/ui";
import { Button } from "@/app/component/ui";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

interface AdminFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
}

const options = [
  { label: "Admin", key: "admin" },
  { label: "Super Admin", key: "super admin" },
];

export default function AddAdmin({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState<AdminFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "admin",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add your API call here
      console.log("Creating admin:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and close modal
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        role: "admin",
        password: "",
      });
      onClose();

      // Show success message (you can add toast here)
      console.log("Admin created successfully");
    } catch (error) {
      console.error("Error creating admin:", error);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Admin" size="lg">
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
          label="Password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          labelClassName="font-medium text-[16px]"
        />

        <div className="space-y-2">
          <Input
            type="select"
            options={options}
            name="role"
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
            {isLoading ? "Creating..." : "Add New Admin"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
