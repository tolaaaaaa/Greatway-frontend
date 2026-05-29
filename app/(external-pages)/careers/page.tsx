import { getCareers } from "@/actions/career.action";
import HeroCareer from "./_component/heroCareer";
import ExternalCareer from "./_component/externalCareer";
import ContactUs from "../_component/contactUs";

export default async function page() {
    const careers = await getCareers({
        limit: 13,
        page: Number(1),
        status: "open"
    })
    return (
       <>
       <HeroCareer />
       <ExternalCareer career={careers} />
       <ContactUs />
       </>
    )
}