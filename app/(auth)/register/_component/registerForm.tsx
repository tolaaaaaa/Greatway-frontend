"use client";

import { register } from "@/actions/auth.actions";
import { Button, customToast, Input } from "@/app/component/ui";
import { RegisterFormState } from "@/validations/auth/register.validation";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";

const initialState: RegisterFormState = {
  values: {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  error: "",
  errors: {},
};

export default function RegisterForm() {
  const [{ error, errors, values }, dispatch, isPending] = useActionState(
    register,
    initialState,
  );

  useEffect(() => {
    if(error) {
      customToast.error(error)
    }
  }, [error, customToast])

  return (
    <main className="flex flex-col flex-1 items-center justify-center bg-background font-cambay">
      <div className="p-10 bg-surface rounded-lg w-full max-w-md space-y-6 flex flex-col justify-center items-center">
        <form action={dispatch} className="grid grid-cols-1 gap-5 w-full">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-accent-soft-hover blur-xl transition-all duration-200" />
              <div className="flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Gateway logo"
                  width={150}
                  height={50}
                />
              </div>
            </div>
            <p className="font-normal text-[20px] text-muted">
              Create an admin account.
            </p>
          </div>

          <Input
            key={`fullName-${errors.fullName}`}
            name="fullName"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={values.fullName}
            error={errors.fullName}
          />
          <Input
            key={`email-${errors.email}`}
            name="email"
            label="Email"
            type="email"
            placeholder="hello@example.com"
            value={values.email}
            error={errors.email}
          />
          <Input
            key={`password-${errors.password}`}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            error={errors.password}
          />
          <Input
            key={`confirmPassword-${errors.confirmPassword}`}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            error={errors.confirmPassword}
          />

          <Button type="submit" variant="primary" size="lg" fullWidth isPending={isPending}>
            Sign Up
          </Button>
        </form>

        <div>
          <p className="font-normal text-[16px]">
            Already a user?{" "}
            <Link href="/login" className="text-[16px] font-bold text-accent">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}