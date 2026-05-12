type User = {
  id: string;
  fullName: string;
  email: string;
  password: string
  status: UserStatus
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};


type UserRole = "user" | "admin" | "super_admin"
type UserStatus = "active" | "inactive"