import { Button, Checkbox, Input } from "@/app/component/ui";
import Image from "next/image";
import Link from "next/link";

// const initialState: LoginFormState = {
//    values: {
//       email: '',
//       password: ''
//    },
//    error: '',
//    errors: {}
// }

export default function LoginForm() {
  return (
    <main className="flex flex-col flex-1 items-center  justify-center bg-background font-cambay">
      <div className="p-10 bg-surface  rounded-lg w-full max-w-md space-y-6 flex flex-col justify-center items-center">
        <form
          action=""
          className="grid grid-cols-1 gap-5 w-full"
        >
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
           

            <p className="font-normal text-[20px] text-muted ">Sign into your admin account.</p>
          </div>
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="hello@example.com"
            // value={}
            // error={}
          />

          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            // value={}
            // error={}
          />

          <div className="flex justify-between">
            <Checkbox
              id="remember"
              name="remember"
              value="yes"
              label="Remember me"
            />

            <Link href="/forgot-password" className="text-sm text-danger">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth>
            Sign In
          </Button>
        </form>
        <div>
          <p className="font-normal text-[16px]">
            New User?{" "}
            <Link href="/register" className="text-[16px] font-bold text-accent">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
