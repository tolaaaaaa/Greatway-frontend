import { Suspense } from "react";
import { getCareers } from "@/actions/career.action";
import Career from "../../_component/careerComponent";
import CareerSkeleton from "../../_component/careerSkeleton";

async function CareerList() {
  const career = await getCareers({
    page: 1,
    limit: 10,
    status: "closed",
  });
  return <Career career={career} />;
}

export default function Page() {
  return (
    <Suspense fallback={<CareerSkeleton />}>
      <CareerList />
    </Suspense>
  );
}