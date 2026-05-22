"use client";
import { Button } from "@/app/component/ui";
import Image from "next/image";
import Link from "next/link";
import SearchFilter from "../../_component/searchFilter";

export default function AboutHero() {
  return (
    <section className="relative w-full h-screen">
      <Image
        src="./aboutpage.svg"
        alt="About Page"
        fill
        className="object-cover"
      />

      <div className="relative z-10 h-full flex items-center">
        <div className="app-container w-full">
          <div className="flex flex-col gap-3.25">
            <h1 className="w-170 font-bold text-[50px] leading-15 tracking-[0.02em] text-white">
              We Provide The Best Property For You
            </h1>
            <p className="font-normal text-[20px] leading-7 text-white w-175">
              Greatway Properties is a trusted real estate development company
              specializing in building high-quality homes from the ground up. We
              oversee every stage — design, construction, and finishing — to
              deliver modern, durable, and comfortable living spaces you’ll be
              proud to own.
            </p>

            <Link href={"/properties"}>
              <Button
                variant="primary"
                className="rounded-md font-bold text-[18px] py-6 px-6 inline-flex justify-center items-center"
              >
                View Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
          <SearchFilter  display="whatsapp"/>
    </section>
  );
}
