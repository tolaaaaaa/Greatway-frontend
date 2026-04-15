import EditProperty from "./_component/editProperty";
import { Bed, Bath, CarFront, Square } from "lucide-react";
import { PropertiesDetailsProps, salesProps } from "../_component/propertiesDetails";

const property: PropertiesDetailsProps & { sales: salesProps } = {
  id: "1",
  url: ["/list4.png", "/list3.png", "/list2.png", "/list1.png"],
  title: "Residential Property in Lekki",
  location: "Lekki, Lagos",
  price: 500000000,
  createdAt: "20/05/2025",
  description: "Beautiful residential property in a prime location in Lekki.",
  status: "listed",
  video: "/testvideo.mp4",
  features: [
    { item: "4 Bedrooms", icon: <Bed size={16} /> },
    { item: "3 Bathrooms", icon: <Bath size={16} /> },
    { item: "Garage", icon: <CarFront size={16} /> },
    { item: "3 Square Feet", icon: <Square size={16} /> },
  ],
  sales: {
    id: "1",
    url: "/sales.png",
    title: "John Doe",
    role: "Sales Agent",
    phoneNumber: "+234 123 4567",
    whatsappNumber: "+234 123 4567",
  },
};

export default function Page() {
  return <EditProperty property={property} />;
}