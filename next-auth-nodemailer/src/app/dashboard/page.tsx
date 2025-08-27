import { LogOut } from "@/components/LogOut";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";


export default async function DashboardPage() {
    const session = await auth();
    if (!session) {
        return redirect("/auth")
    };

    return (
        <div className="flex flex-col items-center justify-center gap-5">
            {JSON.stringify(session)}
            <LogOut />
        </div>
    )
}