import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import DashboardPage from "./dashboard/page";

export default async function Home() {

  const session = await auth();
  if (!session) {
    return redirect("/auth");
  }
  return <DashboardPage />
}
