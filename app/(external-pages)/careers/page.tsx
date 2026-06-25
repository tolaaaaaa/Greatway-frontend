import { getCareers } from "@/actions/career.action";
import HeroCareer from "./_component/heroCareer";
import ExternalCareer from "./_component/externalCareer";
import ContactUs from "../_component/contactUs";
import FadeInSection from "../_component/fadeInSection";

export default async function page() {
    const careers = await getCareers({
        limit: 13,
        page: Number(1),
        status: "open"
    })
    return (
        <>
            <HeroCareer />
            <FadeInSection>
                <ExternalCareer career={careers} />
            </FadeInSection>
            <FadeInSection>
                <ContactUs />
            </FadeInSection>
        </>
    )
}