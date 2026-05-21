import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import SearchFilter from "./searchFilter";

export default function Hero() {
  return (
    <section className="relative w-full h-screen">
      <Image src="./hero.svg" alt="hero banner" fill className="object-cover" />

      <div className="relative z-10 h-full flex items-center">
        <div className="app-container w-full">
          <div className="flex flex-col gap-3.25">
            <h1 className="w-170 font-bold text-[50px] leading-15 tracking-[0.02em] text-[#070707]">
              Find Your{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(to top, #06CD70 50%, transparent 50%)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 45%",
                  backgroundPosition: "0 60%",
                  display: "inline",
                  lineHeight: "inherit",
                }}
              >
                Perfect Home
              </span>{" "}
              with Greatway Properties
            </h1>

            <p className="font-normal text-[20px] leading-7 text-[#070707] w-175">
              Discover premium, secure, and affordable homes built by Greatway
              Properties. With no third-party agents involved, you get trusted
              quality, transparent processes, and a seamless path to owning your
              dream home.
            </p>

            <div className="flex gap-4.5">
              <Link href={"/properties"}>
                <Button
                  variant="primary"
                  className="rounded-md font-bold text-[18px] py-6 px-6 inline-flex justify-center items-center"
                >
                  Explore our Homes
                </Button>
              </Link>
              <Link href={"/contact"}>
                <Button
                  variant="outline"
                  className="rounded-md font-bold text-black text-[18px] py-6 px-6 inline-flex justify-center items-center"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SearchFilter />
    </section>
  );
}
