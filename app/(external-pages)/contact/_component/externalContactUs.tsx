"use client";
import { useState } from "react";
import { Button, FieldInput, FieldWrapper } from "@/app/component/ui";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const emptyValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ExternalContactUs() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key: keyof FormValues, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    setIsPending(true);
    // TODO: wire up your API endpoint here
    await new Promise((res) => setTimeout(res, 1500));
    setIsPending(false);
    setSuccess(true);
    setValues(emptyValues)
  };



  return (
    <section className="mt-25">
      <div className="app-container">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Left Column - Contact Info */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h2 className="font-bold text-[30px] text-accent uppercase">
                Contact Us
              </h2>
              <h1 className="font-bold text-[40px]">Get In Touch With Us</h1>
            </div>

            <p className="font-normal text-[20px] text-gray-300">
              We're here to help you take the next step toward owning a Greatway
              home. Whether you have questions, need more information about our
              developments, or want to schedule a visit, our team is ready to
              assist you. Reach out to us through any of our contact channels,
              and we'll respond as quickly as possible.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-start">
                <div className="bg-accent p-3.5 rounded-lg shrink-0">
                  <Phone className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[20px]">Phone Number</h3>
                  <p className="font-normal text-base text-[#C8C8C8]">
                    (+234) 08101163182
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-accent p-3.5 rounded-lg shrink-0">
                  <MapPin className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[20px]">Our Location</h3>
                  <p className="font-normal text-base text-[#C8C8C8]">
                    3, Ogunlesi street, Onipanu
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-accent p-3.5 rounded-lg shrink-0">
                  <Mail className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[20px]">Email Address</h3>
                  <p className="font-normal text-base text-[#C8C8C8]">
                    info@greatwayproperties.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:w-1/2 bg-black/50 p-6 rounded-lg space-y-4">
            <FieldWrapper>
              <FieldInput
                placeholder="Your Name"
                value={values.name}
                onChange={(val) => set("name", val)}
              />
            </FieldWrapper>

            <FieldWrapper>
              <FieldInput
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={(val) => set("email", val)}
              />
            </FieldWrapper>

            <FieldWrapper>
              <FieldInput
                type="tel"
                placeholder="Your Phone"
                value={values.phone}
                onChange={(val) => set("phone", val)}
              />
            </FieldWrapper>

            <div
              className="flex flex-row items-start gap-5 px-3.25 pt-4.75 pb-4.75 w-full transition-all duration-200 ease-in-out hover:border-(--accent)/70 focus-within:border-focus focus-within:shadow-[0_0_0_2px_oklch(62.04%_0.1950_145.09/0.15)] rounded-[7px]"
              style={{
                border: "1px solid #C2C2C2",
              }}
            >
              <textarea
                placeholder="Message"
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                className="bg-transparent text-white placeholder:text-white text-[16px] leading-6.5 outline-none w-full resize-none min-h-37.5"
                style={{ fontFamily: "Cambay, sans-serif" }}
              />
            </div>

            <Button 
              size="lg" 
              className="w-full py-5.5" 
              onClick={handleSubmit}
              isDisabled={isPending}
            >
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}