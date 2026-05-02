import { getCareer } from "@/actions/career.action";
import EditJob from "./_component/edit";


export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const career = await getCareer(id);

  if (!career) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-4">
        <h2 className="text-2xl font-bold">Career Not Found</h2>
        <p className="text-muted">
          The job posting you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return <EditJob career={career} />;
}