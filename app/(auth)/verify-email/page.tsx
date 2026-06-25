import { Suspense } from "react";
import VerifyEmail from "./_component/verifyEmailForm";

export default function Page() {
    return (
        <Suspense>
            <VerifyEmail />
        </Suspense>
    )

}