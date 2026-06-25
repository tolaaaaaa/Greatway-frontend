"use client"

import { verifyEmail, resendOtp } from "@/actions/auth.actions"
import { Button, customToast, Input } from "@/app/component/ui"
import { VerifyEmailFormState } from "@/validations/auth/verifyEmail.validation"
import Image from "next/image"
import { useActionState, useEffect } from "react"
import { useSearchParams } from "next/navigation"


const initialState: VerifyEmailFormState = {
    values: {
        code: ""
    },
    error: "",
    errors: {}
}

export default function VerifyEmail() {
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    const [{ error, errors, values }, dispatch, isPending] = useActionState(
        verifyEmail,
        initialState
    );

    useEffect(() => {
        if (error) {
            customToast.error(error)
        }
    }, [error])


    async function handleResend() {
        if (!email) return
        const result = await resendOtp(email)

        if (!result) {
            customToast.error("Something went wrong try again")
            return
        }

        customToast.success("Verification code sent")
    }

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
                            Email Verification
                        </p>
                        {email && (
                            <p className="text-sm text-muted">
                                Sending code to <span className="font-semibold">{email}</span>
                            </p>
                        )}
                    </div>

                    <Input
                        key={`code-${errors.code}`}
                        name="code"
                        label="Verification Code"
                        type="text"
                        placeholder="Enter your verification code"
                        value={values.code}
                        error={errors.code}
                    />

                    <Button type="submit" variant="primary" size="lg" fullWidth isPending={isPending}>
                        Verify
                    </Button>
                </form>

                {email && (
                    <div className="flex items-center gap-1 text-sm text-muted">
                        <span>Didn't receive a code?</span>
                        <button
                            type="button"
                            onClick={handleResend}
                            className="text-accent underline hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            Resend
                        </button>
                    </div>
                )}
            </div>
        </main>
    )
}