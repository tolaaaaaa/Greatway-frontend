import { getProperties } from "@/actions/property.action";
import Stats from "../_component/stats";
import About from "./_component/about";
import AboutHero from "./_component/aboutHero";
import Leadership from "./_component/leadership";
import Location from "./_component/location";
import Testimonial from "../_component/testimonial";
import { dummyTestimonials } from "../(home)/page";
import ContactUs from "../_component/contactUs";
import FadeInSection from "../_component/fadeInSection";

export default async function page() {
  const listedProperties = await getProperties({ status: "listed", limit: 4 });
  const unlistedProperties = await getProperties({ status: "unlisted" });
  const soldProperties = await getProperties({ status: "sold" });
  const totalListedUnlistedProperties =
    listedProperties.metadata.total + unlistedProperties.metadata.total;

  return (
    <>
      <AboutHero />

      <FadeInSection>
        <About />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <Leadership />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <Location />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <Stats
          soldProperties={soldProperties.metadata.total ?? 0}
          totalProperties={totalListedUnlistedProperties ?? 0}
          listedProperties={listedProperties.metadata.total ?? 0}
          use25={true}
        />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <Testimonial testimonials={dummyTestimonials} usePadding={false} />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <ContactUs />
      </FadeInSection>
    </>
  );
}