import Image from "next/image";

export default function Location() {
  return (
    <section className="mt-25 ">
      <div className="app-container">
        <div className="flex justify-between items-center gap-20">
          <div className="w-1/2">
            <Image
              src={"/location.png"}
              alt="Location"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col space-y-4 w-1/2">
            <h2 className="text-accent font-bold text-[20px]">Find Greatway</h2>
            <h1 className="text-[40px] text-[#E2FCF0] font-bold">Office Location</h1>
            <p className="text-[16px] leading-8 font-normal">
              Greatway Properties operates from our modern and accessible head
              office located at insert full office address. Our office serves as
              the central hub for all client interactions, project coordination,
              and administrative operations. It is designed to provide a
              comfortable and professional environment for homeowners and
              prospective buyers. Visitors are welcome to walk in for inquiries,
              property consultations, or to schedule guided tours of our
              available developments. Our team is always on ground to provide
              personalized assistance, helping you understand our building
              standards, available home options, and purchase process.
            </p>

            <p className="text-[16px] leading-8 font-normal">
              For enquires: <span className="text-accent">info@yemsayspropertiesandinvestment.com</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
