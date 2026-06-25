"use client"

import { resetPassword } from "@/actions/auth.actions"
import { Button, customToast, Input } from "@/app/component/ui"
import { ResetPasswordFormState } from "@/validations/auth/resetPassword.validation"
import Image from "next/image"
import Link from "next/link"
import { useActionState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

const initialState: ResetPasswordFormState = {
    values: {
        password: "",
        confirmPassword: ""
    },
    error: "",
    errors: {}
}

export default function ResetPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [{ error, errors, values }, dispatch, isPending] = useActionState(resetPassword, initialState)

    useEffect(() => {
        if (error) {
            customToast.error(error)
        }
    }, [error])

    return (
        <main className="flex flex-col flex-1 items-center justify-center bg-background font-cambay">
            <div className="p-10 bg-surface rounded-lg w-full max-w-md space-y-6 flex flex-col justify-center items-center">
                <form action={dispatch} className="grid grid-cols-1 gap-5 w-full">

                    {/* attach token as hidden input */}
                    <input type="hidden" name="token" value={token ?? ""} />

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
                            Reset Password
                        </p>
                    </div>

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
                        Reset Password
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
    )
}