type UserRole = "admin" | "user" | "super_admin";

type SessionPayload = {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
};

type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
};

type LoginResponseType = {
  user: AuthUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

type registerResponse = {
  token: string;
};
