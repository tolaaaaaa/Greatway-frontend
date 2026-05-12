"use client";

import { Modal, Input, Button, customToast } from "@/app/component/ui";
import { useActionState, useEffect, useTransition, useState } from "react";
import { createUser } from "@/actions/user.action";
import { CreateUserFormState, CreateUserFormValues } from "@/validations/user/create-user.validation";

const roleOptions = [
  { label: "Admin", key: "admin" },
  { label: "Super Admin", key: "super_admin" },
];

const statusOptions = [
  { label: "Active", key: "active" },
  { label: "Inactive", key: "inactive" },
];

const emptyValues: CreateUserFormValues = {
  fullName: "",
  email: "",
  password: "",
  role: "" as any,
  status: "" as any,
};

const initialState: CreateUserFormState = {
  error: "",
  errors: {},
  values: emptyValues,
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddAdminModal({ isOpen, onClose }: Props) {
  const [isTransitioning, startTransition] = useTransition();
  const [formValues, setFormValues] = useState<CreateUserFormValues>(emptyValues);
  const [{ error, errors }, dispatch, isPending] = useActionState(createUser, initialState);

  useEffect(() => {
    if (isOpen) setFormValues(emptyValues);
  }, [isOpen]);

  useEffect(() => {
    if (error) customToast.error(error);
  }, [error]);

  const set = (key: keyof CreateUserFormValues, value: string) =>
    setFormValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", formValues.fullName);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("role", formValues.role);
    formData.append("status", formValues.status);
    startTransition(() => dispatch(formData));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Admin" size="lg">
      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <div className="flex justify-between gap-6">
          <Input
            name="fullName"
            label="Full Name"
            placeholder="Enter full name"
            value={formValues.fullName}
            onChange={(val) => set("fullName", val)}
            error={errors?.fullName}
            labelClassName="font-medium text-[16px]"
          />
          <Input
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            value={formValues.email}
            onChange={(val) => set("email", val)}
            error={errors?.email}
            labelClassName="font-medium text-[16px]"
          />
        </div>

        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          value={formValues.password}
          onChange={(val) => set("password", val)}
          error={errors?.password}
          labelClassName="font-medium text-[16px]"
        />

        <div className="grid grid-cols-2 gap-6">
          <Input
            type="select"
            options={roleOptions}
            name="role"
            label="Assign Role"
            value={formValues.role}
            onChange={(val) => set("role", val)}
            error={errors?.role}
            labelClassName="font-medium text-[16px]"
          />
          <Input
            type="select"
            options={statusOptions}
            name="status"
            label="Status"
            value={formValues.status}
            onChange={(val) => set("status", val)}
            error={errors?.status}
            labelClassName="font-medium text-[16px]"
          />
        </div>

        <div className="flex justify-between gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            className="border-red-700 text-red-700 border rounded-full w-full"
            onClick={onClose}
            isDisabled={isPending || isTransitioning}
          >
            Cancel
          </Button>
          <Button
            className="w-full rounded-full"
            type="submit"
            isPending={isPending || isTransitioning}
            isDisabled={isPending || isTransitioning}
          >
            Add New Admin
          </Button>
        </div>
      </form>
    </Modal>
  );
}