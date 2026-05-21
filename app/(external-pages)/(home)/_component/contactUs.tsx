import { Button, Input } from "@/app/component/ui";

export default function ContactUs() {
  return (
    <section className="mt-25">
      <div className="app-container py-17.5">
        <div className="bg-accent flex justify-between items-center rounded-2xl p-10">
          <div>
            <h1 className="font-bold text-[30px]">Do you have any questions?</h1>
            <p className="font-normal text-[20px]">Enter your email address and get started</p>
          </div>

          <div className="flex items-center bg-white rounded-lg overflow-hidden w-full max-w-md p-1.5">
            <Input
              name="email"
              placeholder="Enter your email"
              type="email"
              className="bg-white border-none shadow-none text-black hover:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="pr-1">
              <Button>Continue</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}