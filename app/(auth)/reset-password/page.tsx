import { Suspense } from "react";
import ResetPasswordForm from "./_component/resetPasswordForm";

export default function Page() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}