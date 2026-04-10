import PropertiesDetails from "./_component/propertiesDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
   
    return <PropertiesDetails  />
}