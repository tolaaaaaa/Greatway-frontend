import Hero from "./_component/hero";
import WhyUs from "./_component/whyUs";
import AboutUs from "./_component/aboutUs";
import { getProperties } from "@/actions/property.action";
import PropertyProduct from "./_component/properties";
import OurWork from "./_component/ourWork";
import { getGalleries } from "@/actions/gallery.action";
import Stats from "../_component/stats";
import Testimonial from "../_component/testimonial";
import ContactUs from "../_component/contactUs";
import { Suspense } from "react";
import PropertiesSkeleton from "../_component/propertiesSkeleton";
import FadeInSection from "../_component/fadeInSection";

export const dummyTestimonials = [
  {
    id: 1,
    quote: "Buying a home from Greatway Properties was one of the best decisions I've ever made. I moved in with zero stress, and everything looked exactly as promised.",
    name: "Ellen Johansson",
    role: "Happy Customer",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    quote: "The team at Greatway guided us through every step of the process. The quality of the finishing and the attention to detail in our new home is outstanding.",
    name: "Chukwuemeka Obi",
    role: "Homeowner",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    quote: "I was skeptical at first, but Greatway Properties delivered beyond my expectations. The location, design, and value for money are unmatched in Lagos.",
    name: "Amaka Nwosu",
    role: "Property Investor",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    quote: "From the first site visit to collecting my keys, the experience was seamless. I have recommended Greatway to three of my colleagues already.",
    name: "Biodun Adeyemi",
    role: "Happy Customer",
    imageUrl: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    id: 5,
    quote: "Professional, transparent, and reliable. Greatway Properties restored my faith in real estate development in Nigeria. My family couldn't be happier.",
    name: "Ngozi Eze",
    role: "Homeowner",
    imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

export default async function Home() {
  const [gallery, listedProperties, unlistedProperties, soldProperties] =
    await Promise.all([
      getGalleries({ limit: 6 } as PaginationParams),
      getProperties({ status: "listed", limit: 4 }),
      getProperties({ status: "unlisted" }),
      getProperties({ status: "sold" }),
    ]);

  const totalListedUnlistedProperties =
    listedProperties.metadata.total + unlistedProperties.metadata.total;

  return (
    <>
      <Hero />

      <FadeInSection>
        <WhyUs />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <AboutUs />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <Stats
          soldProperties={soldProperties.metadata.total ?? 0}
          totalProperties={totalListedUnlistedProperties ?? 0}
          listedProperties={listedProperties.metadata.total ?? 0}
        />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <Suspense fallback={<PropertiesSkeleton />}>
          <PropertyProduct property={listedProperties.items} />
        </Suspense>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <OurWork gallery={gallery.items} />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <Testimonial testimonials={dummyTestimonials} />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <ContactUs />
      </FadeInSection>
    </>
  );
}