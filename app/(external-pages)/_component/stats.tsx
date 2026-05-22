import Image from "next/image";

type Props = {
    totalProperties: number;
    listedProperties: number;
    soldProperties: number;
    use25?: boolean; 
}

export default function Stats({ totalProperties, listedProperties, soldProperties, use25 }: Props) {
  return (
    <section className={`${use25 ? 'mt-25' : 'mt-60'} relative w-full h-57 overflow-hidden`}>
      {/* Background image with green overlay */}
      <div className="absolute inset-0">
        <Image
          src={"/numbers.svg"}
          alt="Numbers"
          fill
          className="object-cover"
        />
        {/* Green overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(6, 205, 112, 0.3)" }}
        />
      </div>

      {/* Stats content */}
      <div className="relative z-10 h-full flex items-center justify-around app-container">
        <div className="flex flex-col items-center">
          <p className="font-bold text-[40px] text-[#8D600B]">{totalProperties.toLocaleString()}</p>
          <p className="text-[16px] text-black">Homes for Sale</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-bold text-[40px] text-[#8D600B]">{listedProperties.toLocaleString()}</p>
          <p className="text-[16px] text-black">Open Houses</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-bold text-[40px] text-[#8D600B]">{soldProperties.toLocaleString()}</p>
          <p className="text-[16px] text-black">Recently Sold</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-bold text-[40px] text-[#8D600B]">9.5/10</p>
          <p className="text-[16px] text-black">User Satisfaction</p>
        </div>
      </div>
    </section>
  );
}