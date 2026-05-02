import { getProperty } from "@/actions/property.action";
import EditProperty from "./_component/editProperty";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-4">
        <h2 className="text-2xl font-bold">Property Not Found</h2>
        <p className="text-muted">
          The property you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }


  return <EditProperty property={property} />;
}