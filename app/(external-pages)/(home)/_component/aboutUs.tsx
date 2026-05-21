import { Button } from "@/app/component/ui";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="mt-40">
      <div className="app-container">
        <div className="flex justify-between gap-50">
          <div className="relative w-full">
            <div>
              <Image
                src={"/about1.svg"}
                alt="About Us"
                height={600}
                width={400}
              />
            </div>

            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
              <Image
                src={"/about2.svg"}
                alt="About Us"
                height={340}
                width={300}
              />
            </div>
          </div>
          <div className="flex justify-center flex-col items-start space-y-6">
            <div>
              <h3 className="text-accent font-bold uppercase text-[20px]">
                About us
              </h3>
              <h1 className="font-bold text-[40px] text-[#FCEEE2] leading-13.75 tracking-[0.01em] ">
                Building Homes That Stand the Test of Time
              </h1>
            </div>
            <p className="font-normal text-[20px] text-[#C8C8C8]">
              Greatway Properties is a trusted real estate development company
              specializing in building high-quality homes from the ground up. We
              oversee every stage — design, construction, and finishing — to
              deliver modern, durable, and comfortable living spaces you’ll be
              proud to own.
            </p>
            <Link href={"/about"}>
              <Button className="text-[18px] font-bold py-6 px-6">
                Read More About Greatway
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
