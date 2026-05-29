import { Dispatch, SetStateAction } from "react";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  inspectionDate: string;
  inspectionTime: string;
  message: string;
};

const emptyValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  inspectionDate: "",
  inspectionTime: "",
  message: "",
};

type Props = {
    setSuccess: (Dispatch<SetStateAction<boolean>>),
    setValues: (Dispatch<SetStateAction<FormValues>>)
}

export default function BookSuccess({setSuccess,setValues}: Props) {
    return (
      <section className="mt-25">
        <div className="app-container py-10">
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <div className="w-20 h-20 rounded-full bg-[#06CD70] flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
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
              className="text-white font-bold text-[29px] text-center"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Booking Confirmed!
            </h2>
            <p
              className="text-white font-normal text-[18px] text-center max-w-103"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Your inspection booking has been sent successfully. We will be in
              touch shortly.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setValues(emptyValues);
              }}
              className="w-85.25 py-3.5 bg-[#06CD70] rounded-[10px] text-white font-bold text-[20px] text-center cursor-pointer hover:bg-[#05b862] transition-colors"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Book Another
            </button>
          </div>
        </div>
      </section>
    );
}