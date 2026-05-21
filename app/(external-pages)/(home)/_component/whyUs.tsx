import { Sparkles, Hammer, ShieldCheck } from "lucide-react";

export default function WhyUs() {
  return (
      <section className="mt-40">
      <div className="app-container">
        <div className="flex flex-col items-center gap-8.75">
          
          {/* Header */}
          <div className="flex flex-col items-center gap-0.5">
            <h3 className="font-bold text-[#06CD70] text-[20px] leading-8.25">
              WHY GREATWAY?
            </h3>
            <h1 className="font-bold text-[40px] leading-16.25 text-[#FCEEE2]">
              A Better Way to Buy Your Next Home
            </h1>
          </div>

          {/* Cards */}
          <div className="flex flex-row items-center gap-11.5">
            
            {/* Card 1 - Trusted Expertise */}
            <div className="flex flex-col items-center gap-10.25 w-89.75">
              <div className="flex flex-col justify-center items-start p-[10px_8px] w-19.75 h-18 bg-[#D6FCDB] rounded-[19px]">
                <Sparkles className="text-[#06CD70] w-16.25 h-10.25" />
              </div>
              <div className="flex flex-col items-center w-full">
                <h2 className="font-bold text-[22px] leading-9 text-[#FCEEE2] text-center font-['Cambay'] w-full">
                  Trusted Expertise
                </h2>
                <p className="text-[20px] leading-7.5 text-[#C8C8C8] text-center font-['Cambay']">
                  Years of industry experience delivering quality real estate.
                </p>
              </div>
            </div>

            {/* Card 2 - Quality Construction */}
            <div className="flex flex-col items-center gap-10.25 w-96.75">
              <div className="flex flex-col justify-center items-start p-[10px_8px] w-19.75 h-18 bg-[#FCDCD6] rounded-[19px]">
                <Hammer className="text-[#E92727] w-14.75 h-14.75" />
              </div>
              <div className="flex flex-col items-center w-full">
                <h2 className="font-bold text-[22px] leading-9 text-[#FCEEE2] text-center font-['Cambay'] w-full">
                  Quality Construction
                </h2>
                <p className="text-[20px] leading-7.5 text-[#C8C8C8] text-center font-['Cambay']">
                  Built with durable materials, modern finishes, and strict attention to detail.
                </p>
              </div>
            </div>

            {/* Card 3 - Secure Investment */}
            <div className="flex flex-col items-center gap-10.25 w-89.75">
              <div className="flex flex-col justify-center items-start p-[10px_8px] w-19.75 h-18 bg-[#D6EBFC] rounded-[19px]">
                <ShieldCheck className="text-[#069BD6] w-15 h-14.5" />
              </div>
              <div className="flex flex-col items-center w-full">
                <h2 className="font-bold text-[22px] leading-9 text-[#FCEEE2] text-center font-['Cambay'] w-full">
                  Secure Investment
                </h2>
                <p className="text-[20px] leading-7.5 text-[#C8C8C8] text-center font-['Cambay']">
                  Every development is engineered for long-term value and structural integrity.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}