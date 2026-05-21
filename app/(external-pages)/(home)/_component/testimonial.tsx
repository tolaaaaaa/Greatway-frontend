"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

type Testimonial = {
  id: string | number;
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
};

type Props = {
  testimonials: Testimonial[];
};

export default function Testimonial({ testimonials }: Props) {
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!swiperRef.current || !prevRef.current || !nextRef.current) return;

    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation],
      slidesPerView: 2,
      spaceBetween: 41,
      loop: true,
      navigation: {
        nextEl: nextRef.current,
        prevEl: prevRef.current,
      },
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 24 },
        768: { slidesPerView: 2, spaceBetween: 41 },
      },
    });

    return () => swiper.destroy();
  }, [testimonials]);

  return (
    <section className="mt-25">
      <div className="app-container py-17.5">
        <div className="flex flex-col gap-4.75">
          {/* Header — centered */}
          <div className="flex flex-col items-center gap-0.75">
            <h3 className="font-bold text-[#06CD70] text-[20px] leading-7.5 tracking-[0.01em] uppercase text-center">
              Testimonials
            </h3>
            <h1 className="font-bold text-[40px] leading-16.25 text-[#FCEEE2] text-center">
              Hear From Our Homeowners
            </h1>
          </div>

          {/* Slider row with flanking arrows */}
          {testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-[#C8C8C8] opacity-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <p className="text-[#C8C8C8] text-[18px] font-medium">
                No testimonials yet.
              </p>
              <p className="text-[#C8C8C8] text-[14px] opacity-50">
                Check back soon to hear from our homeowners.
              </p>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-10.25">
              {/* Left Arrow */}
              <button
                ref={prevRef}
                aria-label="Previous"
                className="shrink-0 w-8.5 h-8.5 rounded-full bg-[#FCEEE2] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#303030"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Swiper — explicitly constrained width */}
              <div className="min-w-0 flex-1">
                <div ref={swiperRef} className="swiper">
                  <div className="swiper-wrapper">
                    {testimonials.map((item) => (
                      <div key={item.id} className="swiper-slide">
                        <div
                          className="bg-black rounded-[28px] flex flex-col gap-9.75"
                          style={{ padding: "28px 40px 22px", height: "331px" }}
                        >
                          {/* Quote marks */}
                          <div className="flex items-center gap-4.25">
                            <div
                              style={{
                                width: "26px",
                                height: "53px",
                                background: "#06CD70",
                                flexShrink: 0,
                                 clipPath:
                                  "polygon(0 0, 100% 0, 100% 75%, 0 100%)",
                              }}
                            />
                            <div
                              style={{
                                width: "26px",
                                height: "53px",
                                background: "#06CD70",
                                flexShrink: 0,
                                clipPath:
                                  "polygon(0 0, 100% 0, 100% 75%, 0 100%)",
                              }}
                            />
                          </div>

                          {/* Quote text */}
                          <p
                            className="text-[#C8C8C8] text-[18px] leading-6.25 font-normal"
                            style={{ fontFamily: "Cambay, sans-serif" }}
                          >
                            {item.quote}
                          </p>

                          {/* Author */}
                          <div className="flex items-center gap-5">
                            <div className="relative w-11 h-11 rounded-[5px] overflow-hidden shrink-0">
                              <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span
                                className="text-[#FCEEE2] font-bold text-[16px] leading-6.25"
                                style={{ fontFamily: "Cambay, sans-serif" }}
                              >
                                {item.name}
                              </span>
                              <span
                                className="text-[#8D8D8D] font-bold text-[16px] leading-6.25"
                                style={{ fontFamily: "Cambay, sans-serif" }}
                              >
                                {item.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Arrow */}
              <button
                ref={nextRef}
                aria-label="Next"
                className="shrink-0 w-8.5 h-8.5 rounded-full bg-[#06CD70] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
