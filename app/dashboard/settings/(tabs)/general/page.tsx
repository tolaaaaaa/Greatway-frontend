import { getAuthUser } from "@/actions/auth.actions";
import GeneralSettings from "./_component/generalSettings";

export default async function GeneralPage() {
  const user = await getAuthUser();
  if (!user) return null;
  return <GeneralSettings />;
}
