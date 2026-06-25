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

type ResetSessionPayload = {
  email: string;
  token: string;
  expiresAt: Date;
}

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


type verifyEmailResponse = {
  message: string
}

type forgotPasswordResponse = {
  message: string
}

type resendOtp = {
  message: string
}

type resetPasswordResponse = {
  message: string
}