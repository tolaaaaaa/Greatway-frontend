"use client"

import { forgotPassword } from "@/actions/auth.actions"
import { Button, customToast, Input } from "@/app/component/ui"
import { ForgotPasswordFormState } from "@/validations/auth/forgotPassword.validation"
import Image from "next/image"
import Link from "next/link"
import { useActionState, useEffect } from "react"

const initialState: ForgotPasswordFormState = {
    values: {
        email: "",
    },
    error: "",
    errors: {}
}

export function ForgotPasswordForm() {
    const [{ error, errors, values, success }, dispatch, isPending] = useActionState(forgotPassword, initialState)

     useEffect(() => {
        if(error) {
          customToast.error(error)
        }

        if (success) {
            customToast.success("Password reset link sent, check your email")
        }
      }, [error, success, customToast])

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
              Forgot Password
            </p>
          </div>

          <Input
            key={`email-${errors.email}`}
            name="email"
            label="Email"
            type="email"
            placeholder="hello@example.com"
            value={values.email}
            error={errors.email}
          />

          <Button type="submit" variant="primary" size="lg" fullWidth isPending={isPending}>
            Send Reset Link
          </Button>
        </form>

        <div>
          <p className="font-normal text-[16px]">
            <Link href="/login" className="text-[16px] font-bold text-accent">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}