"use client";

import { Admin } from "@/app/dashboard/settings/(tabs)/admin/_component/adminTable";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextType {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (value: boolean) => void;
  editingAdmin: Admin | null;
  setEditingAdmin: (admin: Admin | null) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (value: boolean) => void;
  admins: Admin[];
  setAdmins: (admins: Admin[]) => void;
  refreshAdmins: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);

  const refreshAdmins = async () => {
    // Fetch admins from API
    // const response = await fetch('/api/admins');
    // const data = await response.json();
    // setAdmins(data);
    console.log("Refreshing admins...");
  };

  return (
    <AdminContext.Provider
      value={{
        isAddModalOpen,
        setIsAddModalOpen,
        editingAdmin,
        setEditingAdmin,
        isEditModalOpen,
        setIsEditModalOpen,
        admins,
        setAdmins,
        refreshAdmins,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within AdminProvider");
  }
  return context;
}