"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function LogOut() {
    return (
        <div>
            <Button className="cursor-pointer" onClick={async () => await signOut()}>Logout</Button>
        </div>
    )
};