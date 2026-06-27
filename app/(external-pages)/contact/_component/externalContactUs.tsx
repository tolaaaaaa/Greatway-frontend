"use client";
import { useActionState, useEffect } from "react";
import { Button, FieldInput, FieldWrapper, customToast } from "@/app/component/ui";
import { Mail, MapPin, Phone } from "lucide-react";
import { CreateContactUsFormState } from "@/validations/contact-us/create-contact-us.validation";
import { createContactUs } from "@/actions/contact-us.action";

const initialValues: CreateContactUsFormState = {
  errors: {},
  values: {
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  },
};

export default function ExternalContactUs() {
  const [{ errors, values, error, success }, dispatch, isPending] = useActionState(createContactUs, initialValues);

  useEffect(() => {
    if (error) {
      customToast.error(error);
    }
  }, [error]);

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
          <div className="lg:w-1/2 bg-black/50 p-6 rounded-lg">
            {success ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  className="text-white font-bold text-[22px] text-center"
                  style={{ fontFamily: "Cambay, sans-serif" }}
                >
                  Message Sent!
                </h2>
                <p
                  className="text-white font-normal text-[15px] text-center max-w-80"
                  style={{ fontFamily: "Cambay, sans-serif" }}
                >
                  Thank you for reaching out. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form action={dispatch} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <FieldWrapper>
                    <FieldInput
                      name="fullName"
                      placeholder="Your Name"
                      defaultValue={values?.fullName}
                    />
                  </FieldWrapper>
                  {errors?.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldWrapper>
                    <FieldInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      defaultValue={values?.email}
                    />
                  </FieldWrapper>
                  {errors?.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldWrapper>
                    <FieldInput
                      type="tel"
                      name="phoneNumber"
                      placeholder="Your Phone"
                      defaultValue={values?.phoneNumber}
                    />
                  </FieldWrapper>
                  {errors?.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div
                    className="flex flex-row items-start gap-5 px-3.25 pt-4.75 pb-4.75 w-full transition-all duration-200 ease-in-out hover:border-(--accent)/70 focus-within:border-focus focus-within:shadow-[0_0_0_2px_oklch(62.04%_0.1950_145.09/0.15)] rounded-[7px]"
                    style={{ border: "1px solid #C2C2C2" }}
                  >
                    <textarea
                      name="message"
                      placeholder="Message"
                      defaultValue={values?.message}
                      className="bg-transparent text-white placeholder:text-white text-[16px] leading-6.5 outline-none w-full resize-none min-h-37.5"
                      style={{ fontFamily: "Cambay, sans-serif" }}
                    />
                  </div>
                  {errors?.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full py-5.5"
                  isDisabled={isPending}
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}