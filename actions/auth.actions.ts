"use server";
import { redirect } from "next/navigation";
import { createSession, deleteSession, getSession } from "@/lib/session";
import {
  RegisterFormErrors,
  RegisterFormState,
  registerSchema,
} from "@/validations/auth/register.validation";
import { formatError } from "@/utils/formating";
import { ServerApiClient } from "@/utils/api-server";
import { revalidateTag } from "next/cache";
import { tag } from "@/tags/user.tag";
import { LoginFormState } from "@/validations/auth/login.validation";
import { VerifyEmailFormErrors, VerifyEmailFormState, verifyEmailSchema } from "@/validations/auth/verifyEmail.validation";
import { ForgotPasswordFormErrors, ForgotPasswordFormState, forgotPasswordSchema } from "@/validations/auth/forgotPassword.validation";
import { ResetPasswordFormErrors, ResetPasswordFormState, ResetPasswordFormValues, resetPasswordSchema } from "@/validations/auth/resetPassword.validation";

export async function login(__prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const response = await ServerApiClient.post<LoginResponseType>(
    "/auth/login/admin",
    credentials,
     { skipAuthRedirect: true }
  );

  console.log(response)

  if (response.code >= 400) {
    if (response.code === 401) {
      redirect(`/verify-email?email=${encodeURIComponent(credentials.email)}`);
    }
    return { error: response.message, errors: {}, values: credentials };
  }



  await createSession({
    id: response.data.user.id,
    fullName: response.data.user.fullName,
    email: response.data.user.email,
    role: response.data.user.role,
    accessToken: response.data.tokens.accessToken,
    refreshToken: response.data.tokens.refreshToken,
  });

  redirect("/dashboard");
}

export async function register(
  __prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const credentials = {
    email: formData.get("email") as string,
    fullName: formData.get("fullName") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };


  const result = registerSchema.safeParse(credentials);


  if (!result.success) {
    const errors = formatError<RegisterFormErrors, RegisterFormState["values"]>(
      result.error,
    );
    return { error: "", errors, values: credentials };
  }

  const response = await ServerApiClient.post<registerResponse>(
    `/auth/register/admin`,
    credentials,
  );


  if (response.code >= 400) {
    return { error: response.message, errors: {}, values: credentials };
  }

  revalidateTag(tag.default, {});
  redirect("/verify-email");
}


export async function verifyEmail(__PrevState: VerifyEmailFormState, formData: FormData): Promise<VerifyEmailFormState> {
  const body = {
    code: formData.get("code") as string,
  }

  const result = verifyEmailSchema.safeParse(body)

  if (!result.success) {
    const errors = formatError<VerifyEmailFormErrors, VerifyEmailFormState["values"]>(
      result.error,
    );
    return { error: "", errors, values: body };
  }

  const response = await ServerApiClient.post<verifyEmailResponse>(`/auth/verify-email`,
    result.data
  )

  if (response.code >= 400) {
    return { error: response.message, errors: {}, values: result.data };
  }


  redirect(`/login`);
}

export async function forgotPassword(__prevState: ForgotPasswordFormState, formData: FormData): Promise<ForgotPasswordFormState> {
  const body = {
    email: formData.get("email") as string,
  }

  const result = forgotPasswordSchema.safeParse(body)

  if (!result.success) {
    const errors = formatError<ForgotPasswordFormErrors, ForgotPasswordFormState["values"]>(
      result.error,
    );
    return { error: "", errors, values: body };
  }

  const response = await ServerApiClient.post<forgotPasswordResponse>(`/auth/forgot-password`,
    result.data
  )

  if (response.code >= 400) {
    return { error: response.message, errors: {}, values: result.data };
  }


  return { error: "", success: true, errors: {}, values: result.data };
}

export async function resendOtp(email: string): Promise<boolean> {
  const response = await ServerApiClient.post('/auth/resend-otp', {email: email})

  if (response.code >= 400) {
    console.log(response)
    return false
  }

  return true
}

export async function resetPassword(__PrevState: ResetPasswordFormState, formData: FormData): Promise<ResetPasswordFormState> {
  const body = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string
  }

  const result = resetPasswordSchema.safeParse(body)

  if (result.error) {
    const errors = formatError<ResetPasswordFormErrors, ResetPasswordFormValues>(result.error)
    return { error: "", errors, values: body };
  }
  
  const token = formData.get("token") as string

   await createSession({
    id: "",
    fullName: "",
    email: "",
    role: "user",
    accessToken: token,
    refreshToken: "",
  })

  const response = await ServerApiClient.patch<resetPasswordResponse>('/auth/reset-password', result.data)

  if (response.code >= 400) {
     return { error: response.message, errors: {}, values: result.data };
  }

  await deleteSession()

  redirect("/login")
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function getAuthUser() {
  const session = await getSession();
  if (!session) return null;

  return {
    id: session.id,
    fullName: session.fullName,
    email: session.email,
    role: session.role,
  } satisfies AuthUser;
}
