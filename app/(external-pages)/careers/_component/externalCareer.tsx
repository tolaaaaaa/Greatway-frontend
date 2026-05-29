import { X } from "lucide-react";
import CareerCard from "./careerCard";

type Props = {
  career: Pagination<Career>;
};

export default function ExternalCareer({ career }: Props) {
  const hasNoCareers = !career?.items || career.items.length === 0;

  if (hasNoCareers) {
    return (
      <section className="mt-25">
        <div className="app-container">
          <div className="flex flex-col items-center justify-center gap-6 py-10 text-center">
            <div className="w-20 h-20 rounded-full  flex items-center justify-center">
              <X className="w-16 h-16 text-[#C8C8C8] opacity-30" />
            </div>
            <h2
              className="text-[#C8C8C8] font-bold text-[29px] text-center"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              No Open Positions Available
            </h2>
            <p
              className="text-[#C8C8C8] font-normal text-[18px] text-center max-w-103"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              We don't have any active career opportunities at the moment. 
              Please check back later for updates on new roles.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-25">
      <div className="app-container">
        <div className="flex flex-col gap-6">
          {career.items.map((career, idx) => (
            <CareerCard career={career} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}